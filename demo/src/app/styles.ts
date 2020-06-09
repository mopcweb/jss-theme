import { makeStyles } from 'jss-theme';

export const styles = makeStyles((theme) => ({
  '@global': {
    'html, body': {
      fontSize: theme.typography.htmlFontSize,
      lineHeight: theme.typography.lineHeight,

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.htmlFontSize - 2,
      },
    },

    body: {
      font: theme.mixins.font('body1'),
      color: theme.palette.text.primary,
    },

    a: {
      color: theme.palette.secondary.main,
    },

    '.Wrapper': {
      margin: theme.mixins.spacing(0, 'auto'),
      padding: theme.mixins.spacing(3),
      width: '100%',
      maxWidth: theme.maxWidth,
      height: '100%',
      overflowX: 'hidden',

      [theme.breakpoints.down('md')]: {
        padding: theme.mixins.spacing(3, 2),
      },

      [theme.breakpoints.down('sm')]: {
        padding: theme.mixins.spacing(3, 1),
      },
    },

    // ******* Material overrides ******* //
    '.material-icons': {
      fontFamily: '"Material Icons" !important',
    },

    '.mat-divider': {
      width: '100%',
    },

    // Spinner
    '.mat-progress-bar-fill::after': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },

    '.mat-progress-bar-buffer': {
      backgroundColor: `${theme.palette.common.white} !important`,
    },

    '.mat-progress-spinner circle, .mat-spinner circle': {
      stroke: `${theme.palette.primary.main} !important`,
    },

    // Snackbar
    '.mat-snack-bar-container': {
      width: 'auto',
      maxWidth: '95%',
      color: theme.palette.common.white,

      '&.ok': { backgroundColor: theme.palette.primary.main },
      '&.info': { backgroundColor: theme.palette.info.main },
      '&.warn': { backgroundColor: theme.palette.warning.main },
      '&.error': { backgroundColor: theme.palette.error.main },
    },

    '.mat-simple-snackbar-action': {
      color: theme.palette.common.white,
    },

    // Tabs
    '.mat-tab-body-content': {
      overflow: 'hidden !important',
    },

    // Textfields
    '.mat-form-field': {
      '& .mat-form-field-label': {
        color: `${theme.palette.text.primary} !important`,
      },

      '& .mat-form-field-underline': {
        backgroundColor: `${theme.palette.text.primary} !important`,
      },

      '&.mat-focused:not(.mat-form-field-invalid)': {
        color: `${theme.palette.primary.main} !important`,

        '& .mat-form-field-label': {
          color: `${theme.palette.primary.main} !important`,
        },

        '& .mat-form-field-ripple': {
          backgroundColor: `${theme.palette.primary.main} !important`,
        },
      },
    },

    // Buttons
    '.mat-flat-button, .mat-raised-button, .mat-fab, .mat-mini-fab': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
