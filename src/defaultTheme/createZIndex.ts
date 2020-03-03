import { ThemeZIndex } from '../typings';

/**
 *  Create Theme zIndex object
 */
export const createZIndex = (basic = 120): ThemeZIndex => ({
  drawer: basic,
  modal: basic + 10,
  snackbar: basic + 20,
  tooltip: basic + 30,
});
