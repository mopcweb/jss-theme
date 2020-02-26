import jss, { Classes, Styles, StyleSheetFactoryOptions } from 'jss';
import { isEqual, merge, cloneDeep } from 'lodash';

import { isFunction } from './helpers';
import { JssTheme, JssCache, JssStyles } from './typings';

/**
 *  Theme constructor, which holds all logic for styling application, providing theme.
 */
export class Theme<T extends JssTheme = JssTheme> {
  /**
   *  Current theme
   */
  private _theme: T;

  /**
   *  Global options for creating Jss stylesheet
   */
  private _options: StyleSheetFactoryOptions;

  /**
   *  Cached styles
   */
  private _cache: Map<string, JssCache> = new Map();

  /**
   *  @param themeConfig - Theme options for creation
   *  @param [options] - Default options for creating new stylesheets
   */
  public constructor(themeConfig?: T, options?: StyleSheetFactoryOptions) {
    if (themeConfig) this._theme = themeConfig;
    if (options) this._options = options;
  }

  /**
   *  Gets current theme
   */
  public getTheme(): T {
    return this._theme;
  }

  /**
   *  Updates default options for creating new stylesheets
   *
   *  @param options - Default options for creating new stylesheets
   */
  public updateDefaultOptions(options: StyleSheetFactoryOptions): void {
    if (options) this._options = options;
  }

  /**
   *  Defines whether theme is equal to currently set one
   *
   *  @param theme - Theme to check if it is equal to current
   */
  public isEqualTheme(theme: T): boolean {
    return isEqual(theme, this._theme);
  }

  /**
   *  Checks if provided styles are in cache
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public hasStylesInCache(styles: JssStyles<T>): boolean {
    const computedStyles = this.convertStylesToObject(styles);
    const key = this.createCacheKey(computedStyles);

    return !!(this._cache.get(key));
  }

  /**
   *  Creates initital theme. Could be used only once.
   *
   *  @param themeConfig - Theme options for creation
   *  @param [options] - Default options for creating new stylesheets
   */
  public createTheme(themeConfig: T, options?: StyleSheetFactoryOptions): T {
    if (this._theme) {
      throw new Error('Theme was already created. To update it consider using updateTheme');
    }

    this._theme = cloneDeep(themeConfig);

    if (options) this._options = options;

    return this._theme;
  }

  /**
   *  Updates current theme wtih new options. Detaches from DOM all cached styles, which uses
   *  theme as provider for some values
   *
   *  @param themeConfig - Theme options overrides
   *  @param styles - If this method is called in component it is necessary to provide styles
   *  for compilation. This will return classes for component usage (aka useStyles method)
   *  @param [options] - Options for creating new stylesheet
   */
  public updateTheme(
    themeConfig: Partial<T>, styles: JssStyles<T>, options?: StyleSheetFactoryOptions,
  ): Classes {
    if (!themeConfig || !styles) {
      throw new Error('For updating theme themeConfig and styles are required');
    }

    const updated = merge(cloneDeep(this._theme), themeConfig);

    if (isEqual(this._theme, updated)) {
      return this.useStyles(styles);
    }

    this._theme = updated;

    this._cache.forEach((value, key) => {
      if (value.isStatic) return;

      value.sheet.detach();
      this._cache.delete(key);
    });

    return this.useStyles(styles, options);
  }

  /**
   *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   *  @param [options] - Options for creating new stylesheet (if it is not cached)
   */
  public useStyles(styles: JssStyles<T>, options?: StyleSheetFactoryOptions): Classes {
    const isStatic = !isFunction(styles);
    const computedStyles = this.convertStylesToObject(styles);
    const key = this.createCacheKey(computedStyles);

    if (this._cache.get(key)) {
      return this._cache.get(key).sheet.classes;
    }

    const sheet = jss.createStyleSheet(computedStyles, { ...this._options, ...options }).attach();
    this._cache.set(key, { isStatic, sheet });
    return sheet.classes;
  }

  /**
   *  Helper for providing correct type definitions while creating styles
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public makeStyles(styles: JssStyles<T>): JssStyles<T> {
    return styles;
  }

  /**
   *  If provided object returns with no changes, if fucntion -> calls it with current theme
   *  and returns object
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  private convertStylesToObject(styles: JssStyles<T>): Styles {
    if (isFunction(styles) && !this._theme) {
      throw new Error(
        'For creating stylesheet dependant on theme variables it is necessary to create Theme first',
      );
    }

    return typeof styles === 'object' ? styles : styles(this._theme);
  }

  /**
   *  Creates key for storing styles in cache
   *
   *  @param computedStyles - Styles object
   */
  private createCacheKey(computedStyles: JssStyles<T>): string {
    return JSON.stringify(computedStyles);
  }
}
