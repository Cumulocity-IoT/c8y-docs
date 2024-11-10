---
title: Upgrading from Angular 17 to Angular 18  
layout: redirect
weight: 450
---

Angular 18 is supported from version `1021.0.0`. The following configuration changes are required before you can run the application:

- Update all `@c8y` dependencies to version `1021.x.x` in your *package.json*.
- Run the command `ng update @angular/core@18 @angular/cli@18` to update Angular core and CLI to version 18.
- Update `ngx-bootstrap` to version `18.0.0`.
- Update `@angular/cdk` to version `18.x.x`.
- The `brandingEntry` application option can no longer be used to customize the global style of your application.
  Instead, global styles should now be specified via [the mechanism Angular provides](https://angular.dev/reference/configs/workspace-config#styles-and-scripts-configuration).
  If you previously did not use the `brandingEntry` in your `cumulocity.config.ts` file, you would now need to reference the `@c8y/style/main.less` file in the `styles` arrays of your `angular.json` file.
  In case you've previously used the `brandingEntry` in your `cumulocity.config.ts` you would now need to reference the same file in the `styles` arrays of your `angular.json` file.
  The `brandingEntry` should be removed from the `cumulocity.config.ts` file.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 18` upgrade guide: [Updating to version 18](https://angular.dev/update-guide?v=17.0-18.0&l=2).

