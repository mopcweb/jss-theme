

# JSS Theming Solution

[![GitHub version](https://img.shields.io/badge/version-0.2.2-yellow.svg)](https://github.com/mopcweb/jss-theme/releases) [![npm version](https://img.shields.io/npm/v/jss-theme.svg)](https://www.npmjs.com/package/jss-theme) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE)

Inspired by React MUI theming solution in order to implement something like that for Angular projects.

Still could be used w/ any other view library or framework.

## Notes

Include necessary typescript typings.

## Init

### initJss(options?) => void

First of all call this method first to init JSS with default preset and optional custom options

## Usage for custom Theme (multiple Themes)

### new Theme(themeConfig?, options?)

Creates new theme, which could be used in components.
Constructor gets 2 arguments: theme config for new Theme instance and optional default options for creating new stylesheets.
Each Theme instance has following methods:

 - __getTheme() => JssTheme__
	Returns current theme value;
 - __updateDefaultOptions(options) => void__
	Updates default options for creating new stylesheets
 - __hasStylesInCache(styles) => boolean__
	Checks if provided styles are cached. Necessary for checking for theme dependent styles updates;
 - __createTheme(themeConfig?) => JssTheme__
	If thee were no themeConfig provided in class constructor, here it is possible to create initial theme;
 - __updateTheme(themeConfig, styles, options?) => Classes__
	Updates theme with new values. Optionally could be provided jss sheet options
 - __useStyles(styles, options?) => Classes__
	Gets styles, compiles them, attaches to DOM and returns related classNames
 - __makeStyles(styles) => JssStyles__
	Helper for providing correct type definitions and intellisense while creating styles

```ts
import { Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 8 });
// or
const SomeTheme = new Theme();
SomeTheme.createTheme({ spacing: 8 });

// Methods
const theme = SomeTheme.getTheme();
SomeTheme.updateDefaultOptions({ ... });
const styles = SomeTheme.makeStyles((theme) => ({
	calssName: { margin: theme.spacing }
}))
const classes = SomeTheme.useStyles(styles);
const classes = SomeTheme.updateTheme({ spacing: 1 }, styles);
```

## Usage for default Theme. (This are shortcut functions for Theme instance methods)

### createTheme(themeConfig, options?, theme?) => JssTheme
This will create initial default theme. This method could be called only once upon each Theme instance.

Second optional argument provides default options for creating new stylesheets.

Third optional argument could be used to call this method on specific Theme instance:

```ts
import { createTheme, JssTheme, Theme } from 'jss-theme';

const themeConfig: JssTheme = {
	spacing: 10,
};

const SomeTheme = new Theme();

createTheme(themeConfig, null, SomeTheme); // Specific Theme
createTheme(themeConfig); // Default Theme
```

### makeStyles(styles) => JssStyles

This is just helper function which provides correct type definitions and intellisense either calling with theme function or styles object.

```ts
import { makeStyles } from 'jss-theme';

const styles = makeStyles({
	className1: {
		display: 'flex',
		marginTop: 10,
	},
});
// or
const styles = makeStyles((theme) => ({
	className1: {
		display: 'flex',
		marginTop: theme.spacing * 2,
	},
}));
```

### useStyles(styles, options?, theme?) => Classes

This one should be called with styles object or theme function (which could be written manually or via makeStyles method) and returns classes object, which could be used in components.

Second optional argument provides default options for creating new stylesheets.

Third optional argument could be used to call this method on specific Theme instance:

Example with Angular component:
```ts
import { Component, OnInit } from '@angular/core';
import { makeStyles, useStyles, Classes, Theme } from 'jss-theme';

@Component({
	template: `<div [class]="classes.className1">Jss styled div</div>`,
	...
})
export class SomeComponent implements OnInit {
	public classes: Classes = {};

	public ngOnInit(): void {
		const SomeTheme = new Theme({ spacing: 1 });
		const styles = makeStyles({
			className1: {
				display: 'flex',
				marginTop: 10,
			},
		});

		this.classes = useStyles(styles, null, SomeTheme); // Specific Theme
		this.classes = useStyles(styles); // Default Theme		
	}
}
```

### updateTheme(themeConfig, styles, options?, theme?) => Classes

This method updates current theme. After theme was updated, it will detach (remove from DOM) all theme dependent stylesheets, so if using this method in component with theme dependent styles it is IMPORTANT to provide styles for creating new sheet.

Third optional argument provides default options for creating new stylesheets.

Fourth optional argument could be used to call this method on specific Theme instance:

```ts
import { makeStyles, updateTheme, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

...

this.classes = updateTheme({ spacing: 10 }, styles, null, SomeTheme); // Specific Theme
this.classes = updateTheme({ spacing: 10 }, styles); // Default Theme
```

### @StyledComponent(styles, options?, theme?)
Decorator for usage with Angular component. Internally creates property 'classes' and puts classNames for compiled styles into it.

Second optional argument provides default options for creating new stylesheets.

Third optional argument could be used to call this method on specific Theme instance:

```ts
import { Component, OnInit } from '@angular/core';
import { makeStyles, StyledComponent, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

const styles = makeStyles({
	className1: {
		display: 'flex',
		marginTop: 10,
	},
});

@Component({
	template: `<div [class]="classes.className1">Jss styled div</div>`,
	...
})
@StyledComponent(styles, null, Theme) // Specific Theme
@StyledComponent(styles) // Default Theme
export class SomeComponent implements OnInit {
}
```

### setDefaultTheme(theme) => void

Sets provided Theme instance as default in order to use shortcut functions instead of Theme instance methods.

```ts
import { makeStyles, useStyles, createTheme, Theme, setDefaultTheme } from 'jss-theme';

// This will be called on default Theme, which is included in package
createTheme({ spacing: 1 });
const styles = makeStyles((theme) => ({
	className: {
		margin: theme.spacing * 2,
	},
}));
const classes = useStyles(styles);

// Create custom Theme and set it as default
const SomeCustomTheme = new Theme({ customProp: 'top' });
setDefaultTheme(SomeCustomTheme);

// Now shortcut function calls will be executed on SomeCustomTheme
const styles = makeStyles((theme) => ({
	className: {
		position: theme.customProp,
	},
}));
const classes = useStyles(styles);
```

### updateDefaultOptions(options, theme?)

Updates default options for creating new stylesheets

Second optional argument could be used to call this method on specific Theme instance:

```ts
import { updateDefaultOptions, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

updateDefaultOptions({ ... }, SomeTheme) // Custom theme
updateDefaultOptions({ ... }) // Default theme
```

## License

This project is licensed under the terms of the [MIT license](https://github.com/mopcweb/jss-theme/blob/master/LICENSE).
