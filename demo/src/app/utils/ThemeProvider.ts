import { Observable, BehaviorSubject } from 'rxjs';

import { JssTheme, JssStyles, JssClasses, Theme as ThemeConstructor, Replacer } from 'jss-theme';
import { cloneDeep } from 'lodash';

import { StyleSheetFactoryOptions } from 'jss';

export class ThemeProvider<T extends JssTheme = JssTheme> {
  private _theme: ThemeConstructor<T>;
  private _current$ = new BehaviorSubject<T>({ } as T);
  private _components = new Map<IRegisteredComponent, IRegisteredComponentOptions>();
  private _property = 'classes';

  constructor(themeOrThemeConfig?: T | ThemeConstructor<T>, { options, replacer, property }: IThemeProviderOptions = { }) {
    this._theme = themeOrThemeConfig instanceof ThemeConstructor
      ? themeOrThemeConfig
      : new ThemeConstructor(themeOrThemeConfig, options, replacer);
    if (property) this._property = property;

    this.updateTheme(this._theme.getTheme());
    this._subscribeThemeUpdates();
  }

  /** Observable for theme updates. */
  public get state$(): Observable<JssTheme> {
    return this._current$.asObservable();
  }

  /** Current theme value. */
  public get value(): T {
    return cloneDeep(this._current$.getValue());
  }

  /** Jss Theme instance associated w/ this ThemeProvider. */
  public get theme(): ThemeConstructor<T> {
    return this._theme;
  }

  /**
   *  Helper for providing correct type definitions while creating styles
   *
   *  @param styles - Styles to compile. Could be a function which uses theme
   */
  public makeStyles(styles: JssStyles<T>): JssStyles<T> {
    return this._theme.makeStyles(styles);
  }

  /**
   *  Updates current theme with new options. Detaches from DOM all cached styles, which uses
   *  theme as provider for some values
   *
   *  @param themeConfig - Theme options overrides
   *  @param [options] - Default options for creating new stylesheets
   *  @param [replacer] - Default replacer for theme styles
   */
  public updateTheme(themeConfig: PartialDeep<T> | T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T {
    const result = this._theme.updateTheme(themeConfig, options, replacer);
    this._current$.next(result);
    return result;
  }

  /**
   *  Registers current component to receive classes updates on theme changes.
   *
   *  @param component - Component (class) to theme updates to.
   *  @param styles - Jss styles.
   *  @param [config] - Optional options.
   *  @param [config.property] - Property in `component` into which to insert updated classes on theme updates.
   *  @param [config.options] - Options for creating new stylesheets
   */
  public useStyles<C = IRegisteredComponent>(component: C, styles: JssStyles, config: IUseStylesComponentOptions = { }): JssClasses {
    const { property = this._property, options } = config;
    this._components.set(component, { styles, property, options });
    return this._theme.useStyles(styles);
  }

  private _subscribeThemeUpdates(): void {
    this.state$.subscribe(() => {
      this._components.forEach(({ styles, property, options }, component) => {
        // eslint-disable-next-line no-param-reassign
        component[property] = this._theme.useStyles(styles, options);
        const cdr = Object.values(component).find(this._isCdr);
        this._triggerAngularChangeDetection(component);
      });
    });
  }

  private _triggerAngularChangeDetection(component: IRegisteredComponent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cdr: any = Object.values(component).find(this._isCdr);
    if (cdr && cdr.markForCheck && typeof cdr.markForCheck === 'function') cdr.markForCheck();
  }

  private _isCdr(item: GenericObject): boolean {
    return item
      && Object.hasOwnProperty.call(item, '_cdRefInjectingView')
      && Object.hasOwnProperty.call(item, '_appRef')
      && Object.hasOwnProperty.call(item, '_attachedToViewContainer')
      && Object.hasOwnProperty.call(item, '_lView');
  }
}

interface IUseStylesComponentOptions { property?: string; options?: StyleSheetFactoryOptions }
type IRegisteredComponent = GenericObject;
interface IRegisteredComponentOptions extends IUseStylesComponentOptions { styles: JssStyles }
interface IThemeProviderOptions extends IUseStylesComponentOptions { replacer?: Replacer | Replacer[] }


/* eslint-disable  */
export type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;

/**
Create a type from another type with all keys and nested keys set to optional.

Use-cases:
- Merging a default settings/config object with another object, the second object would be a deep partial of the default object.
- Mocking and testing complex entities, where populating an entire object with its keys would be redundant in terms of the mock or test.

@example
```
import {PartialDeep} from 'type-fest';

const settings: Settings = {
	textEditor: {
		fontSize: 14;
		fontColor: '#000000';
		fontWeight: 400;
	}
	autocomplete: false;
	autosave: true;
};

const applySavedSettings = (savedSettings: PartialDeep<Settings>) => {
	return {...settings, ...savedSettings};
}

settings = applySavedSettings({textEditor: {fontWeight: 500}});
```
*/
export type PartialDeep<T> = T extends Primitive
	? Partial<T>
	: T extends Map<infer KeyType, infer ValueType>
	? PartialMapDeep<KeyType, ValueType>
	: T extends Set<infer ItemType>
	? PartialSetDeep<ItemType>
	: T extends ReadonlyMap<infer KeyType, infer ValueType>
	? PartialReadonlyMapDeep<KeyType, ValueType>
	: T extends ReadonlySet<infer ItemType>
	? PartialReadonlySetDeep<ItemType>
	: T extends ((...args: any[]) => unknown)
	? T | undefined
	: T extends object
	? PartialObjectDeep<T>
	: unknown;

/**
Same as `PartialDeep`, but accepts only `Map`s and  as inputs. Internal helper for `PartialDeep`.
*/
interface PartialMapDeep<KeyType, ValueType> extends Map<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

/**
Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialSetDeep<T> extends Set<PartialDeep<T>> {}

/**
Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialReadonlyMapDeep<KeyType, ValueType> extends ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

/**
Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
*/
interface PartialReadonlySetDeep<T> extends ReadonlySet<PartialDeep<T>> {}

/**
Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialObjectDeep<ObjectType extends object> = {
	[KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>
};
