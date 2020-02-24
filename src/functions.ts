import jss, { Classes, JssOptions } from 'jss';
import preset from 'jss-preset-default';

import { JssTheme, JssStyles } from './typings';
import { Theme } from './theme';

let DefaultTheme = new Theme();

/**
 *  Initates jss
 */
export const initJss = (options?: JssOptions): void => { jss.setup({ ...preset(), ...options }); };

/**
 *  Makes specific theme as default
 *
 *  @param theme - Constructed custom theme
 */
export const setDefaultTheme = <T extends JssTheme = JssTheme>(
  theme: Theme<T> = DefaultTheme,
): void => { DefaultTheme = theme; };

/**
 *  Creates initital theme. Could be used only once.
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param theme - Constructed custom theme
 */
export const createTheme = <T extends JssTheme = JssTheme>(
  themeConfig: T, theme: Theme<T> = DefaultTheme,
): T => theme.createTheme(themeConfig);

/**
 *  Updates current theme wtih new options. Detaches from DOM all cached styles, which uses
 *  theme as provider for some values
 *
 *  @param themeConfig - DefaultTheme options overrides
 *  @param styles - If this method is called in component it is necessary to provide styles
 *  for compilation. This will return classes for component usage (aka useStyles method)
 *  @param theme - Constructed custom theme
 */
export const updateTheme = <T extends JssTheme = JssTheme>(
  themeConfig: Partial<T>, styles: JssStyles<T>, theme: Theme = DefaultTheme,
): Classes => theme.updateTheme(themeConfig, styles);

/**
 *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param theme - Constructed custom theme
 */
export const useStyles = <T extends JssTheme = JssTheme>(
  styles: JssStyles<T>, theme: Theme = DefaultTheme,
): Classes => theme.useStyles(styles);

/**
 *  Helper for providing correct type definitions while creating styles
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param theme - Constructed custom theme
 */
export const makeStyles = <T extends JssTheme = JssTheme>(styles: JssStyles<T>): JssStyles<T> => styles;

/**
 *  Gets current theme
 *
 *  @param theme - Constructed custom theme
 */
export const getTheme = <T extends JssTheme = JssTheme>(
  theme: Theme<T> = DefaultTheme,
): T => theme.getTheme();

/**
 *  Defines whether theme is equal to currently set one
 *
 *  @param themeConfig - DefaultTheme to check if it is equal to current
 *  @param theme - Constructed custom theme
 */
export const isEqualTheme = <T extends JssTheme = JssTheme>(
  themeConfig: T, theme: Theme<T> = DefaultTheme,
): boolean => theme.isEqualTheme(themeConfig);

/**
 *  Defines whether classes are equal to that one, attached to DOM
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param theme - Constructed custom theme
 */
export const hasStylesInCache = <T extends JssTheme = JssTheme>(
  styles: JssStyles<T>, theme: Theme = DefaultTheme,
): boolean => theme.hasStylesInCache(styles);
