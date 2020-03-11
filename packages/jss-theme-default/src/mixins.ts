import { JssTheme, JssThemeTypographyItems, JssThemeMixins, JssThemeConstructor, JssThemeDefault } from './typings';
import { createShadows } from './createShadows';
import { fade, darken, lighten, getContrastColor } from './colorManipulator';

/**
 *  Mixin for font property usage
 *
 *  @param theme - Current theme
 *  @param prop - Property name to use mixin of
 */
export const fontMixin = <T extends JssTheme = JssTheme>(theme: T, prop: JssThemeTypographyItems): string => {
  const { fontWeight, fontSize, lineHeight, fontFamily } = theme.typography[prop];

  const size = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

  return `${fontWeight} ${size}/${lineHeight} ${fontFamily}`;
};

/**
 *  Mixin for font property usage
 *
 *  @param size - Size to convert into rem
 *  @param htmlFontSize - Html tag font size
 */
export const pxToRem = (size: number, htmlFontSize = 16): string => `${(size / htmlFontSize)}rem`;

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
 *  @param [Theme] - Theme instance to bind mixins to it. This one is optional since v0.5.4 as
 *  on Theme instance creation there is an additional layer which binds mixins to created Theme instance
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function createMixins(Theme?: JssThemeConstructor<JssThemeDefault>): JssThemeMixins {
  return {
    fade,
    getContrastColor,

    // Mixins w/ binding to Theme props
    darken(color: string, coef?: number): string {
      if (!coef && coef !== 0) {
        const theme: any = Theme || this;
        coef = theme.getTheme().palette.tonalOffset;
      }

      return darken(color, coef);
    },
    lighten(color: string, coef?: number): string {
      if (!coef && coef !== 0) {
        const theme: any = Theme || this;
        coef = theme.getTheme().palette.tonalOffset;
      }

      return lighten(color, coef);
    },
    spacing(
      ...units: Array<number | string>
    ): string {
      const theme: any = Theme || this;
      return units.map((item) => (typeof item === 'string' ? item : `${item * theme.getTheme().spacing}px`)).join(' ');
    },
    border(units = 1, color?: string): string {
      if (!color) {
        const theme: any = Theme || this;
        /* eslint-disable-next-line */
        color = theme.getTheme().palette.grey[400];
      }

      return `${units}px solid ${color}`;
    },
    font(prop: JssThemeTypographyItems): string {
      const theme: any = Theme || this;
      return fontMixin(theme.getTheme(), prop);
    },
    pxToRem(size: number, htmlFontSize?: number): string {
      if (!htmlFontSize) {
        const theme: any = Theme || this;
        htmlFontSize = theme.getTheme().typography.htmlFontSize;
      }

      return pxToRem(size, htmlFontSize);
    },

    // Mixins without binding to Theme props
    transition: (
      transition?: string, duration = 1, delay = 0, prop = 'all',
    ): string => `${prop} ${typeof duration === 'string'
      ? duration
      : `${duration}s`} ${transition} ${typeof delay === 'string' ? delay : `${delay}s`}`,
    boxShadow: createShadows,
    gradient: {
      l: (...bps): string => createGradient('linear-gradient', bps),
      rl: (...bps): string => createGradient('repeating-linear-gradient', bps),
      r: (...bps): string => createGradient('radial-gradient', bps),
      rr: (...bps): string => createGradient('repeating-radial-gradient', bps),
    },
  };
}

/**
 *  This one is factory which returns fucntion for creating mixins.
 *  TODO: this one is not ready for now thus is not exported.
 */
// function createMixinsFactory(): ((Theme?: JssThemeConstructor) => JssThemeMixins) {
//   return createMixins;
// }
