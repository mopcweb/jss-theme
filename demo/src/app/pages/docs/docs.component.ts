import { Component } from '@angular/core';
import { NgStyledComponent } from 'jss-theme-angular';
import { makeStyles } from 'jss-theme';

@Component({ templateUrl: './docs.component.html' })
export class DocsComponent extends NgStyledComponent {
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

  /* eslint-disable-next-line */
  public constructor() { super(styles); }

  public ngOnInit(): void {
    //
  }
}

const styles = makeStyles((theme) => ({
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
