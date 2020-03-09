/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { StyleSheet, Styles, StyleSheetFactoryOptions, Classes } from 'jss';

/**
 *  Classes object, which is returned after styles compilation and attaching to DOM
 */
export type JssClasses = Classes;

/**
 *  Type for values which are of types of provided tuple
 */
export type OneOf<T extends readonly unknown[]> = T extends ReadonlyArray<infer OneOf> ? OneOf : never;

/**
 *  Type for deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

/**
 *  Class constructior type
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  Inteface for replacer helper
 */
export interface Replacer {
  pattern: RegExp | string;
  value: string;
}

/**
 *  Interface for Getting Named key:value pairs object from provided type
 *  Mock for feature of returning named classes from useStyles
 */
export type Named<T> = { [P in keyof T]: string };

/**
 *  Jss theme object type.
 *
 *  This one could really be of any type: Array, Object, primitive ...
 *  Just when creating Theme instance be sure to provide correct typing for avoiding bugs in your application.
 */
export type JssTheme = any & { updatedHash?: number };
// export type JssTheme = Record<any, any> & { updatedHash?: number };

/**
 *  Interface for Jss theme object
 */
export type JssStyles<T extends JssTheme = JssTheme> = ((theme: T) => Styles) | Styles;

/**
 *  Interface for Cached styles
 */
export interface JssCache {
  /**
   *  Whether styles are static. If static - they won't be rerendered on theme update
   */
  isStatic: boolean;

  /**
   *  Compiled and attached to DOM styles
   */
  sheet: StyleSheet;
}

/**
 *  Interface for theme color types
 */
export type ThemeColorTypes = 'rgb' | 'rgba' | 'hsl' | 'hsla';

/**
 *  Interface for theme color manipulator color object
 */
export interface ThemeColorObject {
  type: ThemeColorTypes;
  values: number[];
}

/**
 *  Interface for default palette types (themes)
 */
export type ThemePaletteType = 'light' | 'dark';

/**
 *  Inteface for Theme palette color
 */
export interface ThemePaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

/**
 *  Inteface for Theme palette common colors
 */
export interface ThemePaletteCommon {
  black: string;
  white: string;
}

/**
 *  Inteface for Theme palette shadows of grey colors
 */
export interface ThemePaletteGrey {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

/**
 *  Inteface for Theme palette text colors
 */
export interface ThemePaletteText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

/**
 *  Inteface for Theme palette background colors
 */
export interface ThemePaletteBackground {
  paper: string;
  default: string;
}

/**
 *  Inteface for Theme palette action colors (colors for different actions)
 */
export interface ThemePaletteAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledBackground: string;
  disabledOpacity: number;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

/**
 *  Inteface for Theme palette basic colors
 */
export interface ThemePaletteBasicColors {
  text: ThemePaletteText;
  background: ThemePaletteBackground;
  action: ThemePaletteAction;
  divider: string;
}

/**
 *  Inteface for Theme Palette
 */
export interface ThemePalette {
  type: ThemePaletteType;
  tonalOffset: number;
  common: ThemePaletteCommon;
  primary: ThemePaletteColor;
  secondary: ThemePaletteColor;
  error: ThemePaletteColor;
  warning: ThemePaletteColor;
  info: ThemePaletteColor;
  success: ThemePaletteColor;
  grey: ThemePaletteGrey;
  text: ThemePaletteText;
  background: ThemePaletteBackground;
  action: ThemePaletteAction;
  divider: string;
}

/**
 *  Interface for Theme Typography Item
 */
export interface ThemeTypographyItem {
  fontFamily: string;
  fontWeight: number | string;
  fontSize: number | string;
  lineHeight: number | string;
  // letterSpacing?: string;

  // use: () => string;
}

/**
 *  Interface for Theme typography available items
 */
export type ThemeTypographyItems = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'label' | 'hint';

/**
 *  Interface for Theme typography creation config
 */
export interface ThemeTypographyDefaults {
  fontFamily?: string;
  htmlFontSize?: number;
  lineHeight?: number;
  // fontSize?: number;
  fontWeightLight?: number | string;
  fontWeightRegular?: number | string;
  fontWeightMedium?: number | string;
  fontWeightBold?: number | string;
}

/**
 *  Interface for Theme typography
 */
export interface ThemeTypography extends Required<ThemeTypographyDefaults> {
  h1: ThemeTypographyItem;
  h2: ThemeTypographyItem;
  h3: ThemeTypographyItem;
  h4: ThemeTypographyItem;
  h5: ThemeTypographyItem;
  h6: ThemeTypographyItem;

