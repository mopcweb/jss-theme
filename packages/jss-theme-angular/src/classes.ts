import { StyleSheetFactoryOptions } from 'jss';

import { Theme, JssStyles, JssTheme, getTheme, useStyles, isEqualTheme, JssClasses } from 'jss-theme';
import { isFunction } from './helpers';

/**
 *  Class for usage in Angular 8+ projects with --aot compiler enabled. DON'T FORGET to call super(styles)
 *  in constructor and in ngOnInit and ngDoCheck methods for proper work.
 *
 *  @note This one is alternative to @NgStyled decorator.
 *
 *  @see https://github.com/angular/angular/issues/31495.
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

    if (this.ngOnInit) {
      const { ngOnInit } = this;

      this.ngOnInit = (): void => {
        this._cachedTheme = getTheme(this._theme);
        this.classes = useStyles(this._styles, this._options, this._theme);

        ngOnInit.apply(this);
      };
    }

    if (isFunction(styles) && this.ngDoCheck) {
      const { ngDoCheck } = this;

      this.ngDoCheck = (): void => {
        if (isFunction(this._styles) && !isEqualTheme(this._cachedTheme, this._theme)) {
          this._cachedTheme = getTheme(this._theme);
          this.classes = useStyles(this._styles, this._options, this._theme);
        }

        ngDoCheck.apply(this);
      };
    }

    // const throwClassError = (method: string): Error => {
    //   throw Error(
    //     'In order to correctly use NgStyledComponent class w/ angular --aot compilator, '
    //     + `${method} should call super.${method}() at the top ot method`,
    //   );
    // };

    // const proto = Object.getPrototypeOf(this);
    // const superProto = NgStyledComponent.prototype;
    // const missing = Object.getOwnPropertyNames(superProto).find((name) => (
    //   typeof superProto[name] === 'function' && !Object.hasOwnProperty.call(proto, name)
    // ));

    // if (!missing || missing.indexOf('ngOnInit') === -1) {
    //   const match = this.ngOnInit.toString().match(/(super.ngOnInit(\(\))?)|_super.ngOnInit.call\(this\)/);
    //   console.log('match >>>', this.ngOnInit.toString());
    //
    //   if (!match || !match[0] || !match.index) throwClassError('ngOnInit');
    // }

    // if (!missing || missing.indexOf('ngDoCheck') === -1) {
    //   const match = this.ngDoCheck.toString().match(/(super.ngDoCheck(\(\))?)|_super.ngDoCheck.call\(this\)/);
    //
    //   if (!match || !match[0] || !match.index) throwClassError('ngDoCheck');
    // }
  }

  /* eslint-disable-next-line */
  public ngOnInit(): void { }

  /* eslint-disable-next-line */
  public ngDoCheck(): void { }
}
