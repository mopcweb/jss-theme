import { ThemeZIndex } from '../typings';

/**
 *  Creates Theme zIndex object
 *
 *  @param zIndex - Optional overrides
 */
export const createZIndex = (zIndex: Partial<ThemeZIndex> = {}): ThemeZIndex => ({
  drawer: zIndex.drawer || 120,
  modal: zIndex.modal || (zIndex.drawer || 120) + 10,
  snackbar: zIndex.snackbar || (zIndex.drawer || 120) + 20,
  tooltip: zIndex.tooltip || (zIndex.drawer || 120) + 30,
});
