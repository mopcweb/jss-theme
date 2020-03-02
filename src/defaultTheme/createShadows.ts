import { ThemeShadowTuple, ThemeShadowObject } from '../typings';

/**
 *  Creates shadow(s) using provided list of config values
 *
 *  @param shadows - List of shadows config in form of objects or tuples
 */
export const createShadows = (
  ...shadows: Array<ThemeShadowTuple | ThemeShadowObject>
): string => shadows.map((item) => {
  const mapped: ThemeShadowTuple = Array.isArray(item)
    ? item
    : [item.x, item.y, item.blur, item.spread, item.color, item.inset];

  const [x = 0, y = 0, blur = 0, spread = 0, color = '#000000', isInset] = mapped;

  const inset = isInset ? 'inset ' : '';

  return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
}).join(',');

/* eslint-disable-next-line */
// Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss
const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

/**
 *  Creates material design shadow for provided offset values
 *
 *  @param px - list of offsets
 */
const createMaterialShadows = (...px: number[]): string => createShadows(
  [px[0], px[1], px[2], px[3], `rgba(0,0,0,${shadowKeyUmbraOpacity})`],
  [px[4], px[5], px[6], px[7], `rgba(0,0,0,${shadowKeyPenumbraOpacity})`],
  [px[8], px[9], px[10], px[11], `rgba(0,0,0,${shadowAmbientShadowOpacity})`],
);

/**
 *  Default shadows
 */
export const shadows = [
  'none',
  createMaterialShadows(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  createMaterialShadows(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  createMaterialShadows(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  createMaterialShadows(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createMaterialShadows(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createMaterialShadows(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createMaterialShadows(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createMaterialShadows(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createMaterialShadows(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createMaterialShadows(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createMaterialShadows(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createMaterialShadows(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createMaterialShadows(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createMaterialShadows(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createMaterialShadows(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createMaterialShadows(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createMaterialShadows(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createMaterialShadows(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createMaterialShadows(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createMaterialShadows(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createMaterialShadows(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createMaterialShadows(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createMaterialShadows(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createMaterialShadows(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
];
