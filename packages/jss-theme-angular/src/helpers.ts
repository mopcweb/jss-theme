/**
 *  Check if argument is function
 *
 *  @param arg - Argument to check
 */
/* eslint-disable-next-line */
export const isFunction = (arg: any): boolean => arg && {}.toString.call(arg) === '[object Function]';

/**
 *  Throws error inside decorator w/ provided arguments
 *
 *  @param decorator - Decorator title
 *  @param method - Method which caused error
 *  @param className - Class (component) name in which error was thrown
 */
export const throwDecoratorError = (decorator: string, method: string, className: string): Error => {
  throw Error(
    `In order to correctly use ${decorator} decorator w/ angular --aot compilator `
    + `it is necessary to implement ${method} in ${className}`,
  );
};
