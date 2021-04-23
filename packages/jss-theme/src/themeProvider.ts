// eslint-disable-next-line import/no-extraneous-dependencies
import { Observable, BehaviorSubject } from 'rxjs';

import { StyleSheetFactoryOptions } from 'jss';
import cloneDeep from 'lodash.clonedeep';

import { JssTheme, JssStyles, JssClasses, Replacer, GenericObject, DeepPartial } from './typings';
import { Theme as ThemeConstructor } from './theme';

/**
 *  Theme provider for provided theme or themeConfig. It subsribes theme updates providing reactive store.
 *
 *  @param [themeOrThemeConfig] - Optional theme config or existing Theme instance.
 *  @param [config.options] - Default options for creating new stylesheets.
 *  @param [config.replacer] - Default replacer for theme styles.
 *  @param [config.property] - Property name into which to put updated classes on theme updates.
 */
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
  public updateTheme(themeConfig: DeepPartial<T> | T, options?: StyleSheetFactoryOptions, replacer?: Replacer | Replacer[]): T {
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
        this._triggerAngularChangeDetection(component);
      });
    });
  }

  /**
   *  !Angular specific change detection trigger.
   *  @note - ! Zero dependecy. For some cases OnPush change detection strategy is used in Angular components.
   *  For this cases we can inject ChangeDetectorRef and ThemeProvider will markForCheck on theme updates.
   *
   *  @param component - Component for which classes were updated.
   */
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

export interface IUseStylesComponentOptions { property?: string; options?: StyleSheetFactoryOptions }
export type IRegisteredComponent = GenericObject;
export interface IRegisteredComponentOptions extends IUseStylesComponentOptions { styles: JssStyles }
export interface IThemeProviderOptions extends IUseStylesComponentOptions { replacer?: Replacer | Replacer[] }
