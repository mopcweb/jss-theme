declare global {
  /** Omits provided value from provided type. Available by default in TS >= 3.5 */
  // export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  /* eslint-disable-next-line */
  export type GenericObject<T = any> = Record<string | number, T>;

  /** Interface for InputEvent (not included in lib.dom.d.ts) */
  /* eslint-disable-next-line */
  export interface UiEvent<Target = HTMLInputElement> extends Omit<Omit<Event, 'currentTarget'>, 'target'> {
    isTrusted: boolean;
    readonly data: string | null;
    readonly inputType: string;
    readonly isComposing: boolean;
    detail: number;
    type: 'input';
    target: Target;
    currentTarget: Target;
    eventPhase: number;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    composed: boolean;
    srcElement: HTMLElement;
  }
}

export {};
