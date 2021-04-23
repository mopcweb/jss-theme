import { Component, HostListener } from '@angular/core';
import { distinctUntilKeyChanged } from 'rxjs/operators';

import { LS_KEYS, ROUTES, BASE_URL } from '@app/utils/config';
import { IThemeConfig } from '@app/types';
import { themes, themeProvider } from '@app/utils/theme';
import { Store } from '@app/services';

import { styles } from './styles';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styles: [':host { display: block; width: 100%; height: 100% }'],
})
export class WrapperComponent {
  public mode = window.innerWidth <= 768 ? 'over' : 'side';
  public opened = !(window.innerWidth <= 768);

  public classes = themeProvider.useStyles(this, styles);
  public theme: IThemeConfig = { title: 'Light' } as IThemeConfig;
  public themes: IThemeConfig[] = themes;

  public routes = ROUTES;
  public baseUrl = BASE_URL;

  public constructor(
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.theme = JSON.parse(window.localStorage.getItem(LS_KEYS.theme));
    this.store.state$
      .pipe(distinctUntilKeyChanged('theme'))
      .subscribe(({ theme }) => {
        if (!theme) return;

        this.theme = theme;
        window.localStorage.setItem(LS_KEYS.theme, JSON.stringify(theme));
        themeProvider.updateTheme(theme.theme);
      });
  }

  /** Handler for theme option change */
  public handleChooseTheme(option: IThemeConfig): void {
    const prevTheme: IThemeConfig = JSON.parse(window.localStorage.getItem(LS_KEYS.theme));
    /* eslint-disable-next-line */
    if (option.title === 'Custom') option.theme = prevTheme.theme;

    this.store.set('theme', option);
    window.localStorage.setItem(LS_KEYS.theme, JSON.stringify(option));
  }

  /** Event listener for host */
  @HostListener('window:resize')
  public onResize = (): void => {
    if (window.innerWidth < 599) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
      this.opened = true;
    }
  }
}
