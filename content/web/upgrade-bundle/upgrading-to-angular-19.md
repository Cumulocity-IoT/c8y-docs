---
title: Upgrading from Angular 18 to Angular 19
layout: redirect
weight: 430
---

Starting with version 1022.0.0, the Web SDK supports Angular 19. The following configuration changes are required before you can run the application:

- Run the command `ng update @angular/core@19 @angular/cli@19` to update Angular core and CLI to version 19.
{{< c8y-admon-important >}}
Angular directives, components and pipes are now standalone by default. Specify `standalone: false` for declarations that are currently declared in an NgModule. 

This also applies to module federation plugins, including plugins that use earlier versions of Angular, but are utilized in applications migrated to Angular 19.
{{< /c8y-admon-important >}}
- Update all `@c8y` dependencies to version `1022.x.x` in your *package.json*.
- Update `ngx-bootstrap` to version `19.0.2`.
- Update `@angular/cdk` to version `19.x.x`.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 19` upgrade guide: [Updating to version 19](https://angular.dev/update-guide?v=18.0-19.0&l=2).

The Web SDK version 1022.0.0 introduces multiple breaking changes:

- The dashboard setting component will be refactored to use a secondary router outlet in order to make these type of views hookable. This requires adding `rootContext: ViewContext.Dashboard` to the context dashboard routes. For details, refer to [Support for cross application dashboard import/export functionality](/change-logs/#ui-c8y-1022-0-0-dashboard-cross-application-copy-paste).
- The login flow has been changed. The Web SDK no longer includes built-in login functionality in each application. Instead, a separate login application now manages all authentication flows. For details, refer to [Separate login application now manages all authentication flows](/change-logs/#ui-c8y-1022-0-0-separate-login-application).
