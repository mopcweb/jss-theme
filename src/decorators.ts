/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
/* eslint-disable max-classes-per-file */
import { Classes } from 'jss';

import { JssStyles, JssTheme, Constructor } from './typings';
import { isFunction } from './helpers';
import { Theme } from './theme';
import { useStyles, hasStylesInCache } from './functions';

/**
 *  Decorator for injecting styles into component.
 *  Gets styles and creates classes property which holds classNames for compiled styles
 *
 *  @note This one is specific for Angular 2+.
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */

// isFunction

// export const StyledComponent = <T extends JssTheme = JssTheme>(
//   styles: JssStyles<T>, theme?: Theme,
// ) => (Class: Constructor, ...args: any[]): Constructor => class extends Class {
//   public classes: Classes = {};
//
//   public ngOnInit(): void {
//     this.classes = useStyles(styles, theme);
//
//     if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this, args);
//   }
//
//   public ngDoCheck(): void {
//     if (!hasStylesInCache(styles, theme)) {
//       this.classes = useStyles(styles, theme);
//     }
//
//     if (Class.prototype.ngDoCheck) Class.prototype.ngDoCheck.apply(this, args);
//   }
// };

export const StyledComponent = <T extends JssTheme = JssTheme>(
  styles: JssStyles<T>, theme?: Theme,
) => (Class: Constructor, ...args: any[]): Constructor => (isFunction(styles)
  ? class extends Class {
    public classes: Classes = {};

    public ngOnInit(): void {
      this.classes = useStyles(styles, theme);

      if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this, args);
    }

    public ngDoCheck(): void {
      if (!hasStylesInCache(styles, theme)) {
        this.classes = useStyles(styles, theme);
      }

      if (Class.prototype.ngDoCheck) Class.prototype.ngDoCheck.apply(this, args);
    }
  }
  : class extends Class {
    public classes: Classes = {};

    public ngOnInit(): void {
      this.classes = useStyles(styles, theme);

      if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this, args);
    }
  });
