/* eslint-disable max-classes-per-file */
import { initJss, updateTheme, createDefaultTheme, JssTheme, ThemeProvider, createJssStyledComponent } from 'jss-theme';
import { createDefaultJssTheme, createPalette } from 'jss-theme-default';

import { IThemeConfig } from '@app/types';

initJss();

/** Default App Theme instance */
const Theme = createDefaultTheme();

/** Default theme config */
export const defaultTheme: JssTheme = {
  ...createDefaultJssTheme({ }, Theme),

  defaults: {
    headerHeight: 60,
    breadcrumbsHeight: 40,
    footerHeight: 80,
    navWidth: 250,
  },
};

export const darkPalette = createPalette({
  type: 'dark',
  background: {
    default: '#1c1c1c',
    paper: '#333333',
  },
  text: {
    disabled: 'rgba(255, 255, 255, 0.38)',
    hint: 'rgba(255, 255, 255, 0.38)',
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.54)',
  },
});

/** Default themes options */
export const themes: IThemeConfig[] = [
  {
    title: 'Light',
    theme: defaultTheme,
  },
  {
    title: 'Dark',
    theme: { ...defaultTheme, palette: darkPalette },
  },
  {
    title: 'Custom',
    theme: { ...defaultTheme },
  },
];

updateTheme(defaultTheme);

export const themeProvider = new ThemeProvider(Theme);

export const NgStyledComponent = createJssStyledComponent(themeProvider);
