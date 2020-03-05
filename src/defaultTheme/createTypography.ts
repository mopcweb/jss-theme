import merge from 'lodash.merge';

import {
  ThemeTypography, ThemeTypographyItem, ThemeTypographyDefaults, DeepPartial,
} from '../typings';
import { pxToRem } from './mixins';

/**
 *  Creates typography item variant
 *
 *  @param fontFamily - Font family css prop
 *  @param fontWeight - Font weight css prop
 *  @param fontSize - Font size css prop
 *  @param lineHeight - Line height css prop
 */
export const createTypographyItem = (
  fontFamily: string, fontWeight: number | string, fontSize: number | string, lineHeight: number | string,
): ThemeTypographyItem => ({
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
});

/**
 *  Creates typography defaults
 *
 *  @param config - Optional typography config
 */
export const createTypographyDefaults = (
  config: ThemeTypographyDefaults = {},
): Required<ThemeTypographyDefaults> => {
  const {
    htmlFontSize = 16,
    lineHeight = 1.2,
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 600,
  } = config;

  return {
    htmlFontSize,
    lineHeight,
    fontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
  };
};

/**
 *  Creates Theme typography
 */
export const createTypography = (
  typography: DeepPartial<ThemeTypography> = { },
): ThemeTypography => {
  /* eslint-disable no-param-reassign */
  if (!typography) typography = {};

  const defaults = createTypographyDefaults(typography);
  const {
    fontFamily, htmlFontSize, fontWeightLight, fontWeightMedium, fontWeightRegular,
  } = defaults;
  const {
    lineHeight,
    h1 = { },
    h2 = { },
    h3 = { },
    h4 = { },
    h5 = { },
    h6 = { },
    subtitle1 = { },
    subtitle2 = { },
    body1 = { },
    body2 = { },
    button = { },
    label = { },
    hint = { },
  } = typography;

  return merge({
    ...defaults,

    h1: createTypographyItem(
      h1.fontFamily || fontFamily, h1.fontWeight || fontWeightLight,
      h1.fontSize || pxToRem(96, htmlFontSize), h1.lineHeight || lineHeight || 1.167,
    ),
    h2: createTypographyItem(
      h2.fontFamily || fontFamily, h2.fontWeight || fontWeightLight,
      h2.fontSize || pxToRem(60, htmlFontSize), h2.lineHeight || lineHeight || 1.2,
    ),
    h3: createTypographyItem(
      h3.fontFamily || fontFamily, h3.fontWeight || fontWeightRegular,
      h3.fontSize || pxToRem(48, htmlFontSize), h3.lineHeight || lineHeight || 1.167,
    ),
    h4: createTypographyItem(
      h4.fontFamily || fontFamily, h4.fontWeight || fontWeightRegular,
      h4.fontSize || pxToRem(34, htmlFontSize), h4.lineHeight || lineHeight || 1.235,
    ),
    h5: createTypographyItem(
      h5.fontFamily || fontFamily, h5.fontWeight || fontWeightRegular,
      h5.fontSize || pxToRem(24, htmlFontSize), h5.lineHeight || lineHeight || 1.334,
    ),
    h6: createTypographyItem(
      h6.fontFamily || fontFamily, h6.fontWeight || fontWeightMedium,
      h6.fontSize || pxToRem(20, htmlFontSize), h6.lineHeight || lineHeight || 1.6,
    ),

    subtitle1: createTypographyItem(
      subtitle1.fontFamily || fontFamily, subtitle1.fontWeight || fontWeightRegular,
      subtitle1.fontSize || pxToRem(16, htmlFontSize), subtitle1.lineHeight || lineHeight || 1.75,
    ),
    subtitle2: createTypographyItem(
      subtitle2.fontFamily || fontFamily, subtitle2.fontWeight || fontWeightMedium,
      subtitle2.fontSize || pxToRem(14, htmlFontSize), subtitle2.lineHeight || lineHeight || 1.57,
    ),

    body1: createTypographyItem(
      body1.fontFamily || fontFamily, body1.fontWeight || fontWeightRegular,
      body1.fontSize || pxToRem(16, htmlFontSize), body1.lineHeight || lineHeight || 1.5,
    ),
    body2: createTypographyItem(
      body2.fontFamily || fontFamily, body2.fontWeight || fontWeightRegular,
      body2.fontSize || pxToRem(14, htmlFontSize), body2.lineHeight || lineHeight || 1.43,
    ),

    button: {
      ...createTypographyItem(
        button.fontFamily || fontFamily, button.fontWeight || fontWeightMedium,
        button.fontSize || pxToRem(14, htmlFontSize), button.lineHeight || lineHeight || 1.75,
      ),
      textTransform: 'uppercase',
    },

    label: createTypographyItem(
      label.fontFamily || fontFamily, label.fontWeight || fontWeightRegular,
      label.fontSize || pxToRem(12, htmlFontSize), label.lineHeight || lineHeight || 1.43,
    ),

    hint: createTypographyItem(
      hint.fontFamily || fontFamily, hint.fontWeight || fontWeightRegular,
      hint.fontSize || pxToRem(12, htmlFontSize), hint.lineHeight || lineHeight || 1.43,
    ),
  }, { ...typography, lineHeight: lineHeight || 1.2 });
};
