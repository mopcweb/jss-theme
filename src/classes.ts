import { StyleSheetFactoryOptions } from 'jss';

import { JssClasses, JssStyles, JssTheme } from './typings';
import { Theme } from './theme';
import { isFunction } from './helpers';
import { getTheme, useStyles, isEqualTheme } from './functions';

/**
 *  Class for usage in Angular 8+ projects with --aot compiler enabled. DON'T FORGET to call super(styles)
 *  in constructor and in ngOnInit and ngDoCheck methods for proper work
 *
 *  @note This one is anecessary because w/ AOT compiler there is no ability to use custom decorators
 *
 *  @see https://github.com/angular/angular/issues/31495
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [options] - Options for creating new stylesheet
 *  @param [theme] - Constructed custom theme
 */
export class NgStyledComponent<T extends JssTheme = JssTheme> {
  public classes: JssClasses = {};

  private _styles!: JssStyles;
  private _theme?: Theme<T>;
  private _options?: StyleSheetFactoryOptions;
  private _cachedTheme: T;

  public constructor(styles: JssStyles, options?: StyleSheetFactoryOptions, theme?: Theme<T>) {
    if (styles) this._styles = styles;
    if (options) this._options = options;
    if (theme) this._theme = theme;
  }

  public ngOnInit(): void {
    this._cachedTheme = getTheme(this._theme);
    this.classes = useStyles(this._styles, this._options, this._theme);
  }

  public ngDoCheck(): void {
    if (isFunction(this._styles) && !isEqualTheme(this._cachedTheme, this._theme)) {
      this._cachedTheme = getTheme(this._theme);
      this.classes = useStyles(this._styles, this._options, this._theme);
    }
  }
}
