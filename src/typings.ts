/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Styles } from 'jss';

export { Classes, Styles } from 'jss';

/**
 *  Class constructior type
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 *  Jss theme object type.
 *
 *  This one could really be of any type: Array, Object, primitive ...
 *  Just when creating Theme instance be sure to provide correct typing for avoiding bugs in your application.
 */
export type JssTheme = any;

/**
 *  Interface for Jss theme object
 */
export type JssStyles<T extends JssTheme = JssTheme> = ((theme: T) => Styles) | Styles;

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
