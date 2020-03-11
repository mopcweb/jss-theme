/* eslint-disable max-classes-per-file */
import { StyleSheetFactoryOptions } from 'jss';

import {
  Theme, JssStyles, JssTheme, Constructor, Classes, useStyles, isEqualTheme, getTheme,
} from 'jss-theme';
import { isFunction, throwDecoratorError } from './helpers';

/**
 *  Decorator for injecting styles into component.
 *  Gets styles and creates classes property which holds classNames for compiled styles
 *
 *  @note This one is specific for Angular 2+.
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 *  @param [options] - Options for creating new stylesheet
 *  @param [theme] - Constructed custom theme
 */
export function StyledComponent<T extends JssTheme = JssTheme>(
  // export function NgStyled<T extends JssTheme = JssTheme>(
  styles: JssStyles<T>, options?: StyleSheetFactoryOptions, theme?: Theme<T>,
) {
  return (Class: Constructor): Constructor => {
    if (!Class.prototype.ngOnInit || !isFunction(Class.prototype.ngOnInit)) {
      throwDecoratorError('@StyledComponent', 'ngOnInit', Class.name);
    }

    if (isFunction(styles) && (!Class.prototype.ngDoCheck || !isFunction(Class.prototype.ngDoCheck))) {
      throwDecoratorError('@StyledComponent', 'ngDoCheck', Class.name);
    }

    return (isFunction(styles)
      ? class extends Class {
        public classes: Classes = {};

        private _cachedTheme: T;

        public ngOnInit(): void {
          this._cachedTheme = getTheme(theme);
          this.classes = useStyles(styles, options, theme);

          if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this);
        }

        public ngDoCheck(): void {
          if (!isEqualTheme(this._cachedTheme, theme)) {
            this._cachedTheme = getTheme(theme);
            this.classes = useStyles(styles, options, theme);
          }

          if (Class.prototype.ngDoCheck) Class.prototype.ngDoCheck.apply(this);
        }
      }
      : class extends Class {
        public classes: Classes = {};

        public ngOnInit(): void {
          this.classes = useStyles(styles, options, theme);

          if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this);
        }
      });
  };
}

/* eslint-disable no-param-reassign */
/* eslint-disable  */
// export function StyledComponent<T extends JssTheme = JssTheme>(
//   styles: JssStyles<T>, options?: StyleSheetFactoryOptions, theme?: Theme<T>,
// ) {
//   return function (Class: Constructor) {
//     const { ngOnInit }: { ngOnInit: Function } = Class.prototype;
//
//     (Class.prototype.classes as JssClasses) = { };
//     if (isFunction(styles)) (Class.prototype._cachedTheme as T) = undefined;
//
//     Class.prototype.ngOnInit = function (...args: any[]): void {
//       if (isFunction(styles)) this._cachedTheme = getTheme(theme);
//       this.classes = useStyles(styles, options, theme);
//
//       ngOnInit && ngOnInit.apply(this, args);
//     };
//
//     if (isFunction(styles)) {
//       const { ngDoCheck }: { ngDoCheck: Function } = Class.prototype;
//
//       Class.prototype.ngDoCheck = function (...args: any[]): void {
//         if (!isEqualTheme(this._cachedTheme, theme)) {
//           this._cachedTheme = getTheme(theme);
//           this.classes = useStyles(styles, options, theme);
//         }
//
//         ngDoCheck && ngDoCheck.apply(this, args);
//       };
//     }
//   };
// }
