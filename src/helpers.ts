/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Replacer, ThemeTypographyItems, ThemePaletteItem, ThemeBreakpoints, OneOf,
  ThemeBreakpointsKeys, JssTheme, ThemeBreakpointsValues,
} from './typings';

/**
 *  Check if argument is function
 *
 *  @param arg - Argument to check
 */
/* eslint-disable-next-line */
export const isFunction = (arg: any): boolean => arg && {}.toString.call(arg) === '[object Function]';

/**
 *  Replacer for objects keys
 *
 *  @param obj - Object to itarate through
 *  @param replacer - Rapacer or array of replacers to use
 */
export const replaceKey = <T extends Record<string, any> = Record<string, any>>(
  obj: T, replacer: Replacer | Replacer[],
): T => {
  const result: Record<string, any> = { };

  Object.keys(obj).forEach((key) => {
    let replacedKey = key;

    if (replacer) {
      let replacerArray: Replacer[] = [];
      if (!Array.isArray(replacer)) replacerArray.push(replacer);
      else replacerArray = replacer;

      replacerArray.forEach((item) => {
        replacedKey = replacedKey.replace(item.pattern, item.value);
      });
    }

    if (typeof obj[key] === 'object') result[replacedKey] = replaceKey(obj[key], replacer);
    else result[replacedKey] = obj[key];
  });

  return result as T;
};

/**
 *  Creates hash for provided string.
 *  JS implementation of Java's String.hashCode() method.
 *
 *  @param str - String to create hash for
 */
/* eslint-disable no-bitwise */
export const createHash = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
};
/* eslint-enable no-bitwise */

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
 *  Composer for creating palette color from provided
 *
 *  @param color - Main color
 *  @param [text] - Contrast text color
 */
export const paletteItemComposer = (color: string, text: string): ThemePaletteItem => ({
  light: color,
  main: color,
  dark: color,
  contrastText: text,
});


/**
 *  Composer for breakpoints
 *
 *  @param [customValues] - Custom breakpoints values
 */
export const breakpointsComposer = (customValues?: Partial<ThemeBreakpointsValues>): ThemeBreakpoints => {
  const keys: ThemeBreakpointsKeys = ['xs', 'sm', 'md', 'lg', 'xl'];
  const values: Record<OneOf<ThemeBreakpointsKeys> | string, number> = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    ...customValues,
  };

  const between = (
    start: OneOf<ThemeBreakpointsKeys> | number, end: OneOf<ThemeBreakpointsKeys> | number,
  ): string => {
    const startValue = typeof start === 'number' ? start : values[start];
    const endValue = typeof end === 'number' ? end : values[end];

    // if (startValue > endValue) [startValue, endValue] = [endValue, startValue];
    if (startValue > endValue) {
      throw Error(`${start} is less than ${end}`);
    }

    return `@media screen and (min-width: ${startValue}px) and (max-width: ${endValue}px)`;
  };

  const up = (
    key: OneOf<ThemeBreakpointsKeys> | number, to?: OneOf<ThemeBreakpointsKeys> | number,
  ): string => {
    const value = typeof key === 'number' ? key : values[key];

    if (!to) return `@media screen and (min-width: ${value}px)`;

    return between(key, to);
  };

  const down = (
    key: OneOf<ThemeBreakpointsKeys> | number, to?: OneOf<ThemeBreakpointsKeys> | number,
  ): string => {
    const value = typeof key === 'number' ? key : values[key];
    if (!to) return `@media screen and (max-width: ${value}px)`;

    return between(to, key);
  };

  const only = (key: OneOf<ThemeBreakpointsKeys>): string => {
    const value = values[key];

    if (!value) {
      throw Error('Only oneOf exisitng keys are allowed for this method. Invalid key provided');
    }

    const index = keys.findIndex((item) => item === key);
    const nextValue = index < 4 ? values[keys[index + 1]] : null;

    return nextValue
      ? `@media screen and (min-width: ${value}px) and (max-width: ${nextValue}px)`
      : `@media screen and (min-width: ${value}px)`;
  };

  const width = (key: OneOf<ThemeBreakpointsKeys>): number => {
    if (typeof key !== 'number') {
      throw Error('Only oneOf exisitng keys are allowed for this method');
    }

    return values[key];
  };

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
  };
};
