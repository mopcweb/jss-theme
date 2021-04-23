import { Component } from '@angular/core';
import { makeStyles } from 'jss-theme';

import { NgStyledComponent } from '@app/utils/theme';
import { ROUTES } from '@app/utils/config';

@Component({
  template: `
    <article>
      <header [clsx]="[classes.Header]">
        <h1>JSS Theme</h1>
        <div>
          <a href="https://www.npmjs.com/package/jss-theme" target="_blank">
            <img src="https://img.shields.io/npm/v/jss-theme.svg" alt="version" />
          </a>
          <a href="https://github.com/mopcweb/jss-theme/blob/master/LICENSE" target="_blank">
            <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
          </a>
          <a href="https://www.npmjs.com/package/jss-theme" target="_blank">
            <img src="https://img.shields.io/npm/dm/jss-theme.svg" alt="downloads" />
          </a>
        </div>
      </header>

      <section [clsx]="[classes.Description]">
        Framework agnostic theming solution inspired by React MUI theming solution
        in order to implement something like that for Angular projects.
      </section>

      <section [clsx]="[classes.Links]">
        <h2>Useful links:</h2>

        <a *ngFor="let link of links" mat-button [routerLink]="link.link">
          <mat-icon *ngIf="link.icon">{{ link.icon }}</mat-icon>
          {{ link.title }}
        </a>
      </section>
    </article>

  `,
})
export class HomeComponent extends NgStyledComponent {
  public links = ROUTES.filter((item) => item.title !== 'Home');

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  constructor() { super(styles); }
  // public classes = themeProvider.useStyles(this, styles);
}

const styles = makeStyles((theme) => ({
  Header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',

    '& > h1': {
      font: theme.mixins.font('h1'),

      [theme.breakpoints.down('md')]: {
        font: theme.mixins.font('h3'),
      },
    },

    '& > div': {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },

    '& a': {
      display: 'block',
      marginTop: theme.mixins.spacing(1),
    },

    '& a:not(:last-of-type)': {
      marginRight: theme.mixins.spacing(1),
    },
  },

  Description: {
    marginTop: theme.mixins.spacing(4),
  },

  Links: {
    marginTop: theme.mixins.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '& h2': {
      marginBottom: theme.mixins.spacing(2),
      width: '100%',
      textAlign: 'center',
      font: theme.mixins.font('h6'),
      color: theme.palette.secondary.main,
    },

    '& a': {
      margin: theme.mixins.spacing(0, 2),
    },
  },
}));
