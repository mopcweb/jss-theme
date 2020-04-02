/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
 *  Interface for theme color types
 */
export type JssThemeColorTypes = 'rgb' | 'rgba' | 'hsl' | 'hsla';

/**
 *  Interface for theme color manipulator color object
 */
export interface JssThemeColorObject {
  type: JssThemeColorTypes;
  values: number[];
}

/**
 *  Interface for default palette types (themes)
 */
export type JssThemePaletteType = 'light' | 'dark';

/**
 *  Inteface for Theme palette color
 */
export interface JssThemePaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

/**
 *  Inteface for Theme palette common colors
 */
export interface JssThemePaletteCommon {
  black: string;
  white: string;
}

/**
 *  Inteface for Theme palette shadows of grey colors
 */
export interface JssThemePaletteGrey {
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
export interface JssThemePaletteText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

/**
 *  Inteface for Theme palette background colors
 */
export interface JssThemePaletteBackground {
  paper: string;
  default: string;
}

/**
 *  Inteface for Theme palette action colors (colors for different actions)
 */
export interface JssThemePaletteAction {
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
export interface JssThemePaletteBasicColors {
  text: JssThemePaletteText;
  background: JssThemePaletteBackground;
  action: JssThemePaletteAction;
  divider: string;
}

/**
 *  Inteface for Theme Palette
 */
export interface JssThemePalette {
  type: JssThemePaletteType;
  tonalOffset: number;
  common: JssThemePaletteCommon;
  primary: JssThemePaletteColor;
  secondary: JssThemePaletteColor;
  error: JssThemePaletteColor;
  warning: JssThemePaletteColor;
  info: JssThemePaletteColor;
  success: JssThemePaletteColor;
  grey: JssThemePaletteGrey;
  text: JssThemePaletteText;
  background: JssThemePaletteBackground;
  action: JssThemePaletteAction;
  divider: string;
}

/**
 *  Interface for Theme Typography Item
 */
export interface JssThemeTypographyItem {
  fontFamily: string;
  fontWeight: number | string;
  fontSize: number | string;
  lineHeight: number | string;
  // letterSpacing?: string;

  // use: () => string;
}

/**
 *  Interface for Theme typography available items (variants)
 */
export type JssThemeTypographyItems = 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
| 'subtitle1'
| 'subtitle2'
| 'body1'
| 'body2'
| 'button'
| 'label'
| 'hint';

/**
 *  Interface for Theme typography creation config
 */
export interface JssThemeTypographyDefaults {
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
export interface JssThemeTypography extends Required<JssThemeTypographyDefaults> {
  h1: JssThemeTypographyItem;
  h2: JssThemeTypographyItem;
  h3: JssThemeTypographyItem;
  h4: JssThemeTypographyItem;
  h5: JssThemeTypographyItem;
  h6: JssThemeTypographyItem;

  subtitle1: JssThemeTypographyItem;
  subtitle2: JssThemeTypographyItem;

  body1: JssThemeTypographyItem;
  body2: JssThemeTypographyItem;

  button: JssThemeTypographyItem & { textTransform: string };

  label: JssThemeTypographyItem;

  hint: JssThemeTypographyItem;
}

/**
 *  Interface for Theme transitions
 */
export interface JssThemeTransitions {
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
export type JssThemeBreakpointsKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 *  Interface for Theme breakpoints values
 */
export type JssThemeBreakpointsValues = Record<OneOf<JssThemeBreakpointsKeys>, number>;

/**
 *  Interface for Theme breakpoints
 */
export interface JssThemeBreakpoints {
  /** Breakpoints keys */
  keys: JssThemeBreakpointsKeys;

  /** Breakpoints values */
  values: JssThemeBreakpointsValues;

  /** Returns min-width media query for provided value + 1. up(768) => min-width: 769px */
  up: (value: OneOf<JssThemeBreakpointsKeys> | number) => string;

  /** Returns max-width media query for provided value. down(768) => max-width: 768px */
  down: (value: OneOf<JssThemeBreakpointsKeys> | number) => string;

  /**
   *  Returns min-width & max-width media query for provided values. Example:
   *  between(768, 1024) => ( min-width: 769px) and (max-width: 1024px)
   */
  between: (start: OneOf<JssThemeBreakpointsKeys> | number, end: OneOf<JssThemeBreakpointsKeys> | number) => string;

  /**
   *  Returns min-width & max-width media query for provided value. Example:
   *  only('sm') => ( min-width: 769px) and (max-width: 1024px)
   */
  only: (value: OneOf<JssThemeBreakpointsKeys>) => string;

  /** Returns value for provided key */
  width: (value: OneOf<JssThemeBreakpointsKeys>) => number;
}

/**
 *  Interface for Theme shadows
 */
export type JssThemeShadows = string[];


/**
 *  Interface for Theme shadow object config
 */
export interface JssThemeShadowObject {
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
export type JssThemeShadowTuple = [number?, number?, number?, number?, string?, boolean?];

/**
 *  Interface for Theme shape options
 */
export interface JssThemeShape {
  borderRadius: number | string;
}

/**
 *  Interface for Theme zIndex options
 */
export interface JssThemeZIndex {
  modal: number;
  drawer: number;
  snackbar: number;
  tooltip: number;
}

/**
 *  Interface for Theme default mixins
 */
export interface JssThemeMixins {
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
  font: (prop: JssThemeTypographyItems) => string;

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
  boxShadow: (...shadows: Array<JssThemeShadowTuple | JssThemeShadowObject>) => string;

  /**
   *  Mixin for font property usage.
   *
   *  @param size - Size to convert into rem
   *  @param htmlFontSize - Html tag font size
   */
  pxToRem: (size: number) => string;
}

/**
 *  Interface for Theme mixins factory: JssThemeMixins object or fucntion which produces them
 */
export type JssThemeMixinsFactory = ((Theme: JssThemeConstructor) => JssThemeMixins) | JssThemeMixins;

/**
 *  Interface for app theme.
 *  Most options are similar to React MUI with some additions / changes
 *
 *  @see https://material-ui.com/ru/customization/default-theme/
 */
export interface JssThemeDefault {
  spacing: number;
  maxWidth: number | string;
  direction: string;

  palette: JssThemePalette;
  typography: JssThemeTypography;
  shape: JssThemeShape;
  shadows: JssThemeShadows;
  breakpoints: JssThemeBreakpoints;
  mixins: JssThemeMixins;
  transitions: JssThemeTransitions;
  zIndex: JssThemeZIndex;

  updatedHash?: number;
}

/**
 *  Interface for custom Theme constructor
 */
export interface JssThemeConstructor<T extends any = any> {
  getTheme(): T;
}
