import { DefaultTheme } from '../typings';
import { createPalette } from './createPalette';
import { createBreakpoints } from './createBreakpoints';
import { createMixins } from './mixins';
import { shadows } from './createShadows';
import { createTypography } from './createTypography';

/**
 *  Default theme
 */
/* eslint-disable-next-line */
export const defaultTheme = (Theme: any): DefaultTheme => ({
  spacing: 8,
  maxWidth: 1024,
  direction: 'ltr',

  palette: {
    type: 'light',

    common: {
      black: '#000000',
      white: '#ffffff',
    },

    primary: createPalette('#16a94a', '#ffffff'),
    secondary: createPalette('#1373e2', '#ffffff'),
    error: createPalette('#cc0000', '#ffffff'),
    warning: createPalette('#16a94a', '#333333'),
    info: createPalette('#16a94a', '#333333'),
    success: createPalette('#16a94a', '#333333'),

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
  typography: createTypography(),
  mixins: createMixins(Theme),
  breakpoints: createBreakpoints(),
  shadows,
  shape: {
    borderRadius: 4,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    drawer: 120,
    modal: 130,
    snackbar: 140,
    tooltip: 150,
  },
});