  subtitle1: ThemeTypographyItem;
  subtitle2: ThemeTypographyItem;

  body1: ThemeTypographyItem;
  body2: ThemeTypographyItem;

  button: ThemeTypographyItem & { textTransform: string };

  label: ThemeTypographyItem;

  hint: ThemeTypographyItem;
}

/**
 *  Interface for Theme transitions
 */
export interface ThemeTransitions {
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
}

/**
 *  Interface for Theme breakpoints keys
 */
export type ThemeBreakpointsKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 *  Interface for Theme breakpoints values
 */
export type ThemeBreakpointsValues = Record<OneOf<ThemeBreakpointsKeys>, number>;

/**
 *  Interface for Theme breakpoints
 */
export interface ThemeBreakpoints {
  keys: ThemeBreakpointsKeys;
  values: ThemeBreakpointsValues;

  up: (value: OneOf<ThemeBreakpointsKeys> | number) => string;
  down: (value: OneOf<ThemeBreakpointsKeys> | number) => string;
  between: (start: OneOf<ThemeBreakpointsKeys> | number, end: OneOf<ThemeBreakpointsKeys> | number) => string;
  only: (value: OneOf<ThemeBreakpointsKeys> | number) => string;
  width: (value: OneOf<ThemeBreakpointsKeys>) => number;
}

/**
 *  Interface for Theme shadows
 */
export type ThemeShadows = string[];


/**
 *  Interface for Theme shadow object config
 */
export interface ThemeShadowObject {
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
  color?: string;
  inset?: boolean;
}

/**
 *  Interface for Theme shadow array (tuple) config
 */
export type ThemeShadowTuple = [number?, number?, number?, number?, string?, boolean?];

/**
 *  Interface for Theme shape options
 */
export interface ThemeShape {
  borderRadius: number | string;
}

/**
 *  Interface for Theme zIndex options
 */
export interface ThemeZIndex {
  modal: number;
  drawer: number;
  snackbar: number;
  tooltip: number;
}

/**
 *  Interface for Theme default mixins
 */
export interface ThemeMixins {
  /**
   *  Methods for creating CSS3 gradients (linear, radial, repeating-*) with provided options
   */
  // gradient: (dir: string, ...breakpoints: string[]) => string;
  gradient: {
    /**
     *  Creates CSS3 linear gradient(s). Accepts list of string | arrays
     *
     *  @example
     *  ```ts
     *    l('45deg, #fff 10px, #000 20px 30px');
     *
     *    or
     *
     *    l(
     *      '45deg, #fff 10px, #000 20px 30px',
     *      ['45deg', '#fff 10px 20px', '#000 20px 40%'],
     *      ['#fff', 10, '#000', 20, 0.4, ['red', 10, 0.2]],
     *    );
     *  ```
     *
     *  It means that if provided array of breakpoints for each gradient, it is possible to
     *  provide color-stops in 3 different ways:
     *  1. '#fff 10px 10px'
     *  2. '#fff', 10, 10
     *  3. ['#fff', 10, 10]
     *
     *  @param breakpoints - Breakpoints (aka <color-stops>)
     */
    l: (...breakpoints: Array<string | number | [string, number, number?]>) => string;

    /**
     *  Creates CSS3 repeating linear gradient(s). Accepts list of string | arrays
     *  See example for linear gradient method above
     *
     *  @param breakpoints - Breakpoints (aka <color-stops>)
     */
    rl: (...breakpoints: Array<string | number | [string, number, number?]>) => string;

    /**
     *  Creates CSS3 radial gradient(s). Accepts list of string | arrays
     *  See example for linear gradient method above
     *
     *  @param breakpoints - Breakpoints (aka <color-stops>)
     */
    r: (...breakpoints: Array<string | number | [string, number, number?]>) => string;

    /**
     *  Creates CSS3 repeating radial gradient(s). Accepts list of string | arrays
     *  See example for linear gradient method above
     *
     *  @param breakpoints - Breakpoints (aka <color-stops>)
     */
    rr: (...breakpoints: Array<string | number | [string, number, number?]>) => string;
  };

