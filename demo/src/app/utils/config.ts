import { IAngularRoute } from 'angular-breadcrumbs-light';

export const BASE_URL = '/jss-theme';

export const ROUTES: IAngularRoute[] = [
  { link: '/', title: 'Home', icon: 'home', iconClass: 'material-icons' },
  { link: '/docs', title: 'Docs', icon: 'settings', iconClass: 'material-icons' },
  { link: '/create-theme', title: 'Theme overview', icon: 'color_lens', iconClass: 'material-icons' },
];

export const LS_KEYS = {
  theme: 'theme',
};
