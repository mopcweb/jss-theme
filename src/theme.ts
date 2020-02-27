import jss, { Classes, Styles, StyleSheetFactoryOptions } from 'jss';
import { isEqual, merge, cloneDeep } from 'lodash';

import { isFunction, replaceKey, fontMixin, paletteItemComposer, breakpointsComposer } from './helpers';
import {
  JssTheme, JssCache, JssStyles, Replacer, DefaultTheme, ThemeTypographyItems,
} from './typings';

/**
 *  Theme constructor, which holds all logic for styling application, providing theme.
 */
export class Theme<T extends JssTheme = Partial<DefaultTheme>> {
  /**
   *  Current theme
   */
  private _theme: T = {
    spacing: 8,
    maxWidth: 1024,
    direction: 'ltr',

    palette: {
      type: 'light',

      common: {
        black: '#000000',
        white: '#ffffff',
      },

      primary: paletteItemComposer('#16a94a', '#ffffff'),
      secondary: paletteItemComposer('#1373e2', '#ffffff'),
      error: paletteItemComposer('#cc0000', '#ffffff'),
      warning: paletteItemComposer('#16a94a', '#333333'),
      info: paletteItemComposer('#16a94a', '#333333'),
      success: paletteItemComposer('#16a94a', '#333333'),

      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
      background: {
        paper: '#ffffff',
        default: '#fafafa',
      },
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Open Sans", sans-serif',
      // color: '#333',

      htmlFontSize: 16,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,

      h1: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: 1.167,

        use: (): string => fontMixin(this.getTheme(), 'h1'),
      },
      h2: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: 1.2,

        use: (): string => fontMixin(this.getTheme(), 'h2'),
      },
      h3: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: 1.167,

        use: (): string => fontMixin(this.getTheme(), 'h3'),
      },
      h4: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: 1.167,

        use: (): string => fontMixin(this.getTheme(), 'h4'),
      },
      h5: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: 1.167,

        use: (): string => fontMixin(this.getTheme(), 'h5'),
      },
      h6: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: 1.167,

        use: (): string => fontMixin(this.getTheme(), 'h6'),
      },

      subtitle1: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: 1.75,

        use: (): string => fontMixin(this.getTheme(), 'subtitle1'),
      },
      subtitle2: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: 1.57,

        use: (): string => fontMixin(this.getTheme(), 'subtitle2'),
      },

      body1: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: 1.5,

        use: (): string => fontMixin(this.getTheme(), 'body1'),
      },
      body2: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 1.43,

        use: (): string => fontMixin(this.getTheme(), 'body2'),
      },

      button: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 1.75,

        use: (): string => fontMixin(this.getTheme(), 'button'),
      },

      label: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 1.43,

        use: (): string => fontMixin(this.getTheme(), 'label'),
      },

      hint: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 1.43,

        use: (): string => fontMixin(this.getTheme(), 'hint'),
      },
    },
    shape: {
      borderRadius: 4,
    },
    shadows: [
      'none',
      '0px 2px 8px #00000040',
    ],
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    mixins: {
      gradient: (dir: string, ...breakpoints: string[]): string => `linear-gradient(${dir}, ${breakpoints})`,
      spacing: (units: number): number => units * this.getTheme().spacing,
      border: (units = 1, color = this.getTheme().palette.grey[400]): string => `${units}px solid ${color}`,
      font: (prop: ThemeTypographyItems): string => fontMixin(this.getTheme(), prop),
      transition: (
        transition?: string, duration = 1, delay = 0, prop = 'all',
      ): string => `${prop} ${duration}s ${transition} ${delay}s`,
      transparent: (color: string, opacity = '80'): string => `${color}${opacity}`,
    },
    breakpoints: breakpointsComposer(),
    zIndex: {
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
    /* eslint-disable-next-line */
  } as any;

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
    { pattern: ':first-of-type', value: ':nth-of-type(2)' },
    { pattern: ':first-child', value: ':nth-child(2)' },
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
    // if (themeConfig) this._theme = cloneDeep(themeConfig);
    if (themeConfig) this._theme = cloneDeep(merge(this._theme, themeConfig));
    if (options) this._options = cloneDeep(options);
    if (replacer) this._replacer = cloneDeep(replacer);
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
   *  Creates initital theme. Could be used only once upon each Theme instance.
   *  It is a somewhat analogue for Theme.constructor()
   *
   *  @param themeConfig - Theme options for creation
   *  @param [options] - Default options for creating new stylesheets
   *  @param [replacer] - Default replacer for theme styles
   */
  public createTheme(themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T {
    if (this._theme) {
      throw new Error('Theme was already created. To update it consider using updateTheme');
    }

    this._theme = cloneDeep(themeConfig);

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
}
