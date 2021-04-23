# JSS Theme Angular

[![npm version](https://img.shields.io/npm/v/jss-theme-angular.svg)](https://www.npmjs.com/package/jss-theme-angular) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mopcweb/jss-theme/blob/master/LICENSE) [![Size](https://img.shields.io/bundlephobia/minzip/jss-theme-angular.svg)](https://npmjs.org/package/jss-theme-angular) [![Downloads](https://img.shields.io/npm/dm/jss-theme-angular.svg)](https://npmjs.org/package/jss-theme-angular)

Angular bindings for [jss-theme](https://npmjs.org/package/jss-theme) package.

## Deprecated

This package is deprecated for __Angular version starting from 9.__ with `Ivy` enabled.
Please refer to this [section for new usage](#update).

## Demo & docs

Demo and docs could be found [here](https://mopcweb.github.io/jss-theme).

Example in sandbox could be found [here](https://stackblitz.com/edit/jss-theme-examples?embed=1&file=src/app/app.component.ts).

## Notes

Include necessary typescript typings.

## Update

As stated below both `@NgStyled` decorator and `NgStyledComponent` works bad w/ [Ivy](https://angular.io/guide/ivy) and `aot` mode.

To overcome this since version v1.1.1 it is intoduced [ThemeProvide, UseStyles and createJssStyledComponent section](https://www.npmjs.com/package/jss-theme#themeprovider).

Steps to easily migrate old projects:

```ts
// NgStyledComponent.ts
import { createJssStyledComponent, ThemeProvide } from 'jss-theme'
import { theme } from './path/to/your/app/theme';

const themeProvider = new ThemeProvide(theme);

const NgStyledComponent = createJssStyledComponent(themeProvider);
```

Then in your app just replace __old NgStyledComponent__ with __new__:

```ts
// import { NgStyledComponent } from 'jss-theme-angular';
import { NgStyledComponent } from './path/to/your/app/NgStyledComponent';

@Component({ ... })
class SomeComponent extends NgStyledComponent {
  constructor() { super(styles); }
}
```

## Important

This bindings correctly works w/ Angular 8 and 9 __without__ Ivy.

In Ivy there were introduced breaking changes so that it is impossible to use as earlier custom decorators / extend classes. [Here is an Issue](https://github.com/angular/angular/issues/31495).

Still it is possible to use [this JSS Theming solution](https://www.npmjs.com/package/jss-theme) w/ Angular with Ivy, just [doing manually that work](https://www.npmjs.com/package/jss-theme#general-usage), which is done under @NgStyled and NgStyledComponent.

## Usage

### @NgStyled(styles, options?, theme?)

Decorator for usage with Angular components.
Internally creates property 'classes' and puts classNames for compiled styles into it and watches for theme updates.

__NOTE!__ Because of --aot Angular compiler, it is necessary to at least implement those methods, which are used in custom decorator in Component.
So for styles w/ theme ( aka: makeStyles((theme) => ({ ... })) ) in is necessary implement both ngOnInit and ngDoCheck. For styles which do not depend on theme -> only ngOnInit.

If one of necessary methods won't be provided -> it will throw an Error to prevent bugs in future.

__OR!__ use [NgStyledComponent](#ngstyledcomponent).

Second optional argument provides default options for creating new stylesheets.

Third optional argument could be used to call this method on specific Theme instance:

```ts
import { Component, OnInit, DoCheck } from '@angular/core';
import { makeStyles, NgStyled, Theme, Classes } from 'jss-theme';

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
// @NgStyled(styles, null, Theme) // Specific Theme
@NgStyled(styles) // Default Theme
export class SomeComponent implements OnInit, DoCheck {
  public classes: Classes = { };

  public ngOnInit(): void {}

  public ngDoCheck(): void {}
}
```

### NgStyledComponent

Class for usage with Angular components.
Internally creates property 'classes' and puts classNames for compiled styles into it and watches for theme updates.

__NOTE!__ Please be sure to set target: 'es2015' in your tsconfig.json in order to use NgStyledComponent because of Angular CLI changes.

Second optional argument provides default options for creating new stylesheets.

Third optional argument could be used to call this method on specific Theme instance:

```ts
import { Component } from '@angular/core';
import { makeStyles, NgStyledComponent, Theme } from 'jss-theme';

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
export class SomeComponent extends NgStyledComponent {
  public classes: Classes = { };

  constructor() {
    // super(styles, { ... }, Theme); // Specific Theme
    super(styles); // Default Theme
  }
}
```
