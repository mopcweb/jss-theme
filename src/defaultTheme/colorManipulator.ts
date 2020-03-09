// Inspired by React MUI https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/colorManipulator.js
import { ThemeColorTypes, ThemeColorObject } from '../typings';

/**
 *  Returns a number whose value is limited to the given range.
 *
 *  @param value - The value to be clamped
 *  @param min - The lower boundary of the output range
 *  @param max - The upper boundary of the output range
 */
export const clamp = (value: number, min = 0, max = 1): number => {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return Math.min(Math.max(min, value), max);
};

/**
 *  Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param color - Hex color, i.e. #nnn or #nnnnnn
 */
export const hexToRgb = (customColor: string): string => {
  let color = customColor.substr(1);

  if (color.length > 6) {
    color = color.slice(0, 6);
  }

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors ? `rgb(${colors.map((n) => parseInt(n, 16)).join(', ')})` : '';
};

/**
 *  Converts an integer to HEX color
 *
 *  @param int - An integer to convert
 */
export const intToHex = (int: number): string => {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 *  Returns an object with the type and values of a color.
 *
 *  Note: Does not support rgb % values.
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *
 *  @returns - A Theme color object
 */
export const decomposeColor = (color: string | ThemeColorObject): ThemeColorObject => {
  if (typeof color === 'object') {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker) as ThemeColorTypes;

  if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
    throw new Error(
      [
        `Unsupported \`${color}\` color.`,
        'Consider using following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().',
      ].join('\n'),
    );
  }

  const strings = color.substring(marker + 1, color.length - 1).split(',');
  const values = strings.map((value) => parseFloat(value as string));

  return { type, values };
};

/**
 * Converts a color object with type and values to a string.
 *
 *  @param color - Decomposed color
 *
 *  @returns A CSS color string
 */
export const recomposeColor = (color: ThemeColorObject): string => {
  const { type, values } = color;

  let result: Array<string | number> = [];

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    result = values.map((n, i) => (i < 3 ? parseInt(String(n), 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    result[1] = `${values[1]}%`;
    result[2] = `${values[2]}%`;
  }

  return `${type}(${result.join(', ')})`;
};

/**
 *  Converts a color from hsl format to rgb format.
 *
 *  @param color - HSL color values
 *
 *  @returns rgb color values
 */
export const hslToRgb = (customColor: string | ThemeColorObject): string => {
  const color = decomposeColor(customColor);
  const { values } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12): number => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type: ThemeColorTypes = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({ type: type as ThemeColorTypes, values: rgb });
};

/**
 *  The relative brightness of any point in a color space,
 *  normalized to 0 for darkest black and 1 for lightest white.
 *
 *  Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *
 *  @returns The relative brightness of the color in the range 0 - 1
 */
export const getLuminance = (customColor: string): number => {
  const color = decomposeColor(customColor);

  let rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

/**
 *  Set the absolute transparency of a color.
 *  Any existing alpha values are overwritten.
 *
 *   @see For HEX: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *  @param value - value to set the alpha channel to in the range 0 -1
 *
 *  @returns A CSS color string. If provided HEX color and integer opacity will return it in rgba
 */
export const fade = (customColor: string, opacity: string | number): string => {
  let color = customColor;
  if (color.indexOf('#') === 0 && typeof opacity === 'string') {
    // if (typeof opacity !== 'string' || opacity.length !== 2) {
    //   throw Error('For HEX colors opacity could be provided only in form of string');
    // }

    color = color.slice(1, 7);

    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    if (color.length !== 6) {
      throw Error(`Invalid HEX color value: ${customColor}`);
    }

    return `#${color}${opacity}`;
  }

  const decomposed = decomposeColor(customColor);
  const value = clamp(opacity as number);

  if (decomposed.type === 'rgb' || decomposed.type === 'hsl') {
    decomposed.type += 'a';
  }
  decomposed.values[3] = value;

  return recomposeColor(decomposed);
};

/**
 *  Darkens a color.
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *  @param coef - multiplier in the range 0 - 1
 *
 *  @returns A CSS color string. Hex input values are returned as rgb
 */
export const darken = (customColor: string, coef = 0.3): string => {
  const color = decomposeColor(customColor);
  const coefficient = clamp(coef);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color);
};

/**
 *  Lightens a color.
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *  @param coef - multiplier in the range 0 - 1
 *
 *  @returns A CSS color string. Hex input values are returned as rgb
 */
export const lighten = (customColor: string, coef = 0.2): string => {
  const color = decomposeColor(customColor);
  const coefficient = clamp(coef);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
};

/**
 *  Darken or lighten a color, depending on its luminance.
 *  Light colors are darkened, dark colors are lightened.
 *
 *  @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 *  @param [coefficient=0.15] - multiplier in the range 0 - 1
 *
 *  @returns A CSS color string. Hex input values are returned as rgb
 */
export const emphasize = (color: string, coefficient = 0.15): string => (getLuminance(color) > 0.5
  ? darken(color, coefficient)
  : lighten(color, coefficient));

/**
 *  Converts a color from CSS rgb format to CSS hex format.
 *
 *  @param color - RGB color, i.e. rgb(n, n, n)
 *
 *  @returns A CSS rgb color string, i.e. #nnnnnn
 */
export const rgbToHex = (color: string): string => {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const { values } = decomposeColor(color);
  return `#${values.map((n) => intToHex(n)).join('')}`;
};

export const padZero = (str: string, len = 2): string => {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};

/**
 *  Inverts input color and returns its opposite.
 *  Optionally could return only black/white colors, defaults to shich also could be specified.
 *
 *  @param color - Color: #nnn or #nnnnnn | rgb(a) | hsl(a)
 *  @param [bw=false] - Whether to use only black/white contrast colors
 *  @param [black] - Black default color
 *  @param [white] - White default color
 */
export const getContrastColor = (color: string, bw = false, black = '#000000', white = '#ffffff'): string => {
  const decomposed = decomposeColor(color);
  let rgb = decomposed.type.indexOf('hsl') !== -1 ? hslToRgb(decomposed) : recomposeColor(decomposed);

  rgb = rgb.replace('rgb(', '').replace(')', '');
  let r: string | number = parseInt(rgb.split(',')[0], 10);
  let g: string | number = parseInt(rgb.split(',')[1], 10);
  let b: string | number = parseInt(rgb.split(',')[2], 10);

  if (bw) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? black : white;
  }

  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);

  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
};
