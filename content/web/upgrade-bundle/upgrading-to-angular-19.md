---
title: Upgrading from Angular 18 to Angular 19
layout: redirect
weight: 430
---

Angular 19 is supported from version `1022.0.0`. The following configuration changes are required before you can run the application:

- Run the command `ng update @angular/core@19 @angular/cli@19` to update Angular core and CLI to version 19.
{{< c8y-admon-important >}}
Angular directives, components and pipes are now standalone by default. Specify `standalone: false` for declarations that are currently declared in an NgModule. 

It also applies to module federation plugins, including plugins that uses earlier versions of Angular, but are utilized in application migrated to Angular 19.
{{< /c8y-admon-important >}}
- Update all `@c8y` dependencies to version `1022.x.x` in your *package.json*.
- Update `ngx-bootstrap` to version `19.0.2`.
- Update `@angular/cdk` to version `19.x.x`.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 19` upgrade guide: [Updating to version 19](https://angular.dev/update-guide?v=18.0-19.0&l=2).

With version 1022.0.0 there will be multiple breaking changes introduced:

- The dashboard setting component will be refactored to use a secondary router outlet in order to make these type of views hookable which leads to necessity of adding `rootContext: ViewContext.Dashboard` to context dashboard routes. See more at [Support for cross application dashboard import/export functionality](/change-logs/#ui-c8y-1022-0-0-dashboard-cross-application-copy-paste)
