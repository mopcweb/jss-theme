import { Component } from '@angular/core';
import { NgStyledComponent } from 'jss-theme-angular';
import { makeStyles } from 'jss-theme';

import { routes } from '@app/utils/config';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent extends NgStyledComponent {
  public links = routes.filter((item) => item.title !== 'Home');

  /* eslint-disable-next-line */
  public constructor() { super(styles); }

  public ngOnInit(): void {
    //
  }
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
