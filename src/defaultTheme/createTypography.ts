import { ThemeTypography, ThemeTypographyItem, ThemeTypographyDefaults } from '../typings';
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
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 600,
  } = config;

  return {
    htmlFontSize,
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
  defaults: Required<ThemeTypographyDefaults> = createTypographyDefaults(),
): ThemeTypography => {
  const { fontFamily, htmlFontSize, fontWeightLight, fontWeightMedium, fontWeightRegular } = defaults;

  return {
    ...defaults,

    h1: createTypographyItem(fontFamily, fontWeightLight, pxToRem(96, htmlFontSize), 1.167),
    h2: createTypographyItem(fontFamily, fontWeightLight, pxToRem(60, htmlFontSize), 1.2),
    h3: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(48, htmlFontSize), 1.167),
    h4: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(34, htmlFontSize), 1.235),
    h5: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(24, htmlFontSize), 1.334),
    h6: createTypographyItem(fontFamily, fontWeightMedium, pxToRem(20, htmlFontSize), 1.6),

    subtitle1: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(16, htmlFontSize), 1.75),
    subtitle2: createTypographyItem(fontFamily, fontWeightMedium, pxToRem(14, htmlFontSize), 1.57),

    body1: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(16, htmlFontSize), 1.5),
    body2: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(14, htmlFontSize), 1.43),

    button: {
      ...createTypographyItem(fontFamily, fontWeightMedium, pxToRem(14, htmlFontSize), 1.75),
      textTransform: 'uppercase',
    },

    label: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(12, htmlFontSize), 1.43),

    hint: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(12, htmlFontSize), 1.43),
  };
};
