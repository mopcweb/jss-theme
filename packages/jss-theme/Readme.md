# JSS Theming Solution

[![npm version](https://img.shields.io/npm/v/jss-theme.svg)](https://www.npmjs.com/package/jss-theme) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE) [![Size](https://img.shields.io/bundlephobia/minzip/jss-theme.svg)](https://npmjs.org/package/jss-theme) [![Downloads](https://img.shields.io/npm/dm/jss-theme.svg)](https://npmjs.org/package/jss-theme)

Inspired by React MUI theming solution in order to implement something like that for Angular projects.

Still could be used w/ any other view library or framework.

## IMPORTANT

Since 0.5.2 is bundled in not minified version because in Angular it causes problem with decorators usage.
In future minor releases this package will leave only generic code and all specific (for example Angular decorators and Class) will be removed into separate one

## Notes

Include necessary typescript typings.

Since 0.5.0 ships w/ Default Theme. See #Default Theme

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

## Usage for custom Theme (multiple Themes)

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

## Usage for default Theme. (This are shortcut functions for Theme instance methods)

### createDefaultTheme(themeConfig?, options?, replacer?) => DefaultTheme

This function should be called before any other methods in order to use them on default theme instance.

Second optional argument provides default options for creating new stylesheets.
Third optional argument provides default replacer for compiled styles.

If no first param provided - creates and returns Default Theme instance with default (Material Design) theme config.
If provided first param - creates default Theme instance with provided config.

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

## Default Theme

Default Theme is a precreated Theme instance with signature of DefaultTheme. It was inspired by MUI + provides some new changes, as well as bunch of useful mixins.

It also provides bunch of methods for  updating this theme or creating new one with similar structure:

Similar structure is [here](https://material-ui.com/ru/customization/default-theme/).

- __createDefaultThemeConfig(Theme, theme?) => DefaultTheme__
	Creates structure for  DefaultTheme, with optional overrides. First param is necessary in order to bind mixins to specific Theme instance
- __createTypography(typography?), createPalette(palette?), createBreakpoints(breakpoints?), createZIndex(zIndex?), createMixins(Theme)__ - aliases for creating DefaultTheme parts. Could be used for example for updating DefaultTheme theme. For each method it is possible provide partial overrides, for all not overridden values will be used defaults.
- __IMPORTANT: createTypographyItem(fontFamily, fontWeight, fontSize, lineHeight) and  createPalette(palette?)__: for main colors (primary, secondary, error, info, success, warning) it is OK to provide only main shade. Functions will automatically calculate light, dark and contrastText color. Still you can provide custom for all of them.
- __createShadows()__ - Creates shadows
```ts
const shadows = createShadows(
	[1, 1, 1, 1, '#000', true],
	{ x: 5, y: 5, blur: 5, spread: 5, color: '#000', inset: true },
);// => inset 1px 1px 1px 1px #000, inset 5px 5px 5px 5px #000
```
 - __createMaterialShadows(...ps)__  - Similar just using some Material Design style for creating shadows.
[Here each 4 values represents 1 shadow](https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss):
```ts
const shadows = createMaterialShadows(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0);
 ```
- __fade(color, opacity), darken(color, lvl?), lighten(color, lvl?), getContrastColor(color, bw?, black?, white?)__ Work w/ colors: transparency, getting dark / light shade, getting contrast text.
If provided just 1 param to getContrastColor - it will invert color. If provide second boolean param -> it will get contrast (black/white color, where 3d and 4th params can override default colors for contrast black and white)


## TODO

 - [ ] Provide Angular example (Stackblitz)
 - [ ] Decorators / hooks for React
 - [ ] Provide React example (Stackblitz)
 - [ ] Provide Docs website

## License

This project is licensed under the terms of the [MIT license](https://github.com/mopcweb/jss-theme/blob/master/LICENSE).
