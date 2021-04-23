/* eslint-disable max-classes-per-file */
import {
  initJss, updateTheme, createDefaultTheme, JssTheme, JssClasses,
  JssStyles, isEqualTheme, useStyles, getTheme, Theme as ThemeConstructor,
  ThemeProvider,
} from 'jss-theme';
import { createDefaultJssTheme, createPalette } from 'jss-theme-default';
import { StyleSheetFactoryOptions } from 'jss';

import { IThemeConfig } from '@app/types';

// import { ThemeProvider } from './ThemeProvider';

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
  // {
  //   title: 'Green',
  //   theme: { ...defaultTheme, palette: createPalette({ primary: { main: '#16a94a' } }) },
  // },
  {
    title: 'Custom',
    theme: { ...defaultTheme },
  },
];

updateTheme(defaultTheme);

export const themeProvider = new ThemeProvider(Theme);

// export class NgStyledComponent {
//   public classes: JssClasses;

//   constructor(styles: JssStyles) {
//     this.classes = themeProvider.useStyles(this, styles);
//   }
// }

type Constructor<T = any> = new (styles: JssStyles) => T;

export function createNgStyledClass(provider: ThemeProvider): Constructor {
  return class {
    public classes: JssClasses;

    constructor(styles: JssStyles) {
      this.classes = provider.useStyles(this, styles);
    }
  };
}

export const NgStyledComponent = createNgStyledClass(themeProvider);

export function RegisterComponent<T extends JssTheme = JssTheme>(
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
