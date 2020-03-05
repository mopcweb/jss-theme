import jss, { Classes, JssOptions, StyleSheetFactoryOptions, Jss } from 'jss';
import preset from 'jss-preset-default';

import { JssTheme, JssStyles, Replacer, DefaultTheme, DeepPartial, Named } from './typings';
import { Theme } from './theme';

// let DefaultThemeInstance = new Theme();
let DefaultThemeInstance: Theme<JssTheme>;

/**
 *  Initates jss
 *
 *  @param [options] - Additional available for setuping JSS
 */
export const initJss = (options: Partial<JssOptions> | boolean = true): Jss => {
  if (typeof options === 'boolean' && options === true) return jss.setup(preset());
  if (typeof options === 'boolean' && options === false) return jss.setup();
  if (typeof options === 'object') return jss.setup(options);

  throw new Error('Please, provide correct argument: options for JSS inititalization or boolean value');
};

export const createDefaultTheme = <T extends JssTheme = DefaultTheme>(
  themeConfig?: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[],
): Theme<T> => {
  DefaultThemeInstance = new Theme(themeConfig, options, replacer);
  return DefaultThemeInstance;
};

/**
 *  Makes provided Theme instance default
 *
 *  @param theme - Constructed custom Theme
 */
export const setDefaultTheme = <T extends Theme>(theme: T): void => { DefaultThemeInstance = theme; };

/**
 *  Gets default Theme instance
 */
export const getDefaultTheme = <T extends JssTheme = DefaultTheme>(): Theme<T> => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  /* eslint-disable-next-line */
  return DefaultThemeInstance as any;
};


/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *  Creates initital theme. Could be used only once upon Theme instance.
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param [options] - Default options for creating new stylesheets
 *  @param [replacer] - Default replacer for theme styles
 *  @param [theme] - Constructed custom theme
 */
export const rewriteTheme = <T extends JssTheme = DefaultTheme>(
  themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[],
  theme: Theme<T> = DefaultThemeInstance as any,
): T => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.rewriteTheme(themeConfig, options, replacer);
};

/**
 *  Updates current theme with new options. Detaches from DOM all cached styles, which uses
 *  theme as provider for some values
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param [options] - Default options for creating new stylesheets
 *  @param [replacer] - Default replacer for theme styles
 *  @param [theme] - Constructed custom theme
 */
export const updateTheme = <T extends JssTheme = DeepPartial<DefaultTheme>>(
  themeConfig: DeepPartial<T>, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[],
  theme: Theme<T> = DefaultThemeInstance as any,
): T => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.updateTheme(themeConfig, options, replacer);
};

/**
 *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [options] - Options for creating new stylesheet (if it is not cached)
 *  @param [theme] - Constructed custom theme
 */
export const useStyles = <T extends JssTheme = DefaultTheme>(
  styles: JssStyles, options?: StyleSheetFactoryOptions, theme: Theme<T> = DefaultThemeInstance as any,
): Named<Classes> => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.useStyles(styles, options);
};

/**
 *  Helper for providing correct type definitions while creating styles
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */
export const makeStyles = <T extends JssTheme = DefaultTheme>(styles: JssStyles<T>): JssStyles<T> => styles;

/**
 *  Gets current theme
 *
 *  @param [theme] - Constructed custom theme
 */
export const getTheme = <T extends JssTheme = DefaultTheme>(
  theme: Theme<T> = DefaultThemeInstance as any,
): T => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.getTheme();
};

/**
 *  Defines whether theme is equal to currently set one
 *
 *  @param themeConfig - DefaultTheme to check if it is equal to current
 *  @param [theme] - Constructed custom theme
 */
export const isEqualTheme = <T extends JssTheme = DefaultTheme>(
  themeConfig: T, theme: Theme<T> = DefaultThemeInstance as any,
): boolean => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.isEqualTheme(themeConfig);
};

/**
 *  Checks if provided styles are in cache
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [theme] - Constructed custom theme
 */
export const hasStylesInCache = (
  styles: JssStyles, theme: Theme = DefaultThemeInstance as any,
): boolean => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.hasStylesInCache(styles);
};

/**
 *  Updates default options for creating new stylesheets
 *
 *  @param options - Default options for creating new stylesheets
 *  @param [theme] - Constructed custom theme
 */
export const updateDefaultOptions = (
  options: StyleSheetFactoryOptions, theme: Theme = DefaultThemeInstance as any,
): void => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.updateDefaultOptions(options);
};

/**
 *  Updates default replacer for theme styles
 *
 *  @see explanation in Theme.runReplacer()
 *
 *  @param replacer - Default replacer for theme styles
 */
export const updateDefaultReplacer = (
  replacer: Replacer | Replacer[], theme: Theme = DefaultThemeInstance as any,
): void => {
  if (!DefaultThemeInstance) {
    throw Error('To make actions over defaultTheme first call createDefaultTheme() function, please');
  }

  return theme.updateDefaultReplacer(replacer);
};

/* eslint-enable @typescript-eslint/no-explicit-any */
