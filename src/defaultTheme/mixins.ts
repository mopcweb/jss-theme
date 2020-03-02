import { JssTheme, ThemeTypographyItems, ThemeMixins } from '../typings';
import { createShadows } from './createShadows';

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

/* eslint-disable-next-line */
export const createMixins = (Theme: any): ThemeMixins => ({
  gradient: (dir: string, ...breakpoints: string[]): string => `linear-gradient(${dir}, ${breakpoints})`,
  spacing: (units: number): number => units * Theme.getTheme().spacing,
  border: (units = 1, color = Theme.getTheme().palette.grey[400]): string => `${units}px solid ${color}`,
  font: (prop: ThemeTypographyItems): string => fontMixin(Theme.getTheme(), prop),
  transition: (
    transition?: string, duration = 1, delay = 0, prop = 'all',
  ): string => `${prop} ${typeof duration === 'string'
    ? duration
    : `${duration}s`} ${transition} ${typeof delay === 'string' ? delay : `${delay}s`}`,
  transparent: (color: string, opacity = '80'): string => `${color}${opacity}`,
  boxShadow: createShadows,
  pxToRem: (size: number): string => pxToRem(size, Theme.getTheme().typography.htmlFontSize),
});
