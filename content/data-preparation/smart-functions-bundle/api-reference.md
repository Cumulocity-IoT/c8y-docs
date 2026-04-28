---
weight: 80
title: API reference
layout: redirect
---

The full TypeScript API for Data Preparation smart functions is published as an NPM package. The package contains the type definitions for all input and output types, the context object, and the function declarations themselves.

You can use the package directly when developing in TypeScript outside the platform. The same types also drive AI-assisted code generation and the in-UI editing experience.

### Package {#package}

**Package name**: To be confirmed.

**Install**:

```bash
npm install <package-name>
```

**Usage in TypeScript**:

```typescript
import {
  DeviceMessage,
  DataPrepContext,
  CumulocityObject,
  Measurement,
  Event,
  Alarm,
  Operation,
  ExternalId,
  MeasurementValue
} from "<package-name>";

export function onMessage(
  msg: DeviceMessage,
  context: DataPrepContext
): CumulocityObject[] {
  // ...
}
```

### Online reference {#online-reference}

The generated API documentation is hosted at:

**URL**: To be confirmed.

The online reference contains the same definitions as the NPM package, in browseable form, with full type information and inline documentation.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- Once the package name and URL are published, fill them in.
- Should we mirror the entire reference here, or just link out and keep the inline documentation in [Data types](#data-types) and [Context object](#context)?
- Add the `declare global` strategy if we adopt it — this enforces the function signature in TypeScript projects.
- Consider linking to a starter template repo, if one exists.
- Note any versioning policy for the package — semver, breaking-change policy.
