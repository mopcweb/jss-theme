import { JssTheme, ThemeTypographyItems, ThemeMixins, ThemeConstructor, DefaultTheme } from '../typings';
import { createShadows } from './createShadows';
import { fade, darken, lighten, getContrastColor } from './colorManipulator';

/**
 *  Mixin for font property usage
 *
 *  @param theme - Current theme
 *  @param prop - Property name to use mixin of
 */
export const fontMixin = <T extends JssTheme = JssTheme>(theme: T, prop: ThemeTypographyItems): string => {
  const { fontWeight, fontSize, lineHeight, fontFamily } = theme.typography[prop];

  return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
};

/**
 *  Mixin for font property usage
 *
 *  @param size - Size to convert into rem
 *  @param htmlFontSize - Html tag font size
 */
export const pxToRem = (size: number, htmlFontSize: number): string => `${(size / htmlFontSize)}rem`;

/**
 *  Parses array of items and creates CSS gradient accaptable string
 *
 *  @param breakpoints - List of breakpoints. String | numbers | array separated by comma
 */
export const parseBreakpoints = (...breakpoints: Array<string | number | [string, number, number?]>): string => {
  let result = '';

  breakpoints.forEach((item, i) => {
    if (typeof item === 'string') {
      if (i === 0) result += `${item}`;
      else result += `, ${item}`;
      return;
    }

    if (typeof item === 'number') {
      if (item >= 0 && item <= 1) result += ` ${item * 100}%`;
      else result += ` ${item}px`;
      return;
    }

    if (Array.isArray(item)) {
      let [value] = item;
      const [, ...rest] = item;

      value = i === 0 ? `${item[0]}` : `, ${item[0]}`;

      const bps: string[] = [];
      rest.forEach((unit, index) => {
        if (!unit) return;

        bps[index] = (unit >= 0 && unit <= 1) ? `${unit * 100}%` : `${unit}px`;
      });

      result += `${value} ${bps.join(' ')}`;
    }
  });

  return result;
};

/* eslint-disable no-param-reassign */
/**
 *  Creates CSS gradient
 *
 *  @see https://developer.mozilla.org/ru/docs/Web/CSS/gradient
 *
 *  @param type - CSS gradient type
 *  @param bps - Breakpoints (aka <color-stops>) for creating gradient. For details see link above
 */
export const createGradient = (
  type: 'linear-gradient' | 'repeating-linear-gradient' | 'radial-gradient' | 'repeating-radial-gradient',
  ...bps: Array<Array<string | number | [string, number, number?]> | string>
): string => bps.reduce((acc, item, i) => {
  const prefix = (str: string): string => (i === 0 ? str : `, ${str}`);

  if (typeof item === 'string') acc += prefix(`${type}(${item})`);
  else acc += prefix(`${type}(${parseBreakpoints(...item)})`);

  /* eslint-disable-next-line */
  return acc as any;
}, '');

/**
 *  Creates default mixins and binds them to provided Theme instance
 *
 *  @param Theme - Theme instance to which bind mixins
 */
export const createMixins = (Theme: ThemeConstructor<DefaultTheme>): ThemeMixins => ({
  fade,
  getContrastColor,
  darken: (color: string, coef = Theme.getTheme().palette.tonalOffset): string => darken(color, coef),
  lighten: (color: string, coef = Theme.getTheme().palette.tonalOffset): string => lighten(color, coef),
  gradient: {
    l: (...bps): string => createGradient('linear-gradient', bps),
    rl: (...bps): string => createGradient('repeating-linear-gradient', bps),
    r: (...bps): string => createGradient('radial-gradient', bps),
    rr: (...bps): string => createGradient('repeating-radial-gradient', bps),
  },
  spacing: (
    ...units: Array<number | string>
  ): string => units.map((item) => (typeof item === 'string' ? item : `${item * Theme.getTheme().spacing}px`)).join(' '),
  border: (units = 1, color = Theme.getTheme().palette.grey[400]): string => `${units}px solid ${color}`,
  font: (prop: ThemeTypographyItems): string => fontMixin(Theme.getTheme(), prop),
  transition: (
    transition?: string, duration = 1, delay = 0, prop = 'all',
  ): string => `${prop} ${typeof duration === 'string'
    ? duration
    : `${duration}s`} ${transition} ${typeof delay === 'string' ? delay : `${delay}s`}`,
  boxShadow: createShadows,
  pxToRem: (size: number): string => pxToRem(size, Theme.getTheme().typography.htmlFontSize),
});
