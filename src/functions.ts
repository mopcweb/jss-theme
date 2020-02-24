import { Classes } from 'jss';

import { JssTheme, JssStyles } from './typings';
import { Theme } from './theme';

/**
 *  Creates initital theme. Could be used only once.
 *
 *  @param overrides - Theme options overrides
 */
export const createTheme = (overrides?: Partial<JssTheme>): void => {
  Theme.createTheme(overrides);
};

/**
 *  Updates current theme wtih new options. Detaches from DOM all cached styles, which uses
 *  theme as provider for some values
 *
 *  @param overrides - Theme options overrides
 *  @param styles - If this method is called in component it is necessary to provide styles
 *  for compilation. This will return classes for component usage (aka useStyles method)
 */
export const updateTheme = (overrides: Partial<JssTheme>, styles: JssStyles): Classes => Theme.updateTheme(
  overrides, styles,
);

/**
 *  Gets styles, compiles them and attaches to DOM or, if they are already in cache returns cached classes
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */
export const useStyles = (styles: JssStyles): Classes => Theme.useStyles(styles);

/**
 *  Helper for providing correct type definitions while creating styles
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */
export const makeStyles = (styles: JssStyles): JssStyles => styles;