  /**
   *  Mixin for getting provided amount of current theme spacing units for each argument in pixels
   *
   *  @example (If theme.spacing = 8):
   *  spacing(1, 2, 3) => '8px 16px 24px';
   *  spacing(1, 0) => '8px 0px';
   *  spacing(1, '100%') => '8px 100%';
   *
   *  @param units - Units (will be multiplied on current theme spacing)
   */
  spacing: (...units: Array<number | string>) => string;

  /**
   *  Creates border with provided width (in standart units) and color
   *
   *  @param [units] - Border width
   *  @param [color] - Border color
   */
  border: (units?: number, color?: string) => string;

  /**
   *  Provides full CSS 'font' property
   *
   *  @param prop - Property name from current theme typography variants
   */
  font: (prop: ThemeTypographyItems) => string;

  /**
   *  Creates transition
   *
   *  @param transition - Transition to create. Could be a cubic-bezier function
   *  @param [duration] - Transition duration
   *  @param [delay] - Transition delay
   *  @param [prop] - Property for which transition to add
   */
  transition: (transition: string, duration?: number | string, delay?: number | string, prop?: string) => string;

  /**
   *  Makes provided color transparent for specified value
   *
   *  @see https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
   *
   *  @param color - Basic color: #nnn, #nnnnnn | rgb(a) | hsl(a)
   *  @param opacity - Degree of opacity
   */
  fade: (color: string, opacity?: string | number) => string;

  /**
   *  Darkens a color.
   *
   *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
   *  @param [coef] - multiplier in the range 0 - 1
   */
  darken: (customColor: string, coef?: number) => string;

  /**
   *  Lightens a color.
   *
   *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
   *  @param [coef] - multiplier in the range 0 - 1
   */
  lighten: (customColor: string, coef?: number) => string;

  /**
   *  Inverts input color and returns its opposite.
   *  Optionally could return only black/white colors, defaults to shich also could be specified.
   *
   *  @param color - Color: #nnn or #nnnnnn | rgb(a) | hsl(a)
   *  @param [bw] - Whether to use only black/white contrast colors
   *  @param [black] - Black default color
   *  @param [white] - White default color
   */
  getContrastColor: (color: string, bw?: boolean, black?: string, white?: string) => string;

  /**
   *  Creates shadow(s) using provided list of config values.
   *
   *  @param shadows - List of shadows config in form of objects or tuples
   */
  boxShadow: (...shadows: Array<ThemeShadowTuple | ThemeShadowObject>) => string;

  /**
   *  Mixin for font property usage.
   *
   *  @param size - Size to convert into rem
   *  @param htmlFontSize - Html tag font size
   */
  pxToRem: (size: number) => string;
}

/**
 *  Interface for app theme.
 *  Most options are similar to React MUI with some additions / changes
 *
 *  @see https://material-ui.com/ru/customization/default-theme/
 */
export interface DefaultTheme {
  spacing: number;
  maxWidth: number | string;
  direction: string;

  palette: ThemePalette;
  typography: ThemeTypography;
  shape: ThemeShape;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
  mixins: ThemeMixins;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;

  updatedHash?: number;
}

/**
 *  Interface for custom Theme constructor
 */
export interface ThemeConstructor<T extends JssTheme = JssTheme> {
  getTheme(): T;
  updateDefaultOptions(options: StyleSheetFactoryOptions): void;
  updateDefaultReplacer(replacer: Replacer | Replacer[]): void;
  isEqualTheme(theme: T): boolean;
  hasStylesInCache(styles: JssStyles<T>): boolean;
  rewriteTheme(themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T;
  updateTheme(themeConfig: DeepPartial<T>, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T;
  useStyles(styles: JssStyles<T>, options?: StyleSheetFactoryOptions): JssClasses;
  makeStyles(styles: JssStyles<T>): JssStyles<T>;
}
