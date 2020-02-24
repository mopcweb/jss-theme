import jss, { Classes, Styles } from 'jss';
import preset from 'jss-preset-default';
import { isEqual } from 'lodash';

import { defaultTheme } from './config';
import { singleton, isFunction } from './helpers';
import { JssTheme, JssCache, JssStyles } from './typings';

/**
 *  Theme constructor, which holds all logic for styling application, providing theme.
 */
class ThemeConstructor {
  /**
   *  Current theme
   */
  private _theme: JssTheme;

  /**
   *  Default theme options
   */
  private _defaultTheme: JssTheme = defaultTheme;

  /**
   *  Cached styles
   */
  private _cache: Map<string, JssCache> = new Map();

  public constructor() {
    jss.setup(preset());
  }

  /**
   *  Creates initital theme. Could be used only once.
   *
   *  @param overrides - Theme options overrides
   */
  public createTheme(overrides?: Partial<JssTheme>): void {
    if (this._theme) {
      throw new Error('Theme was already created. To update it consider using updateTheme');
    }

    this._theme = { ...this._defaultTheme, ...overrides };
  }

  /**
   *  Updates current theme wtih new options. Detaches from DOM all cached styles, which uses
   *  theme as provider for some values
   *
   *  @param overrides - Theme options overrides
   *  @param styles - If this method is called in component it is necessary to provide styles
   *  for compilation. This will return classes for component usage (aka useStyles method)
   */
  public updateTheme(overrides: Partial<JssTheme>, styles: JssStyles): Classes {
    if (!overrides || !styles) {
      throw new Error('For updating theme overrides and styles are required');
    }

    if (isEqual(this._theme, { ...this._defaultTheme, ...overrides })) {
      return this.useStyles(styles);
    }

    this._theme = { ...this._defaultTheme, ...overrides };

    this._cache.forEach((value, key) => {
      if (value.isStatic) return;

      value.sheet.detach();
      this._cache.delete(key);
    });

    return this.useStyles(styles);
  }

  /**
   *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public useStyles(styles: JssStyles): Classes {
    const isStatic = !isFunction(styles);
    const computedStyles = this.convertStylesToObject(styles);
    const key = JSON.stringify(computedStyles);

    if (this._cache.get(key)) {
      return this._cache.get(key).sheet.classes;
    }

    const sheet = jss.createStyleSheet(computedStyles).attach();
    this._cache.set(key, { isStatic, sheet });
    return sheet.classes;
  }

  /**
   *  If provided object returns with no changes, if fucntion -> calls it with current theme
   *  and returns object
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public convertStylesToObject(styles: JssStyles): Styles {
    if (isFunction(styles) && !this._theme) {
      this.createTheme();
    }

    return typeof styles === 'object' ? styles : styles(this._theme);
  }
}

/**
 *  Theme singleton instance, which holds all logic for styling application, providing theme.
 */
export const Theme = singleton(ThemeConstructor);
