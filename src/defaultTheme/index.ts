import merge from 'lodash.merge';

import { DefaultTheme, DeepPartial, ThemeConstructor } from '../typings';
import { createPalette } from './createPalette';
import { createBreakpoints } from './createBreakpoints';
import { createMixins } from './mixins';
import { shadows } from './createShadows';
import { createTypography } from './createTypography';
import { createZIndex } from './createZIndex';

/**
 *  Creates default theme with optional overrides
 *
 *  @param Theme - Theme instance to bind mixins to it
 *  @param theme - Overrides for default theme
 */
export const createDefaultThemeConfig = (
  Theme: ThemeConstructor<DefaultTheme>, theme: DeepPartial<DefaultTheme> = {},
): DefaultTheme => ({
  spacing: theme.spacing || 8,
  maxWidth: theme.maxWidth || '100%',
  direction: theme.direction || 'ltr',

  palette: createPalette(theme.palette),
  typography: createTypography(theme.typography),
  mixins: merge(createMixins(Theme), theme.mixins),
  breakpoints: createBreakpoints(theme.breakpoints && theme.breakpoints.values),
  shadows: merge([...shadows], theme.shadows),
  shape: merge({
    borderRadius: 4,
  }, theme.shape),
  transitions: merge({
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  }, theme.transitions),
  zIndex: createZIndex(theme.zIndex),
});
