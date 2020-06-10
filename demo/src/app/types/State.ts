import { IThemeConfig } from './theme';

/**
 *  Class for app state.
 *
 *  @note ! IMPORTANT ! It is necessary to provide initial value for each item. At least undefined
 *  @note This is necessary for Store internal checks and type typization
 */
export class State {
  public theme?: IThemeConfig = undefined;;
}
