import { ThemeTypography, ThemeTypographyItem, ThemeTypographyDefaults, ThemeTypographyItems } from '../typings';
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
  defaultConfig: ThemeTypographyDefaults = { },
  fontSizes: Partial<Record<ThemeTypographyItems, number>> = {},
  lineHeights: Partial<Record<ThemeTypographyItems | 'basic', number | string>> = {},
): ThemeTypography => {
  /* eslint-disable no-param-reassign */
  if (!defaultConfig) defaultConfig = {};
  if (!fontSizes) fontSizes = {};
  if (!lineHeights) lineHeights = {};

  const defaults = createTypographyDefaults(defaultConfig);
  const { fontFamily, htmlFontSize, fontWeightLight, fontWeightMedium, fontWeightRegular } = defaults;
  const {
    h1: h1Font = 96,
    h2: h2Font = 60,
    h3: h3Font = 48,
    h4: h4Font = 34,
    h5: h5Font = 24,
    h6: h6Font = 20,

    subtitle1: subtitle1Font = 16,
    subtitle2: subtitle2Font = 14,

    body1: body1Font = 16,
    body2: body2Font = 14,

    button: buttonFont = 14,

    label: labelFont = 12,

    hint: hintFont = 12,
  } = fontSizes;
  const {
    h1 = lineHeights.basic || 1.167,
    h2 = lineHeights.basic || 1.2,
    h3 = lineHeights.basic || 1.167,
    h4 = lineHeights.basic || 1.235,
    h5 = lineHeights.basic || 1.334,
    h6 = lineHeights.basic || 1.6,

    subtitle1 = lineHeights.basic || 1.75,
    subtitle2 = lineHeights.basic || 1.57,

    body1 = lineHeights.basic || 1.5,
    body2 = lineHeights.basic || 1.43,

    button = lineHeights.basic || 1.75,

    label = lineHeights.basic || 1.43,

    hint = lineHeights.basic || 1.43,
  } = lineHeights;

  return {
    ...defaults,

    h1: createTypographyItem(fontFamily, fontWeightLight, pxToRem(h1Font, htmlFontSize), h1),
    h2: createTypographyItem(fontFamily, fontWeightLight, pxToRem(h2Font, htmlFontSize), h2),
    h3: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(h3Font, htmlFontSize), h3),
    h4: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(h4Font, htmlFontSize), h4),
    h5: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(h5Font, htmlFontSize), h5),
    h6: createTypographyItem(fontFamily, fontWeightMedium, pxToRem(h6Font, htmlFontSize), h6),

    subtitle1: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(subtitle1Font, htmlFontSize), subtitle1),
    subtitle2: createTypographyItem(fontFamily, fontWeightMedium, pxToRem(subtitle2Font, htmlFontSize), subtitle2),

    body1: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(body1Font, htmlFontSize), body1),
    body2: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(body2Font, htmlFontSize), body2),

    button: {
      ...createTypographyItem(fontFamily, fontWeightMedium, pxToRem(buttonFont, htmlFontSize), button),
      textTransform: 'uppercase',
    },

    label: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(labelFont, htmlFontSize), label),

    hint: createTypographyItem(fontFamily, fontWeightRegular, pxToRem(hintFont, htmlFontSize), hint),
  };
};
