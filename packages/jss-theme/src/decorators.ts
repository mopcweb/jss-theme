/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheetFactoryOptions } from 'jss';

import { JssStyles, JssClasses, JssTheme } from './typings';
import { ThemeProvider } from './themeProvider';
import { Theme as ThemeConstructor } from './theme';
import { isEqualTheme, getTheme, useStyles } from './functions';

/**
 *  Property decorator, which defines `getter` for property to retrieve classes composed for provided styles.
 *
 *  @example
 *  ```ts
 *  class Component {
 *    @RegisterComponent(styles)
 *    public classes: JssClasses;
 *  }
 *  ```
 *
 *  @param styles - Styles object or function to create css stylesheet from.
 *  @param [options] - Stylesheet creation options.
 *  @param [theme] - Theme instance to be used for styles creation.
 *
 *  @returns Decorated proprty w/ getter to update classes depending on current theme.
 */
export function UseStyles<T extends JssTheme = JssTheme>(
  styles: JssStyles, options?: StyleSheetFactoryOptions, theme?: ThemeConstructor<T>,
): PropertyDecorator {
  return (): TypedPropertyDescriptor<JssClasses> => {
    let _cache: T;
    let _value: JssClasses = { };
    const get = (): JssClasses => {
      if (!_cache || !isEqualTheme(_cache, theme)) {
        _cache = getTheme(theme);
        _value = useStyles(styles, options, theme);
      }
      return _value;
    };
    return { get };
  };
}

/**
 *  Creates JssStyledComponent class constructor with `classes` property to be extend later.
 *
 *  @example
 *  ```ts
 *  import { ThemeProvider, Theme } from 'jss-theme';
 *
 *  const themeProvider = new ThemeProvider(new Theme());
 *  const JssStyledComponent = createJssStyledComponent(themeProvider);
 *
 *  // ... later in app
 *
 *  class Component extends JssStyledComponent {
 *    constructor() {
 *      super(styles);
 *      console.log(classes);
 *    }
 *  }
 *  ```
 *
 *  @param themeProvider - ThemeProvider instance.
 *  @param [options] - Stylesheet creation options.
 *
 *  @returns Class with only 1 `classes` property to be used for storing actual classes for theme styles.
 */
export function createJssStyledComponent(
  themeProvider: ThemeProvider, options?: StyleSheetFactoryOptions,
): (new (styles: JssStyles) => any) {
  return class JssStyledComponent {
    public classes: JssClasses;

    constructor(styles: JssStyles) {
      this.classes = themeProvider.useStyles(this, styles, { options });
    }
  };
}

// Antiher version
// return (target: unknown, propertyKey: string) => {
// const registerComponent = this.registerComponent.bind(this);
// let value: JssClasses = { };
// function get(this: IRegisteredComponent) { value = registerComponent(this, styles); return value; }
// function set(this: IRegisteredComponent, val: JssClasses) { value = val; }
// Object.defineProperty(target, propertyKey, { get, set });
// const get = () => { console.log('1 >>>', 1); return useStyles(styles); };
// }
