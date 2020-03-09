import merge from 'lodash.merge';

import { DefaultTheme, DeepPartial, ThemeConstructor } from '../typings';
import { createPalette } from './createPalette';
import { createBreakpoints } from './createBreakpoints';
import { createMixins } from './mixins';
import { shadows } from './createShadows';
import { createTypography } from './createTypography';
import { createZIndex } from './createZIndex';

/**
 *  Creates default themeConfig with optional overrides
 *
 *  @param themeConfig - Overrides for default themeConfig
 *  @param [Theme] - Theme instance to bind mixins to it. This one is optional since v0.5.4 as
 *  on Theme instance creation there is an additional layer which binds mixins to created Theme instance
 */
export const createDefaultThemeConfig = (
  themeConfig: DeepPartial<DefaultTheme> = {}, Theme?: ThemeConstructor<DefaultTheme>,
): DefaultTheme => ({
  spacing: themeConfig.spacing || 8,
  maxWidth: themeConfig.maxWidth || '100%',
  direction: themeConfig.direction || 'ltr',

  palette: createPalette(themeConfig.palette),
  typography: createTypography(themeConfig.typography),
  mixins: merge(createMixins(Theme), themeConfig.mixins),
  breakpoints: createBreakpoints(themeConfig.breakpoints && themeConfig.breakpoints.values),
  shadows: merge([...shadows], themeConfig.shadows),
  shape: merge({
    borderRadius: 4,
  }, themeConfig.shape),
  transitions: merge({
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  }, themeConfig.transitions),
  zIndex: createZIndex(themeConfig.zIndex),
});
