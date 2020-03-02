import { ThemePaletteItem } from '../typings';

/**
 *  Composer for creating palette color from provided
 *
 *  @param color - Main color
 *  @param contrastText - Contrast text color
 */
export const createPalette = (color: string, contrastText: string): ThemePaletteItem => ({
  light: color,
  main: color,
  dark: color,
  contrastText,
});
