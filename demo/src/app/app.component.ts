import { Component } from '@angular/core';

import { LS_KEYS } from '@app/utils/config';
import { themes, themeProvider } from '@app/utils/theme';
import { IThemeConfig } from '@app/types';
import { Store } from '@app/services';

import { styles } from './styles';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styles: [':host { display: block; width: 100%; height: 100% }'],
})
export class AppComponent {
  public classes = themeProvider.useStyles(this, styles);

  public constructor(
    public store: Store,
  ) { }

  public ngOnInit(): void {
    this.checkPaletteInLs();
  }

  /** Gets saved theme from Local Storage and updates App theme, if it is necessary */
  private checkPaletteInLs(): void {
    try {
      const currentTheme: IThemeConfig = JSON.parse(window.localStorage.getItem(LS_KEYS.theme));
      if (!currentTheme || !currentTheme.theme) throw Error();

      // Need to make it in next Tick
      // currentTheme.theme.defaults = themes[0].theme.defaults;
      const theme = themeProvider.updateTheme({ ...themes[0].theme, palette: currentTheme.theme.palette });
      currentTheme.theme = theme;
      this.store.set('theme', currentTheme);
    } catch (err) {
      this.store.set('theme', themes[0]);
      window.localStorage.setItem(LS_KEYS.theme, JSON.stringify(themes[0].theme));
    }
  }
}
