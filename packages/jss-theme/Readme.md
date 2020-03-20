# JSS Theming Solution

[![npm version](https://img.shields.io/npm/v/jss-theme.svg)](https://www.npmjs.com/package/jss-theme) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE) [![Size](https://img.shields.io/bundlephobia/minzip/jss-theme.svg)](https://npmjs.org/package/jss-theme) [![Downloads](https://img.shields.io/npm/dm/jss-theme.svg)](https://npmjs.org/package/jss-theme)

Framework agnostic theming solution inspired by React MUI theming solution in order to implement something like that for Angular projects.

## [Demo](https://stackblitz.com/edit/jss-theme-examples?embed=1&file=src/app/app.component.ts)

## IMPORTANT

Since 1.0.0 is shipped as separate package providing only general API for working w/ Themes.

There are other packages:
 - [jss-theme-default](https://npmjs.org/package/jss-theme-default) - Provides default theme configuration similar to [React MUI](https://material-ui.com/ru/customization/default-theme).
 - [jss-theme-angular](https://npmjs.org/package/jss-theme-angular) - Provides Angular bindings to simplify work w/ this solution in Angular projects

## Notes

Include necessary typescript typings.


## Init

### initJss(options?: JssOptions | boolean) => void

First of all call this method first to init JSS with default preset and optional custom options.

If provided true value - will be called with jss-default-preset.
If false - without any preset.
If options - just with provided options.

Returns created Jss instance so there are abilities to add plugins etc.

This method is just alias for next piece of code:
```ts
import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());
// or
const options = { ... };
jss.setup(options);
```

### General usage

```ts
// theme.ts

import { createDefaultTheme, Theme } from 'jss-theme';

createDefaultTheme({ spacing: 8, color: '#ff0000' }); // Work w/ default Theme instance

export const MyTheme = new Theme({ spacing: 12, color: '#f2f2f2' }); // Or create own Theme instance

...

// app.component.ts

import { Component, OnInit, DoCheck } from '@angular/core';
import { makeStyles, useStyles, JssClasses, JssTheme, isEqualTheme, getTheme, updateTheme } from 'jss-theme';

import { MyTheme } from '../path/to/theme.ts'

const styles = makeStyles((theme) => ({ //  MyTheme.makeStyles((theme) => ({ ... }))
  App: { margin: theme.spacing },
}));

@Component({
  template: `
    <div [class]="classes.App">Jss styled div with margins</div>
    <button (click)="handleUpdateTheme()">Update theme</button>
  `,
})
class App implements OnInit, DoCheck {
  public classes: JssClasses = { };
  private _cachedTheme: JssTheme;

  public ngOnInit(): void {
    this._cachedTheme = getTheme();
    // OR: this._cachedTheme = MyTheme.getTheme();
    // OR: this._cachedTheme = getTheme(MyTheme);

    this.classes = useStyles(styles);
    // OR: this.classes = MyTheme.useStyles(styles);
    // OR: this.classes = useStyles(styles, null, MyTheme);
  }

  public DoCheck(): void {
    if (!isEqualTheme(this._cachedTheme)) {
      // OR: if (!MyTheme.isEqualTheme(this._cachedTheme)) {...}
      // OR: if (!isEqualTheme(this._cachedTheme, MyTheme)) {...}

      this._cachedTheme = getTheme();
      // OR: this._cachedTheme = MyTheme.getTheme();
      // OR: this._cachedTheme = getTheme(MyTheme);

      this.classes = useStyles(styles);
      // OR: this.classes = MyTheme.useStyles(styles);
      // OR: this.classes = useStyles(styles, null, MyTheme);
    }
  }

  public handleUpdateTheme(): void {
    updateTheme({ spacing: 12 });
    // OR: MyTheme.updateTheme({ spacing: 12 });
    // OR: updateTheme({ spacing: 12 }, null, null, MyTheme);
  }
}

...

```

## Detailed usage for custom Theme (multiple Themes)

### new Theme(themeConfig?, options?, replacer?)

Creates new theme, which could be used in components.
Constructor gets 3 arguments: theme config for new Theme instance and optional default options for creating new stylesheets and replacer for compiled styles.
Each Theme instance has following methods:

 - __getTheme() => JssTheme__
	Returns current theme value;
 - __updateDefaultOptions(options) => void__
	Updates default options for creating new stylesheets
 - __updateDefaultReplacer(replacer) => void__
	Updates default replacer for theme styles. This one is concerned with Jss compiler errors during parsing some pseudo-classes (:first-child, :first-of-type)
 - __isEqualTheme(theme) => boolean__
	Check whether provided theme options equals to that used by Theme instance
 - __hasStylesInCache(styles) => boolean__
	Checks if provided styles are cached. Necessary for checking for theme dependent styles updates;
 - __rewriteTheme(themeConfig?, options?, replacer?) => JssTheme__
	Totally rewrite current theme options with provided new (no merge here). Optional params as for constructor
 - __updateTheme(themeConfig, options?, replacer?) => Classes__
	Updates theme with new values. Optionally could be provided jss sheet options. Optional params as for constructor
 - __useStyles(styles, options?) => Classes__
	Gets styles, compiles them, attaches to DOM and returns related classNames
 - __makeStyles(styles) => JssStyles__
	Helper for providing correct type definitions and intellisense while creating styles

```ts
import { Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 8 });
// or
const SomeTheme = new Theme();
SomeTheme.rewriteTheme({ spacing: 8 });

// Methods
const theme = SomeTheme.getTheme();
SomeTheme.updateDefaultOptions({ ... });
SomeTheme.updateDefaultReplacer(replacer);
SomeTheme.isEqualTheme(theme);
const styles = SomeTheme.makeStyles((theme) => ({
	calssName: { margin: theme.spacing }
}))
SomeTheme.hasStylesInCache(styles);
const classes = SomeTheme.useStyles(styles);
SomeTheme.updateTheme({ spacing: 1 });
```

## Detailed usage for default Theme. (This are shortcut functions for Theme instance methods)

### createDefaultTheme(themeConfig?, options?, replacer?) => DefaultTheme

This function should be called before any other methods in order to use them on default theme instance.

Second optional argument provides default options for creating new stylesheets.
Third optional argument provides default replacer for compiled styles.

If no first param provided - creates and returns Default Theme instance with default (Material Design) theme config.
If provided first param - creates default Theme instance with provided config.

```ts
import { createDefaultTheme, getTheme } from 'jss-theme';

createDefaultTheme({ spacing: 8 });

console.log(getTheme().spacing === 8);
```


### getDefaultTheme() => DefaultThemeInstance

Returns Default (precreated) Theme instance, which ships with package.

### setDefaultTheme(Theme) => void

Sets provided Theme instance as default so all shortcuts functions now will be used upon this Theme instance.
Shortcut functions could be used as well as Theme instance methods.

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

### rewriteTheme(themeConfig, options?, replacer?, theme?) => JssTheme
This will create initial default theme. This method could be called only once upon each Theme instance.

Second and third params similar to createDefaultTheme();

Last optional argument could be used to call this method on specific Theme instance:

```ts
import { createTheme, JssTheme, Theme } from 'jss-theme';

const themeConfig: JssTheme = {
	spacing: 10,
};

const SomeTheme = new Theme();

createTheme(themeConfig, null, SomeTheme); // Specific Theme
createTheme(themeConfig); // Default Theme
```

### getTheme(theme?) => void

Gets current theme.

Optional argument could be used to call this method on specific Theme instance:

```ts
import { getTheme, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

const theme = getTheme(SomeTheme) // Custom theme
const theme = getTheme() // Default theme
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

Last optional argument could be used to call this method on specific Theme instance:

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

### updateTheme(themeConfig, options?, replacer?, theme?) => JssTheme

This method updates current theme. After theme was updated, it will detach (remove from DOM) all theme dependent stylesheets, so if using this method in component with theme dependent styles it is IMPORTANT to provide styles for creating new sheet.

Second and third params similar to createDefaultTheme();

Last optional argument could be used to call this method on specific Theme instance:

```ts
import { makeStyles, updateTheme, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

...

this.classes = updateTheme({ spacing: 10 }, SomeTheme); // Specific Theme
this.classes = updateTheme({ spacing: 10 }); // Default Theme
```

### updateDefaultOptions(options, theme?) => void

Updates default options for creating new stylesheets.

Last optional argument could be used to call this method on specific Theme instance:

```ts
import { updateDefaultOptions, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

updateDefaultOptions({ ... }, SomeTheme) // Custom theme
updateDefaultOptions({ ... }) // Default theme
```

### updateDefaultReplacer(replacer, theme?) => void

Updates default replacer for theme styles.

Last optional argument could be used to call this method on specific Theme instance:

```ts
import { updateDefaultReplacer, Theme } from 'jss-theme';

const SomeTheme = new Theme({ spacing: 1 });

// const replacer = { pattern: RegExp | string, value: string };
// or
// const replacer = [
// 	  { pattern: RegExp | string, value: string },
//	  { pattern: RegExp | string, value: string },
//	  ...
// ];

const replacer = { pattern: ':first-child', value: ':nth-child(2)' };

updateDefaultReplacer(replacer, SomeTheme) // Custom theme
updateDefaultReplacer(replacer) // Default theme
```

### isEqualTheme(themeConfig, theme?) and hasStylesInCache(themeConfig, theme?)

Similar to Theme instance methods.

Last optional argument could be used to call this method on specific Theme instance

## License

This project is licensed under the terms of the [MIT license](https://github.com/mopcweb/jss-theme/blob/master/LICENSE).
