# JSS Theming Solution

[![GitHub version](https://img.shields.io/badge/version-0.1.0-yellow.svg)](https://github.com/mopcweb/jss-theme/releases) [![npm version](https://img.shields.io/npm/v/jss-theme.svg)](https://www.npmjs.com/package/jss-theme) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE)

Inspired by React MUI theming solution in order to implement something like that for Angular projects.

Still could be used w/ any other view library or framework.

## Notes

Include necessary typescript typings

## Usage

### createTheme(overrides?: JssTheme) => void
This will create initial theme. This method could be called only once.:
```ts
import { createTheme, JssTheme } from 'jss-theme';

const overrides: JssTheme = {
	spacing: 10,
};

createTheme();
// or
createTheme(overrides);
```
Note: it would be also called internally for the first time, if call makeStyles or useStyles method with theme function, thus there would be not necessity to call it manually.

### makeStyles(styles: JssStyles) => JssStyles
This is just helper function which provides correct type definitions and intellisense either calling with theme function or styles object

```ts
import { makeStyles } from 'jss-theme';

const styles = makeStyles({
	className1: {
		display: 'flex,
		marginTop: 10,
	},
});
// or
const styles = makeStyles((theme) => ({
	className1: {
		display: 'flex,
		marginTop: theme.spacing * 2,
	},
}));
```

### useStyles(styles: JssStyles) => Classes
This one should be called with styles object or theme function (which could be written manually or via makeStyles method) and returns classes object, which could be used in components:

Example with Angular component:
```ts
import { Component, OnInit } from '@angular/core';
import { makeStyles, useStyles, Classes } from 'jss-theme';

@Component({
	template: `<div [class]="classes.className1">Jss styled div</div>`,
	...
})
export class SomeComponent implements OnInit {
	public classes: Classes = {};

	public ngOnInit(): void {
		const styles = makeStyles({
			className1: {
				display: 'flex,
				marginTop: 10,
			},
		});

		this.classes = useStyles(styles);
	}
}
```

### updateTheme(overrides: Partial< JssTheme>, styles: JssStyles) => Classes
This method updates current theme. After theme was updated, it will detach (remove from DOM) all theme dependent stylesheets, so if using this method in component with theme dependent styles it is IMPORTANT to provide styles for creating new sheet.

```ts
import { makeStyles, updateTheme } from 'jss-theme';

...

this.classes = updateTheme({ spacing: 10 }, styles);
```

### @StyledComponent(styles: JssStyles)
Decorator for usage with Angular component. Internally creates property 'classes' and puts classNames for compiled styles into it.

```ts
import { Component, OnInit } from '@angular/core';
import { makeStyles, StyledComponent } from 'jss-theme';

const styles = makeStyles({
	className1: {
		display: 'flex,
		marginTop: 10,
	},
});

@Component({
	template: `<div [class]="classes.className1">Jss styled div</div>`,
	...
})
@StyledComponent(styles)
export class SomeComponent implements OnInit {
}
```

## License

This project is licensed under the terms of the [MIT license](https://github.com/mopcweb/jss-theme/blob/master/LICENSE).
