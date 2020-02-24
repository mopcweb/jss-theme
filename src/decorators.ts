import { Classes } from 'jss';

import { JssStyles, Constructor } from './typings';
import { useStyles } from './functions';

/**
 *  Decorator for injecting styles into component.
 *  Gets styles and creates classes property which holds classNames for compiled styles
 *
 *  @note This one is specific for Angular 2+.
 *
 *  @param styles - Styles to compile. Could be a function which uses theme
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const StyledComponent = (styles: JssStyles) => (
  Class: Constructor, ...args: any[]
): Constructor => class extends Class {
  public classes: Classes = {};

  public ngOnInit(): void {
    this.classes = useStyles(styles);

    if (Class.prototype.ngOnInit) Class.prototype.ngOnInit.apply(this, args);
  }
};
