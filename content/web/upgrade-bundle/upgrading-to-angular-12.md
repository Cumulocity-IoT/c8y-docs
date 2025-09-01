---
title: Upgrading from Angular 11 to Angular 12
layout: redirect
weight: 490
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
Angular 12 is supported from version `10.11.45.0`. The following configuration changes are required before you can run the application:

- Update all `@angular/*` dependencies to `12.2.x`.
- Update `TypeScript` to version `4.2.x` as [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/) is now required by Angular.
- Follow the `Angular 12` upgrade guide: [Updating to version 12](https://v12.angular.io/guide/updating-to-version-12).
- Use Node version `14`.

{{< c8y-admon-info >}}
AOT (Ahead-of-time compilation) is not yet supported.
{{< /c8y-admon-info >}}

#### How to enable IVY {#how-to-enable-ivy}

Ivy is a new rendering engine for Angular applications that improves application speed and facilitates development. Enabling Ivy is not mandatory, but as the older view engine is deprecated, we recommend you to do so.

During the update:

- Edit _tsconfig.json_ and set `enableIvy` to `true` or delete it as this setting is the default setting:

```javascript
    "angularCompilerOptions": {
        "enableIvy": true
  }
```

- Edit _package.json_ and add the `postinstall` hook:

```json
    "scripts": {
        ...
    "postinstall": "ngcc"
  }
```

- Delete `node_modules` and reinstall them. If `ngcc` works you should see a **compiling** step after installing all dependencies.

- If you use Jest (JavaScript Testing Framework) check [Jest - Angular IVY](https://thymikee.github.io/jest-preset-angular/docs/guides/angular-ivy) for the configuration.

{{< c8y-admon-info >}}
Deep imports are not supported. For example, you must import from `@c8y/ngx-components/asset-navigator` but not from `@c8y/ngx-components/asset-navigator/services/asset-service`.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
If you use Visual Studio Code, make sure that in the Angular Language Service Plugin the option "Use legacy View Engine language service" is not selected.
{{< /c8y-admon-info >}}
