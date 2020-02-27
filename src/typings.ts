/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Styles } from 'jss';

export { Classes, Styles } from 'jss';

/**
 *  Type for values which are of types of provided tuple
 */
export type OneOf<T extends readonly unknown[]> = T extends ReadonlyArray<infer OneOf> ? OneOf : never;

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
 *  Jss theme object type.
 *
 *  This one could really be of any type: Array, Object, primitive ...
 *  Just when creating Theme instance be sure to provide correct typing for avoiding bugs in your application.
 */
export type JssTheme = any;

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

/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable max-len */

/**
 *  Inteface for Theme Item
 */
export interface ThemePaletteItem {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

/**
 *  Inteface for Theme Palette
 */
export interface ThemePalette {
  type: string;

  common: {
    black: string;
    white: string;
  };

  primary: ThemePaletteItem;
  secondary: ThemePaletteItem;
  error: ThemePaletteItem;
  warning: ThemePaletteItem;
  info: ThemePaletteItem;
  success: ThemePaletteItem;

  grey: {
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
  };

  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };

  background: {
    paper: string;
    default: string;
  };

  action: {
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
  };

  divider: string;
}

/**
 *  Interface for Theme Typography Item
 */
export interface ThemeTypographyItem {
  fontFamily: string;
  fontWeight: string | number;
  fontSize: string;
  lineHeight: number;
  letterSpacing?: string;

  use: () => string;
}

export type ThemeTypographyItems = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'label' | 'hint';

/**
 *  Interface for Theme Typography
 */
export interface ThemeTypography {
  fontFamily: string;
  htmlFontSize: number;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;

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

  button: ThemeTypographyItem;

  label: ThemeTypographyItem;

  hint: ThemeTypographyItem;

  // caption?: ThemeTypographyItem;
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
   *  Creates linear gradient with provided direction and breakpoints
   *
   *  @param [dir] - Gradient direction
   *  @param [...breakpoints] - Gradient breakpoints
   */
  gradient: (dir: string, ...breakpoints: string[]) => string;

  /**
   *  Mixin for getting provided amount of current theme spacing units
   *
   *  @param units - Amount of units (will be multiplied on current theme spacing)
   */
  spacing: (units: number) => number;

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
  transition: (transition: string, duration?: number, delay?: number, prop?: string) => string;

  /**
   *  Makes provided HEX color transparency for specified value
   *
   *  @see https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
   *
   *  @param color - Basic HEX color
   *  @param opacity - Degree of opacity
   */
  transparent: (color: string, opacity?: string) => string;
}

/**
 *  Interface for app theme
 *
 *  Most options are similar to React MUI with some additions / changes
 *
 *  @see https://material-ui.com/ru/customization/default-theme/
 */
export interface DefaultTheme {
  spacing: number;
  maxWidth: number;
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
