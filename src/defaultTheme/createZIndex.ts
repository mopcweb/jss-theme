import { ThemeZIndex } from '../typings';

/**
 *  Creates Theme zIndex object
 *
 *  @param [zIndex] - Optional overrides or number for drawer options, which one should be the smallest
 */
export const createZIndex = (zIndex: Partial<ThemeZIndex> = {}): ThemeZIndex => {
  const config: Partial<ThemeZIndex> = typeof zIndex === 'number' ? { drawer: zIndex } : zIndex;

  return {
    drawer: config.drawer || 120,
    modal: config.modal || (config.drawer || 120) + 10,
    snackbar: config.snackbar || (config.drawer || 120) + 20,
    tooltip: config.tooltip || (config.drawer || 120) + 30,
  };
};
