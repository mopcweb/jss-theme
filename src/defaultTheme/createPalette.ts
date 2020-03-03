import {
  ThemePaletteColor, ThemePaletteGrey, ThemePaletteBasicColors, ThemePalette, ThemePaletteType,
  DeepPartial,
} from '../typings';
import { darken, lighten, getContrastColor, rgbToHex } from './colorManipulator';

/**
 *  Creates shadows of grey (darken) from provided basic color
 *
 *  @param initial - Initial color, for which to create darkened versions
 */
export const createGreyPalette = (initial: string): ThemePaletteGrey => {
  const grey: ThemePaletteGrey = { 50: initial } as ThemePaletteGrey;

  grey[100] = rgbToHex(darken(initial, 0.017));
  grey[200] = rgbToHex(darken(grey[100], 0.025));
  grey[300] = rgbToHex(darken(grey[200], 0.055));
  grey[400] = rgbToHex(darken(grey[300], 0.155));
  grey[500] = rgbToHex(darken(grey[400], 0.16));
  grey[600] = rgbToHex(darken(grey[500], 0.255));
  grey[700] = rgbToHex(darken(grey[600], 0.165));
  grey[800] = rgbToHex(darken(grey[700], 0.31));
  grey[900] = rgbToHex(darken(grey[800], 0.5));

  grey.A100 = rgbToHex(darken(initial, 0.145));
  grey.A200 = rgbToHex(darken(initial, 0.317));
  grey.A400 = rgbToHex(darken(initial, 0.805));
  grey.A700 = rgbToHex(darken(initial, 0.61));

  return grey;
};

/**
 *  Creates palette color from provided main color.
 *  Automatically creates darken and lighten options of provided color.
 *  Optionally could be provided contrastText color or it will be calculated from provided main color
 *
 *  @param color - Main color
 *  @param [contrastText] - Contrast text color
 *  @param [bw=true] - Whether to use only black/white colors for contrastText
 */
export const createColor = (color: string, contrastText?: string, bw = true): ThemePaletteColor => ({
  light: rgbToHex(lighten(color)),
  main: color,
  dark: rgbToHex(darken(color)),
  contrastText: contrastText || getContrastColor(color, bw, 'rgba(0, 0, 0, 0.87)'),
});

/**
 *  Default Material Design palettes - light and dark one
 */
export const materialColors: { light: ThemePaletteBasicColors; dark: ThemePaletteBasicColors } = {
  light: {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    divider: 'rgba(0, 0, 0, 0.12)',

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
  },
  dark: {
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#424242',
      default: '#303030',
    },
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
};

/**
 *  Gets material default palette depending on provided type
 */
export const getMaterialColors = (type: ThemePaletteType): ThemePaletteBasicColors => materialColors[type];

/**
 *  Create whole palette
 *
 *  @param palette - Partial palette options
 *  @param [useMaterialDarkenMultiplier=false] - For default theme multiply darken * 1.5 according to Material Design
 */
export const createPalette = (
  palette: DeepPartial<ThemePalette> = { }, useMaterialDarkenMultiplier = false,
): ThemePalette => {
  /* eslint-disable prefer-const */
  /* eslint-disable no-param-reassign */
  let {
    type = 'light',
    tonalOffset = 0.2,
    common = {
      black: '#000000',
      white: '#ffffff',
    },
    primary = createColor('#1976d2'),
    secondary = createColor('#dc004e'),
    error = createColor('#f44336'),
    warning = createColor('#ff9800'),
    info = createColor('#2196f3'),
    success = createColor('#4caf50'),
    grey = { 50: '#fafafa' },
  } = palette;

  if (!common.black) common.black = '#000000';
  if (!common.white) common.white = '#ffffff';

  let errorFound = false;
  [primary, secondary, error, warning, info, success].forEach((item) => {
    if (errorFound) return;
    if (!item.main) {
      errorFound = true;
      return;
    }
    if (!item.light) item.light = rgbToHex(lighten(item.main, tonalOffset));
    if (!item.dark) {
      item.dark = rgbToHex(darken(item.main, useMaterialDarkenMultiplier ? tonalOffset * 1.5 : tonalOffset));
    }
    if (!item.contrastText) item.contrastText = getContrastColor(item.main, true, 'rgba(0, 0, 0, 0.87)');
  });

  if (errorFound) {
    throw Error('"Main" property is necessary for each color variant');
  }

  const greyKeys = Object.keys(grey);
  if (!greyKeys.length) {
    throw Error('It is necessary to provide at least one grey palette key');
  }

  if (greyKeys.length !== 14) {
    /* eslint-disable-next-line */
    grey = createGreyPalette((grey as any)[greyKeys[0]]);
  }

  return {
    type,
    tonalOffset,
    common,
    primary,
    secondary,
    error,
    warning,
    info,
    success,
    grey,
    ...getMaterialColors(type),
    /* eslint-disable-next-line */
  } as any;
};
