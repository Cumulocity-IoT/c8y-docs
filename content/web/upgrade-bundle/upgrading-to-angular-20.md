---
title: Upgrading from Angular 19 to Angular 20
layout: redirect
weight: 42
---

Starting with version 1023.0.0, the Web SDK supports Angular 20. The following configuration changes are required before you can run the application:

- Run the command `ng update @angular/core@20 @angular/cli@20` to update Angular core and CLI to version 20.
- Update all `@c8y` dependencies to version `1023.x.x` in your *package.json*.
- Update `ngx-bootstrap` to version `20.0.2`.
- Update `@angular/cdk` to version `20.x.x`.
- Update TypeScript to version `5.9.3` or higher.
- Ensure compatibility for `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 20` upgrade guide: [Updating to version 20](https://angular.dev/update-guide?v=19.0-20.0&l=2).
- Adjust the `main.ts` and `bootstrap.ts` files according to the git diffs [mentioned below](#track-changes-between-releases).

### Breaking changes {#breaking-changes}

The Web SDK version 1023.0.0 introduces multiple breaking changes.

#### Global time context API changes

The API for global time context has been completely redesigned. Custom widgets using the old Global Context API will no longer have access to global time context. To add global context support to a custom widget, you must integrate the new components:

- `GlobalContextConnectorComponent` - links your widget to the dashboard time context
- `LocalControlsComponent` - provides standalone time controls for your widget

#### ngx-translate upgrade

The `@ngx-translate/core` package has been upgraded to version 17.0.0. A separate `TranslateService` instance is now provided per plugin. If your code directly utilizes the `TranslateService`, you may need to adapt your implementation to account for this scoped service approach.

#### QueriesUtil type additions

The `QueriesUtil` class now includes type definitions. Depending on your usage of this class, you may encounter TypeScript compilation errors that need to be resolved by adding appropriate type annotations.

#### BulkSingleOperationsListModule removed

The `BulkSingleOperationsListModule` has been removed. Use `SingleOperationsListComponent` as a standalone component instead.

### Track changes between releases {#track-changes-between-releases}

Want to see exactly what changed within the code between versions? You can easily review the differences by examining the git diffs for each application:

- Administration: [v1022.47.5…v1023.0.0](https://github.com/Cumulocity-IoT/administration/compare/v1022.47.5...v1023.0.0)
- Cockpit: [v1022.47.5…v1023.0.0](https://github.com/Cumulocity-IoT/cockpit/compare/v1022.47.5...v1023.0.0)
- Device Management: [v1022.47.5…v1023.0.0](https://github.com/Cumulocity-IoT/devicemanagement/compare/v1022.47.5...v1023.0.0)