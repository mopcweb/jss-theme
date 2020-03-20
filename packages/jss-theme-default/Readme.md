# JSS Default Theme

[![npm version](https://img.shields.io/npm/v/jss-theme-default.svg)](https://www.npmjs.com/package/jss-theme-default) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE) [![Size](https://img.shields.io/bundlephobia/minzip/jss-theme-default.svg)](https://npmjs.org/package/jss-theme-default) [![Downloads](https://img.shields.io/npm/dm/jss-theme-default.svg)](https://npmjs.org/package/jss-theme-default)

Inspired by Material Design & React MUI theming.

Independent part of [jss-theme](https://npmjs.org/package/jss-theme) package.

## Notes

Include necessary typescript typings.

## Usage

```ts
import { createDefaultJssTheme } from 'jss-theme-default';

const theme = createDefaultJssTheme({ spacing: 12 });

console.log(theme.spacing === 12);
```

## Desription

Default theme provides object for usage w/ JSS like stlyes approach.

It also provides bunch of methods for  updating this theme or creating new one with similar structure:

Similar structure is [here](https://material-ui.com/ru/customization/default-theme/).

- __createDefaultJssTheme(themeConfig?, ThemeInstance?) => DefaultTheme__
	Creates structure for  DefaultTheme, with optional overrides. Second param is for existing [ThemeInstance](https://npmjs.org/package/jss-theme) in order to bind mixins to it.
- __createTypography(typography?), createPalette(palette?), createBreakpoints(breakpoints?), createZIndex(zIndex?), createMixins(Theme)__ - aliases for creating DefaultTheme parts. Could be used for example for updating DefaultTheme theme. For each method it is possible to provide partial overrides, for all not overridden values will be used defaults.
- __IMPORTANT: createPalette(palette?)__: for main colors (primary, secondary, error, info, success, warning) it is OK to provide only main shade. Functions will automatically calculate light, dark and contrastText color. Still you can provide custom for all of them.
- __createColor(color, contrastText?, bw?)__ - For provided color creates color palette w/ lighten, darken, contrastText colors.
- __createGreyPalette(initial?)__ - Creates shades of grey for provided first shade.
- __createTypographyItem(fontFamily, fontWeight, fontSize, lineHeight)__ - Creates typography item object.
- __createShadows()__ - Creates shadows
```ts
const shadows = createShadows(
	[1, 1, 1, 1, '#000', true],
	{ x: 5, y: 5, blur: 5, spread: 5, color: '#000', inset: true },
);// => inset 1px 1px 1px 1px #000, inset 5px 5px 5px 5px #000
```
- __createMaterialShadows(...ps)__  - Similar just using some Material Design style for creating shadows.
[Here each 4 values represents 1 shadow](https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss):
```ts
const shadows = createMaterialShadows(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0);
 ```
- __fade(color, opacity), darken(color, lvl?), lighten(color, lvl?), getContrastColor(color, bw?, black?, white?)__ Work w/ colors: transparency, getting dark / light shade, getting contrast text.
If provided just 1 param to getContrastColor - it will invert color. If provide second boolean param -> it will get contrast (black/white color, where 3d and 4th params can override default colors for contrast black and white)

## Default theme signature

```ts
{
  spacing: 8,
  maxWidth: "100%",
  direction: "ltr",
  palette: {
    type: "light",
    tonalOffset: 0.2,
    common: {
      black: "#000000",
      white: "#ffffff"
    },
    primary: {
      light: "#4791db",
      main: "#1976d2",
      dark: "#115293",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#e33371",
      main: "#dc004e",
      dark: "#9a0036",
      contrastText: "#ffffff"
    },
    error: {
      light: "#f6685e",
      main: "#f44336",
      dark: "#aa2e25",
      contrastText: "#ffffff"
    },
    warning: {
      light: "#ffac33",
      main: "#ff9800",
      dark: "#b26a00",
      contrastText: "#ffffff"
    },
    info: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#ffffff"
    },
    success: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#ffffff"
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#ffffff",
      default: "#fafafa"
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  },
  typography: {
    htmlFontSize: 16,
    lineHeight: 1.2,
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167
    },
    h2: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2
    },
    h3: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167
    },
    h4: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235
    },
    h5: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334
    },
    h6: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6
    },
    subtitle1: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75
    },
    subtitle2: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57
    },
    body1: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5
    },
    body2: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43
    },
    button: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      textTransform: "uppercase"
    },
    label: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.43
    },
    hint: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.43
    }
  },
  mixins: {
    gradient: {
      l: (...breakpoints: Array<string | number | [string, number, number?]>) => string,
      rl: (...breakpoints: Array<string | number | [string, number, number?]>) => string,
      r: (...breakpoints: Array<string | number | [string, number, number?]>) => string,
      rr: (...breakpoints: Array<string | number | [string, number, number?]>) => string,
    },
    spacing: (...units: Array<number | string>) => string,
    border: (units?: number, color?: string) => string,
    font: (prop: JssThemeTypographyItems) => string,
    transition: (transition: string, duration?: number | string, delay?: number | string, prop?: string) => string,
    fade: (color: string, opacity?: string | number) => string,
    darken: (customColor: string, coef?: number) => string,
    lighten: (customColor: string, coef?: number) => string,
    getContrastColor: (color: string, bw?: boolean, black?: string, white?: string) => string,
    boxShadow: (...shadows: Array<JssThemeShadowTuple | JssThemeShadowObject>) => string,
    pxToRem: (size: number) => string,
  },
  breakpoints: {
    keys: [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  shape: {
    borderRadius: 4
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    }
  },
  zIndex: {
    drawer: 120,
    modal: 130,
    snackbar: 140,
    tooltip: 150
  }
}
```
