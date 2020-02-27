import jss, { Classes, JssOptions, StyleSheetFactoryOptions, Jss } from 'jss';
import preset from 'jss-preset-default';

import { JssTheme, JssStyles, Replacer, DefaultTheme } from './typings';
import { Theme } from './theme';

let DefaultThemeInstance = new Theme();

/**
 *  Initates jss
 *
 *  @param [options] - Additional available for setuping JSS
 */
// export const initJss = (options?: Partial<JssOptions>): Jss => jss.setup({ ...preset(), ...options });
export const initJss = (options: Partial<JssOptions> | boolean = true): Jss => {
  if (typeof options === 'boolean' && options === true) return jss.setup(preset());
  if (typeof options === 'boolean' && options === false) return jss.setup();
  if (typeof options === 'object') return jss.setup(options);

  throw new Error('Please, provide correct argument: options for JSS inititalization or boolean value');
};

/**
 *  Makes provided theme default
 *
 *  @param theme - Constructed custom theme
 */
export const setDefaultTheme = <T extends Theme>(
  theme: T,
): void => { DefaultThemeInstance = theme; };

/**
 *  Creates initital theme. Could be used only once upon Theme instance.
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param [options] - Default options for creating new stylesheets
 *  @param [replacer] - Default replacer for theme styles
 *  @param [theme] - Constructed custom theme
 */
export const createTheme = <T extends JssTheme = Partial<DefaultTheme>>(
  themeConfig: T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[],
  theme: Theme = DefaultThemeInstance,
): T => theme.createTheme(themeConfig, options, replacer) as T;

// type ITest = { color: string }
// const Test = new Theme<ITest>();
// const test = createTheme(Test);
// const theme = test.getTheme().color;

/**
 *  Updates current theme with new options. Detaches from DOM all cached styles, which uses
 *  theme as provider for some values
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param [options] - Options for creating new stylesheet
 *  @param [theme] - Constructed custom theme
 */
export const updateTheme = <T extends JssTheme = Partial<DefaultTheme>>(
  themeConfig: Partial<T>, theme: Theme = DefaultThemeInstance,
): T => theme.updateTheme(themeConfig) as T;

/**
 *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [options] - Options for creating new stylesheet (if it is not cached)
 *  @param [theme] - Constructed custom theme
 */
export const useStyles = <T extends JssTheme = Partial<DefaultTheme>>(
  styles: JssStyles<T>, options?: StyleSheetFactoryOptions, theme: Theme = DefaultThemeInstance,
): Classes => theme.useStyles(styles, options);

/**
 *  Helper for providing correct type definitions while creating styles
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */
export const makeStyles = <T extends JssTheme = JssTheme>(styles: JssStyles<T>): JssStyles<T> => styles;

/**
 *  Gets current theme
 *
 *  @param [theme] - Constructed custom theme
 */
export const getTheme = <T extends JssTheme = Partial<DefaultTheme>>(
  theme: Theme = DefaultThemeInstance,
): T => theme.getTheme() as T;

/**
 *  Defines whether theme is equal to currently set one
 *
 *  @param themeConfig - DefaultTheme to check if it is equal to current
 *  @param [theme] - Constructed custom theme
 */
export const isEqualTheme = <T extends JssTheme = Partial<DefaultTheme>>(
  themeConfig: T, theme: Theme = DefaultThemeInstance,
): boolean => theme.isEqualTheme(themeConfig);

/**
 *  Checks if provided styles are in cache
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [theme] - Constructed custom theme
 */
export const hasStylesInCache = (
  styles: JssStyles, theme: Theme = DefaultThemeInstance,
): boolean => theme.hasStylesInCache(styles);

/**
 *  Updates default options for creating new stylesheets
 *
 *  @param options - Default options for creating new stylesheets
 *  @param [theme] - Constructed custom theme
 */
export const updateDefaultOptions = (
  options: StyleSheetFactoryOptions, theme: Theme = DefaultThemeInstance,
): void => theme.updateDefaultOptions(options);

/**
 *  Updates default replacer for theme styles
 *
 *  @see explanation in Theme.runReplacer()
 *
 *  @param replacer - Default replacer for theme styles
 */
export const updateDefaultReplacer = (
  replacer: Replacer | Replacer[], theme: Theme = DefaultThemeInstance,
): void => theme.updateDefaultReplacer(replacer);
