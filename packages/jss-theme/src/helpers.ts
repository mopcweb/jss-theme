/* eslint-disable @typescript-eslint/no-explicit-any */
import { Replacer } from './typings';

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
