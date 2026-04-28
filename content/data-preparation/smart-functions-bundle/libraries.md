---
weight: 50
title: Standard libraries and imports
layout: redirect
---

Data Preparation smart functions have access to a set of standard and specialized libraries to help with common data transformation tasks. Some libraries are always available in the global scope; others must be imported.

### Standard Javascript libraries {#standard-libraries}

**TextEncoder / TextDecoder**: Encode and decode text and binary data.

```javascript
const decoder = new TextDecoder();
const text = decoder.decode(message.payload);

const encoder = new TextEncoder();
const bytes = encoder.encode('Hello World');
```

**Base64 encoding**: Encode and decode Base64 data using browser APIs.

```javascript
// Encode
const base64 = btoa('Hello World');

// Decode
const original = atob(base64);
```

### Specialized libraries {#specialized-libraries}

The following libraries are available for parsing and working with specific data formats:

#### Protobuf

Parse Protocol Buffer messages.

**Status**: To be documented. Details will be added when library documentation is finalized.

#### CBOR

Work with CBOR (Concise Binary Object Representation) encoded data.

**Status**: To be documented. Details will be added when library documentation is finalized.

#### OPC UA

Interact with OPC UA data structures and types.

**Status**: To be documented. Details will be added when library documentation is finalized.

### Importing libraries {#importing-libraries}

Specialized libraries are imported at the top of your smart function:

```javascript
import { /* exported names */ } from 'library-name';

export function onMessage(message, context) {
  // Use imported functions
}
```

Specific import syntax and available exports will be documented as each library is finalized.

### Bundling external libraries {#bundling-external-libraries}

When developing outside the platform, you can use any third-party Javascript or TypeScript library by bundling it into a single file with your smart function. The result is uploaded as a single Javascript module.

This is the recommended approach for libraries that are not provided by the platform. The platform itself does not download libraries from package registries at runtime.

For details on the external development workflow, including transpilation and bundling, see the external development section.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- Confirm exact list of globals: `console`, `TextEncoder`, `TextDecoder`, `atob`, `btoa`, `Date`, `JSON`, `Math`, `Promise`, `URL`, `URLSearchParams`, `structuredClone`?
- Decide on terminology: "always available", "global", "built-in" — pick one and stick to it.
- Document the version of each global where relevant (for example, which spec version of `TextDecoder`).
- For each specialized library, document:
  - The exact import path
  - The functions/classes exported
  - The version provided by the platform
  - Any deviations from the standard library API
  - A short example of typical use
- Should the specialized libraries each be a separate page? They might grow large.
- Cross-reference where each library is most useful (for example, OPC UA library inside the OPC UA transport context).
- What happens if a user imports a name we don't provide? Compile-time error, runtime error, silent failure?
- Note about treeshaking: if libraries are large, do users pay for everything or only what they import?
