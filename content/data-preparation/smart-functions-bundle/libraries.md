---
weight: 40
title: Available libraries
layout: redirect
---

Data Preparation smart functions have access to a set of standard and specialized libraries to help with common data transformation tasks.

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

