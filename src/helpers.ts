import { Constructor } from './typings';

/**
 *  Creates a singleton for provided class
 *
 *  @param constructor - Basic class for which to create a singleton
 *  @param [...args] - Arguments for Singleton constructor
 */
export const singleton = <S extends Constructor>(
  constructor: S, ...args: ConstructorParameters<S>
): InstanceType<S> => {
  class Singleton extends constructor {
    private static _instance: InstanceType<S>;

    public static get instance(): InstanceType<S> {
      if (!this._instance) {
        this._instance = new Singleton(...args);
      }

      return this._instance;
    }

    /* eslint-disable-next-line */
    private constructor(...xargs: any[]) { super(...xargs); }
  }

  return Singleton.instance;
};

/**
 *  Check if argument is function
 *
 *  @param arg - Argument to check
 */
/* eslint-disable-next-line */
export const isFunction = (arg: any): boolean => arg && {}.toString.call(arg) === '[object Function]';
