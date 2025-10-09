---
title: Upgrading from Angular 14 to Angular 15
layout: redirect
weight: 470
---

Angular 15 is supported from version `1018.157.0`. The following configuration changes are required before you can run the application:

- Update all `@angular/*` dependencies to `15.2.7`.
- Update `TypeScript` to version `4.9.5`.
- Follow the `Angular 15` upgrade guide: [Updating to version 15](https://update.angular.io/?l=3&v=14.0-15.0).
- Use Node version `^14.20.0 || ^16.13.0 || ^18.10.0`.
- Delete `node_modules` and reinstall them.

- Token hooks were deprecated and replaced by function hooks. Check the table below to see to which function hooks the token hooks have been migrated to.

Deprecated HOOK Tokens and Their Replacements
| Deprecated Token    | Replaced By       |
|---------------------|-------------------|
| `HOOK_TABS`         | `hookTab`         |
| `HOOK_NAVIGATOR_NODES` | `hookNavigator` |
| `HOOK_ACTION`       | `hookAction`      |
| `HOOK_BREADCRUMB`   | `hookBreadcrumb`  |
| `HOOK_SEARCH`       | `hookSearch`      |
| `HOOK_ONCE_ROUTE`   | `hookRoute`       |
| `HOOK_COMPONENTS`   | `hookComponent`   |
| `HOOK_WIZARD`       | `hookWizard`      |
| `HOOK_STEPPER`      | `hookStepper`     |

{{< c8y-admon-info >}}
For more information on the multi provider, refer to the [{{< product-c8y-iot >}} Developer Codex](https://cumulocity.com/codex/).
{{< /c8y-admon-info >}}


{{< c8y-admon-info >}}
At this point, AOT (Ahead-of-time compilation) is not yet supported.
{{< /c8y-admon-info >}}
