## 1.0.0 (2020-3-??)

### Breaking changes

- [all] The main breaking change is that now there is 3 separate packages. jss-theme package now ships only functionality for creating/updating/working w/ Theme(s). All Angular specific and DefaultTheme functionality were removed.

### New features

- [jss-theme] Contains only functionality for creating/updating/working w/ Theme(s) and types. Smaller bundle size.
- [jss-theme-default] Contains JssDefaultTheme structure, utils for creating/updating/working w/ default theme and types.
- [jss-theme-angular] Contains all Angular specific functionality: @NgStyled decorator and NgStyledComponent class.
- [jss-theme-angular] Implemented NgStyledComponent class. This one is alternative for @NgStyled decorator. It patches ngOnInit and (if necessary) ngDoCheck lifecycle hooks to correctly update styles.

### Improvements

- [jss-theme]
- [jss-theme-default]
- [jss-theme-angular]

### Bug fixes

- [jss-theme-angular] @NgStyled decorator now throws error if necessary lifecycle (ngOnInit, ngDoCheck) hooks doesn't implemented by Component class. This one is necessary for proper work w/ AOT Angular compiler. So for proper work this methods should be implemented event if they're going to be empty.

---


## 0.5.0 (2020-3-05) - [#7](https://github.com/mopcweb/jss-theme/pull/7)

### New features

- [all] Added DefaultTheme and all necessary factory methods for creating/updating DefaultTheme config.
- [all] Added bunch of methods for simplifying of themes and css creations: work w/ color, gradients, shadows, fonts, spacing.
- [all] Updated Theme constructor and shortcuts createTheme(): now it is called rewriteTheme and does exactly what it is in its title - totally replace theme options for provided Theme instance.

### Improvements

- [all] Changed way of bundling, building and managing library.
- [all] Added more types for all data structures.

### Bug fixes

- [all] For Angular 9+ w/ Ivy renderer provided analogue for custom StyleComponent decorator (as it is not working in --aot compiler mode) -> Basic NgStyledComponent Class, which necessary to extend in order to get similar encapsulated logic. Also w/ this approach it is necessary to call super() in constructor and ngOnInit(), ngDoCheck() methods (if they are used).

---


## 0.4.0 (2020-3-01) - [#6](https://github.com/mopcweb/jss-theme/pull/6)

### New features

- [all] Added StyledClass for Angular + --aot compiler flag (This is stil under construction and API may changed).

### Improvements

- [all] Included peerDependencies.
- [all] Changed lodash dependency to separate functions from it, which are used.
- [all] Now lib is bundled via webpack w/ all necessary dependencies.

### Summary

- [all] Tested usage w/ React - works.

---


## 0.3.0 (2020-2-27) - [#5](https://github.com/mopcweb/jss-theme/pull/5)

### New features

- [all] Added Default Theme.
- [all] Fully typed Default Theme.
- [all] Added ability to provide / update replacer for styles parser before compilation.
- [all] Added ability to provide / update default options for stylesheets creation.

---


## 0.2.0 (2020-2-25)

### New features

- [all] Added ability to create, manage and use multiple Themes.
- [all] Added ability to set custom Theme instance as default.
- [all] Added ability to use functions shortcuts w/ custom Theme instance, provided as last argument.

### Improvements

- [all] Updated Angular StyledComponent decorator: now it internally checks for theme updates it provided styles which depends on theme (theme function).

### Summary

- [all] Removed default theme config.
- [all] Make default JssTheme interface equals to any - it could be of any structure.

---


## 0.1.0 (2020-2-24)

### Summary

- [all] Create custom theme.
- [all] Caching styles.
- [all] Update theme dynamically. Only those styles will be updated, which uses theme.
- [all] useStyles method for getting necessary classNames for compiled and attached to DOM styles.
- [all] makeStyles helper for typescript definitions and intellisense.
- [all] Provided types.
- [all] Provided Readme with examples.
