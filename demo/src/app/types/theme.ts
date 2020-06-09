import { JssTheme } from 'jss-theme';
import { JssThemeDefault } from 'jss-theme-default';

/* eslint-disable @typescript-eslint/interface-name-prefix */
declare module 'jss-theme-default' {
  export interface JssThemeDefault {
    defaults: {
      headerHeight: number;
      breadcrumbsHeight: number;
      footerHeight: number;
      navWidth: number;
    };
  }
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
declare module 'jss-theme' { interface JssTheme extends JssThemeDefault {} }

/** Interface for theme option config */
export interface IThemeConfig {
  title: string;
  theme: JssTheme;
}
