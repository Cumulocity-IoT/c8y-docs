---
weight: 40
title: Context object
layout: redirect
---

Every Data Preparation smart function receives a `context` object as its final parameter. The context provides runtime metadata and (in future releases) implementation-specific utilities.

### DataPrepContext {#data-prep-context}

| Field | Type | Description |
|-------|------|-------------|
| `runtime` | `"c8y-data-preparation"` | Identifies the runtime environment. Always `"c8y-data-preparation"` for Data Preparation smart functions. |

```typescript
export interface DataPrepContext {
  readonly runtime: "c8y-data-preparation";
  // Additional fields will be added in future releases.
}
```

### Using the context {#using-the-context}

Currently, the context object is mostly informational. The `runtime` property allows code shared between different smart-function implementations to detect where it is running.

```javascript
export function onMessage(msg, context) {
  if (context.runtime !== "c8y-data-preparation") {
    throw new Error("Unexpected runtime");
  }
  // ...
}
```

### Future additions {#future-additions}

The context object is the extension point for any per-invocation utilities the platform may provide in future. Examples of additions under consideration include:

- Access to rule configuration parameters
- Logging shortcuts beyond `console`
- Access to per-device or per-rule metadata
- Lookup helpers for finding related Cumulocity objects

These additions will be backwards compatible — existing functions will continue to work when new fields appear on the context.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- Should we explicitly tell users not to depend on the absence of fields (since new ones will appear)?
- Worth aligning naming conventions with the cross-component context contract — `runtime` is shared, what else is shared by convention?
- Note that there is no state API on the context (unlike Streaming Analytics) — Data Preparation functions are strictly stateless.
- Should we cross-reference the cross-component concept page where the general `context` pattern is described?
