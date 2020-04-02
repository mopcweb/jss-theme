import { OneOf, JssThemeBreakpointsKeys, JssThemeBreakpointsValues, JssThemeBreakpoints } from './typings';

/**
 *  Composer for breakpoints
 *
 *  @param [customValues] - Custom values for breakpoints
 */
export const createBreakpoints = (customValues: Partial<JssThemeBreakpointsValues> = { }): JssThemeBreakpoints => {
  const keys: JssThemeBreakpointsKeys = ['xs', 'sm', 'md', 'lg', 'xl'];
  // const mappedValues = customValues.map((item) => (item === null ? undefined : item));
  // const [xs = 0, sm = 600, md = 960, lg = 1280, xl = 1920] = mappedValues;
  const { xs = 0, sm = 600, md = 960, lg = 1280, xl = 1920 } = customValues;
  const values: Record<OneOf<JssThemeBreakpointsKeys> | string, number> = { xs, sm, md, lg, xl };

  const between = (
    start: OneOf<JssThemeBreakpointsKeys> | number, end: OneOf<JssThemeBreakpointsKeys> | number,
  ): string => {
    const startValue = typeof start === 'number' ? start : values[start];
    const endValue = typeof end === 'number' ? end : values[end];

    // if (startValue > endValue) [startValue, endValue] = [endValue, startValue];
    if (startValue > endValue) {
      throw Error(`${start} is less than ${end}`);
    }

    return `@media screen and (min-width: ${startValue + 1}px) and (max-width: ${endValue}px)`;
  };

  const up = (
    key: OneOf<JssThemeBreakpointsKeys> | number, to?: OneOf<JssThemeBreakpointsKeys> | number,
  ): string => {
    const value = typeof key === 'number' ? key : values[key];

    if (!to) return `@media screen and (min-width: ${value + 1}px)`;

    return between(key, to);
  };

  const down = (
    key: OneOf<JssThemeBreakpointsKeys> | number, to?: OneOf<JssThemeBreakpointsKeys> | number,
  ): string => {
    const value = typeof key === 'number' ? key : values[key];
    if (!to) return `@media screen and (max-width: ${value}px)`;

    return between(to, key);
  };

  const only = (key: OneOf<JssThemeBreakpointsKeys>): string => {
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

  const width = (key: OneOf<JssThemeBreakpointsKeys>): number => {
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
