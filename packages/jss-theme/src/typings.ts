/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Styles, StyleSheetFactoryOptions, Classes } from 'jss';

/** Classes object, which is returned after styles compilation and attaching to DOM */
export type JssClasses = Classes;

/** Type for values which are of types of provided tuple */
export type OneOf<T extends readonly unknown[]> = T extends ReadonlyArray<infer OneOf> ? OneOf : never;

/** Type for deep partial */
// export type DeepPartial<T> = DeepPartial<T>;

export type Primitive =
| null
| undefined
| string
| number
| boolean
| symbol
| bigint;

/**
 *  PartialDeep copy from `type-fest` package due to problems w/ build and necessaity to work w/ older versions of TS.
 *
 *  @see https://www.npmjs.com/package/type-fest
 */
export type DeepPartial<T> = T extends Primitive
  ? Partial<T>
  : T extends Map<infer KeyType, infer ValueType>
    ? PartialMapDeep<KeyType, ValueType>
    : T extends Set<infer ItemType>
      ? PartialSetDeep<ItemType>
      : T extends ReadonlyMap<infer KeyType, infer ValueType>
        ? PartialReadonlyMapDeep<KeyType, ValueType>
        : T extends ReadonlySet<infer ItemType>
          ? PartialReadonlySetDeep<ItemType>
          : T extends ((...args: any[]) => unknown)
            ? T | undefined
            : T extends object
              ? PartialObjectDeep<T>
              : unknown;

/**
Same as `DeepPartial`, but accepts only `Map`s and  as inputs. Internal helper for `DeepPartial`.
*/
export interface PartialMapDeep<KeyType, ValueType> extends Map<DeepPartial<KeyType>, DeepPartial<ValueType>> {}

/**
Same as `DeepPartial`, but accepts only `Set`s as inputs. Internal helper for `DeepPartial`.
*/
export interface PartialSetDeep<T> extends Set<DeepPartial<T>> {}

/**
Same as `DeepPartial`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `DeepPartial`.
*/
export interface PartialReadonlyMapDeep<KeyType, ValueType> extends ReadonlyMap<DeepPartial<KeyType>, DeepPartial<ValueType>> {}

/**
Same as `DeepPartial`, but accepts only `ReadonlySet`s as inputs. Internal helper for `DeepPartial`.
*/
export interface PartialReadonlySetDeep<T> extends ReadonlySet<DeepPartial<T>> {}

/**
Same as `DeepPartial`, but accepts only `object`s as inputs. Internal helper for `DeepPartial`.
*/
export type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: DeepPartial<ObjectType[KeyType]>
};

export type GenericObject<T = any> = { [x: string]: T };

/** Class constructior type */
export type Constructor<T = any> = new (...args: any[]) => T;

/** Inteface for replacer helper */
export interface Replacer {
  pattern: RegExp | string;
  value: string;
}

/**
 *  Interface for Getting Named key:value pairs object from provided type
 *  Mock for feature of returning named classes from useStyles
 */
export type Named<T> = { [P in keyof T]: string };

/**
 *  Jss theme object type.
 *
 *  This one could really be of any type: Array, Object, primitive ...
 *  Just when creating Theme instance be sure to provide correct typing for avoiding bugs in your application.
 */
// export type JssTheme = any & { updatedHash?: number };
export interface JssTheme {
  [x: string]: any;
  [x: number]: any;
  updatedHash?: number;
}
// export type JssTheme = Record<any, any> & { updatedHash?: number };

/** Interface for Jss theme object */
export type JssStyles<T extends JssTheme = JssTheme> = ((theme: T) => Styles) | Styles;

/** Interface for Cached styles */
export interface JssCache {
  /** Whether styles are static. If static - they won't be rerendered on theme update */
  isStatic: boolean;

  /** Compiled and attached to DOM styles */
  sheet: StyleSheet;
}

/** Interface for Theme constructor */
export interface ThemeConstructor<T extends JssTheme = JssTheme> {
  getTheme(): T;
  updateDefaultOptions(options: StyleSheetFactoryOptions): void;
  updateDefaultReplacer(replacer: Replacer | Replacer[]): void;
  isEqualTheme(theme: T): boolean;
  hasStylesInCache(styles: JssStyles<T>): boolean;
  rewriteTheme(themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T;
  updateTheme(themeConfig: DeepPartial<T>, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T;
  useStyles(styles: JssStyles<T>, options?: StyleSheetFactoryOptions): JssClasses;
  makeStyles(styles: JssStyles<T>): JssStyles<T>;
}
