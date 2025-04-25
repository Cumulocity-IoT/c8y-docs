---
title: Upgrading from Angular 18 to Angular 19  
layout: redirect
weight: 430
---

Angular 19 is supported from version `1022.0.0`. The following configuration changes are required before you can run the application:

{{< c8y-admon-important >}}
Since Angular 19, each component decorator must have `standalone` property with value `true` or `false`. It also applies
to module federation plugins.
{{< /c8y-admon-important >}}

- Run the command `ng update @angular/core@19 @angular/cli@19` to update Angular core and CLI to version 19.
- Update all `@c8y` dependencies to version `1022.x.x` in your *package.json*.
- Update `ngx-bootstrap` to version `19.0.2`.
- Update `@angular/cdk` to version `19.x.x`.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 19` upgrade guide: [Updating to version 19](https://angular.dev/update-guide?v=18.0-19.0&l=2).

