/* eslint-disable @typescript-eslint/interface-name-prefix */
import { StyleSheet, Styles } from 'jss';

export { Classes, Styles } from 'jss';

/**
 *  Class constructior type
 */
/* eslint-disable-next-line */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  Jss theme object type
 *  TODO: research which options to include. For this purpose to look through MUI theme interface
 */
export interface JssTheme {
  spacing?: number;
}

/**
 *  Interface for Jss theme object
 */
export type JssStyles = ((theme: JssTheme) => Styles) | Styles;

/**
 *  Interface for Cached styles
 */
export interface JssCache {
  /**
   *  Whether styles are static. If static - they won't be rerendered on theme update
   */
  isStatic: boolean;

  /**
   *  Compiled and attached to DOM styles
   */
  sheet: StyleSheet;
}
