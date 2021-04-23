import { Component } from '@angular/core';
import { themeProvider } from '@app/utils/theme';

const styles = themeProvider.makeStyles((theme) => ({
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

@Component({
  template: `
    <div [clsx]="[classes.Root]">
      <h3>Oops... Page not found</h3>
      <a routerLink="/">Start from home</a>
    </div>
  `,
})
export class NotFoundComponent {
  public classes = themeProvider.useStyles(this, styles);
}
