import { Component } from '@angular/core';
import { themeProvider } from '@app/utils/theme';

const styles = themeProvider.makeStyles((theme) => ({
  Icon: {
    color: `${theme.palette.secondary.main} !important`,
  },
  Item: {
    color: `${theme.palette.text.primary} !important`,
    cursor: 'pointer',
    transition: theme.mixins.transition(theme.transitions.easing.easeOut, 0.3),

    '&:hover': {
      boxShadow: theme.shadows[1],
    },
  },
}));


@Component({
  template: `
    <mat-list>
      <a *ngFor="let package of packages" [href]="package.link" target="_blank">
        <mat-list-item [clsx]="[classes.Item]">
          <mat-icon mat-list-icon [clsx]="[classes.Icon]">article</mat-icon>
          <div mat-line>{{ package.name }}</div>
          <div mat-line> {{ package.link }} </div>
        </mat-list-item>
      </a>
    </mat-list>
  `,
})
export class DocsComponent {
  public classes = themeProvider.useStyles(this, styles);
  public packages = [
    {
      name: 'Jss Theme',
      link: 'https://github.com/mopcweb/jss-theme/blob/master/packages/jss-theme/Readme.md#jss-theming-solution',
    },
    {
      name: 'Jss Theme Default',
      link: 'https://github.com/mopcweb/jss-theme/blob/master/packages/jss-theme-default/Readme.md#jss-default-theme',
    },
    {
      name: 'Jss Theme Angular',
      link: 'https://github.com/mopcweb/jss-theme/blob/master/packages/jss-theme-angular/Readme.md#jss-default-theme',
    },
  ];
}
