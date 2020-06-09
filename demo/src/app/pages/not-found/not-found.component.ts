import { Component } from '@angular/core';
import { makeStyles } from 'jss-theme';
import { NgStyledComponent } from 'jss-theme-angular';

const styles = makeStyles((theme) => ({
  Root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',

    '& > h3': {
      marginBottom: theme.mixins.spacing(3),
      width: '100%',
      font: theme.mixins.font('h3'),
      textAlign: 'center',
    },

    '& > a:hover': {
      textDecoration: 'underline',
    },
  },
}));

@Component({ templateUrl: './not-found.component.html' })
export class NotFoundComponent extends NgStyledComponent {
  public constructor() { super(styles); }
}
