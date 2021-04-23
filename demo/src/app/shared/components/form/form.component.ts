import { Component } from '@angular/core';

import { themeProvider } from '@app/utils/theme';

const styles = themeProvider.makeStyles((theme) => ({
  EntityForm: { },

  Fields: {
    padding: theme.mixins.spacing(1),
    width: '100%',
    backgroundColor: theme.palette.background.paper,

    '& [formField]': {
      display: 'block',
      minWidth: 250,
      maxWidth: '100%',

      '&:not(:last-child)': {
        marginBottom: theme.mixins.spacing(2),
      },

      '&[full]': { width: '100%' },

      '&[half]': { width: '50%' },

      '&[quarter]': { width: '25%' },

      '&[inline]': {
        marginRight: theme.mixins.spacing(2),
        display: 'inline-block',
      },

      [theme.breakpoints.down('sm')]: {
        marginRight: `${theme.mixins.spacing(2)} !important`,
        minWidth: 0,
        width: '100% !important',
      },
    },
  },

  Controls: {
    margin: theme.mixins.spacing(3, 0),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      margin: theme.mixins.spacing(2, 0),
    },

    '& [formButton]': {
      marginBottom: theme.mixins.spacing(3),

      '&:not(:last-of-type)': {
        marginRight: theme.mixins.spacing(3),
      },
    },
  },
}));

/**
 *  Common form boilerplate wrapper.
 *
 *  Example usage (html):
 *  ```html
 *  <cs-form>
 *    <ng-container formFields>
 *      <input formField full />
 *      <input formField full />
 *      <input formField half />
 *      <input formField quarter />
 *    </ng-container>
 *
 *    <ng-container formControls>
 *      <button formButton>Cancel</button>
 *      <button formButton>Save</button>
 *    </ng-container>
 *  </cs-form>
 *  ```
 */
@Component({
  selector: 'jss-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public classes = themeProvider.useStyles(this, styles);
}
