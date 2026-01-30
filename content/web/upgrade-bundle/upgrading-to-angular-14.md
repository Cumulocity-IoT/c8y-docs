---
title: Upgrading to Angular 14
layout: redirect
weight: 480
---

Angular 14 is supported from version `1015.132.0`. The following configuration changes are required before you can run the application:

- Update all `@angular/*` dependencies to `14.0.6`.
- Update `TypeScript` to version `4.7.4` as [TypeScript 4.6](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/) is now required by Angular.
- Follow the `Angular 14` upgrade guide: [Updating to version 14](https://update.angular.io/?l=3&v=12.0-14.0).
- Install new dev dependencies:
  - `"html-loader": "4.1.0"`,
  - `"style-loader": "3.3.1"`,
- Use Node version `14`.
- Delete `node_modules` and reinstall them.

{{< c8y-admon-info >}}
AOT (Ahead-of-time compilation) is not yet supported.
{{< /c8y-admon-info >}}


{{< c8y-admon-info >}}
If you use Visual Studio Code, make sure that in the Angular Language Service Plugin the option "Use legacy View Engine language service" is not selected.
{{< /c8y-admon-info >}}
