import { DefaultTheme } from '../typings';
import { createPalette } from './createPalette';
import { createBreakpoints } from './createBreakpoints';
import { createMixins } from './mixins';
import { shadows } from './createShadows';
import { createTypography } from './createTypography';
import { createZIndex } from './createZIndex';

/**
 *  Default theme
 */
/* eslint-disable-next-line */
export const defaultTheme = (Theme: any): DefaultTheme => ({
  spacing: 8,
  maxWidth: 1024,
  direction: 'ltr',

  palette: createPalette(),
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
  zIndex: createZIndex(),
});
