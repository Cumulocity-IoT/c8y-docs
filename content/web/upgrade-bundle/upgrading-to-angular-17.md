---
title: Upgrading from Angular 16 to Angular 17
layout: redirect
weight: 450
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
Angular 17 is supported from version `1020.0.0`. The following configuration changes are required before you can run the application:

- Update all `@c8y` dependencies to version `1020.x.x` in your *package.json*.
- Replace `import 'zone.js/dist/zone'` with `import 'zone.js'` in the *src/polyfills.ts* file.
- Replace all occurrences of `"browserTarget"` with `"buildTarget"` in the *angular.json* file.
- Run the command `ng update @angular/core@17 @angular/cli@17` to update Angular core and CLI to version 17.
- Update `ngx-bootstrap` to version `12.0.0`.
- Update `@angular/cdk` to version `17.x.x`.
- Remove any reference of `loginOptions` in the *src/main.ts* file. The `loginOptions` function is now called under the hood as part of the `loadOptions` function.
- Add the `@c8y/options` package as a devDependency in your *package.json*.