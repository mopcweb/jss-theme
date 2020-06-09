import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

import { State } from '@app/types';

/** App state management service (aka store) */
@Injectable({ providedIn: 'root' })
export class Store {
  private _state = new BehaviorSubject<State>({});

  public constructor() {
    this.state$.subscribe((state) => console.log('state >>>', state));
  }

  /** Getter for current state */
  public get state(): State {
    return cloneDeep(this._state.getValue());
  }

  /** Getter for current state observable */
  public get state$(): Observable<State> {
    return this._state.asObservable();
  }

  /**
   *  Subscribe for state updates
   *
   *  @param [next] - Handler for each value emitted by the observable.
   *  @param [error] - Handler for each error emitted by the observable.
   *  @param [complete] - Handler for observable completeness.
   */
  public sub(next?: (value: State) => void, error?: (error: Error) => void, complete?: () => void): Subscription {
    return this.state$.subscribe(next, error, complete);
  }

  /**
   *  Unsubscribe state observable
   *
   *  @param subscription- State subscription
   */
  public unsub(subscription: Subscription): void {
    if (subscription) subscription.unsubscribe();
  }

  /**
   *  Setter (reducer) for state
   *
   *  @param prop - Property to update
   *  @param value - Value to update with
   */
  public set<K extends keyof State>(prop: K, value: State[K]): void {
    if (!Object.hasOwnProperty.call(new State(), prop)) {
      throw new Error('There is no such property in App State');
    }

    if (Object.hasOwnProperty.call(new State(), prop)) {
      this._state.next({ ...this.state, [prop]: cloneDeep(value) });
    }
  }

  /**
   *  Getter for current state or state property
   *
   *  @param prop - Optional state property to get
   */
  public get(): State;
  public get<K extends keyof State>(prop: K): State[K];
  public get<K extends keyof State>(prop?: K): State | State[K] {
    if (!prop) return this._state.getValue();

    return cloneDeep(this._state.getValue()[prop]);
  }
}
