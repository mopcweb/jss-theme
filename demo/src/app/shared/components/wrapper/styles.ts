import { makeStyles } from 'jss-theme';

export const styles = makeStyles((theme) => ({
  Header: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: `${theme.defaults.headerHeight}px !important`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  HeaderLeft: {
    display: 'flex',
    alignItems: 'center',

    '& button': {
      marginLeft: theme.mixins.spacing(-1),
      marginRight: theme.mixins.spacing(2),
    },
  },

  HeaderRight: {
    '& > a:last-of-type': {
      marginRight: theme.mixins.spacing(-1),

      '& svg': {
        height: 24,
        fill: theme.palette.primary.contrastText,
      },
    },
  },

  Container: {
    height: `calc(100% - ${theme.defaults.headerHeight}px)`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,

    '& .AngularBreadcrumbsLight': {
      fontSize: 12,
      backgroundColor: `${theme.palette.background.default} !important`,
    },

    '& .AngularBreadcrumbsLight-List': {
      marginLeft: '-4px !important',
    },

    '& .AngularBreadcrumbsLight-Link, & .AngularBreadcrumbsLight-Separator': {
      color: `${theme.palette.text.primary} !important`,
    },

    '& .AngularBreadcrumbsLight-Link_current': {
      color: `${theme.palette.secondary.main} !important`,
    },

    '& .AngularBreadcrumbsLight-Separator': {
      margin: '0 !important',
    },

    '& .AngularBreadcrumbsLight-Icon, & .AngularBreadcrumbsLight-Separator': {
      fontSize: 20,
    },
  },

  Nav: {
    width: theme.defaults.navWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    '&.mat-drawer': {
      position: 'absolute',
    },

    '& nav': {
      display: 'flex',
      flexWrap: 'wrap',
    },

    '& a': {
      padding: theme.mixins.spacing(2),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      color: theme.palette.text.primary,
    },

    '& mat-icon': {
      marginRight: theme.mixins.spacing(2),
      color: theme.palette.secondary.main,
    },
  },

  Main: {
    height: `calc(100% - ${theme.defaults.breadcrumbsHeight}px) !important`,
  },
}));
