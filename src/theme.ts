import jss, { Classes, Styles, StyleSheetFactoryOptions } from 'jss';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';

import { JssTheme, JssCache, JssStyles, Replacer, DefaultTheme } from './typings';
import { isFunction, replaceKey, createHash } from './helpers';
import { defaultTheme } from './defaultTheme';

/**
 *  Theme constructor, which holds all logic for styling application, providing theme.
 */
export class Theme<T extends JssTheme = Partial<DefaultTheme>> {
  /**
   *  Current theme
   */
  /* eslint-disable-next-line */
  private _theme: T = defaultTheme(this) as any;

  /**
   *  Global options for creating Jss stylesheet
   */
  private _options: StyleSheetFactoryOptions;

  /**
   *  Global replacer for theme styles.
   *  This one is a partial fix for next pseudo selectors which works incorreclty in JSS:
   *
   *  @see :first-child
   *  @see :first-of-type
   */
  private _replacer: Replacer | Replacer[] = [
    { pattern: ':first-of-type', value: ':nth-of-type(1)' },
    { pattern: ':first-child', value: ':nth-child(1)' },
  ];

  /**
   *  Cached styles
   */
  private _cache: Map<string, JssCache> = new Map();

  /**
   *  @param themeConfig - Theme options for creation
   *  @param [options] - Default options for creating new stylesheets
   *  @param [replacer] - Default replacer for theme styles
   */
  public constructor(themeConfig?: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]) {
    this.createTheme(themeConfig, options, replacer);
  }

  /**
   *  Gets current theme
   */
  public getTheme(): T {
    return cloneDeep(this._theme);
  }

  /**
   *  Updates default options for creating new stylesheets
   *
   *  @param options - Default options for creating new stylesheets
   */
  public updateDefaultOptions(options: StyleSheetFactoryOptions): void {
    if (options) this._options = cloneDeep(options);
  }

  /**
   *  Updates default replacer for theme styles
   *
   *  @see explanation in method runReplacer()
   *
   *  @param replacer - Default replacer for theme styles
   */
  public updateDefaultReplacer(replacer: Replacer | Replacer[]): void {
    if (replacer) this._replacer = cloneDeep(replacer);
  }

  /**
   *  Defines whether theme is equal to currently set one
   *
   *  @param theme - Theme to check if it is equal to current
   */
  public isEqualTheme(theme: T): boolean {
    if (!theme) {
      throw Error('Please provide theme for checking its equality');
    }

    if (theme.updatedHash && this._theme.updatedHash) {
      return isEqual(theme.updatedHash, this._theme.updatedHash);
    }

    return isEqual(theme, this._theme);
  }

  /**
   *  Checks if provided styles are in cache
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public hasStylesInCache(styles: JssStyles<T>): boolean {
    if (!styles) {
      throw Error('Please provide styles object or function');
    }

    const computedStyles = this.convertStylesToObject(styles);
    const key = this.createCacheKey(computedStyles);

    return !!(this._cache.get(key));
  }

  /**
   *  Creates initital theme. Could be used only once upon each Theme instance.
   *  It is a somewhat analogue for Theme.constructor()
   *
   *  @param themeConfig - Theme options for creation
   *  @param [options] - Default options for creating new stylesheets
   *  @param [replacer] - Default replacer for theme styles
   */
  public createTheme(themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T {
    if (this._theme.updatedHash) {
      throw new Error('Theme was already created. To update it consider using updateTheme');
    }

    if (themeConfig) {
      // this._theme = cloneDeep(themeConfig);
      this._theme = cloneDeep(merge(this._theme, themeConfig));
      this._theme.updatedHash = this.createHash();
    }
    if (options) this._options = cloneDeep(options);
    if (replacer) this._replacer = cloneDeep(replacer);

    return this.getTheme();
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
  public updateTheme(themeConfig: Partial<T>): T {
    if (!themeConfig) {
      throw new Error('For updating theme it is necessary to provide themeConfig');
    }

    const updated = merge(cloneDeep(this._theme), cloneDeep(themeConfig));

    if (isEqual(this._theme, updated)) {
      return this.getTheme();
    }

    this._theme = updated;
    this._theme.updatedHash = this.createHash();

    this._cache.forEach((value, key) => {
      if (value.isStatic) return;

      value.sheet.detach();
      this._cache.delete(key);
    });

    return this.getTheme();
  }

  /**
   *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   *  @param [options] - Options for creating new stylesheet (if it is not cached)
   */
  public useStyles(styles: JssStyles<T>, options?: StyleSheetFactoryOptions): Classes {
    if (!styles) {
      throw Error('Please provide styles object or function');
    }

    const isStatic = !isFunction(styles);
    let computedStyles = this.convertStylesToObject(styles);
    const key = this.createCacheKey(computedStyles);

    if (this._cache.get(key)) {
      return this._cache.get(key).sheet.classes;
    }

    computedStyles = this.runReplacer(computedStyles);

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
   *  Runs object keys replacer to replace invalid selectors.
   *
   *  @param styles - Already converted (computed) styles ready to be consumed by JSS compiler
   */
  private runReplacer(styles: Styles): Styles {
    return replaceKey(styles, this._replacer);
  }

  /**
   *  Creates key for storing styles in cache
   *
   *  @param computedStyles - Styles object
   */
  private createCacheKey(computedStyles: JssStyles<T>): string {
    return JSON.stringify(computedStyles);
  }

  /**
   *  Creates hash for update string
   */
  private createHash(): number {
    return createHash(new Date().toISOString());
  }
}
