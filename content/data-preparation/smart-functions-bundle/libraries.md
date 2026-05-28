---
weight: 50
title: Standard libraries and imports
layout: redirect
---

Data Preparation smart functions run in a Javascript environment conforming to ES2023. The following additional global objects and functions are available without any import statement. Additional libraries for specific data formats can be imported explicitly.

### Globals {#globals}

#### console {#console}

Logs output for debugging. All methods accept any number of arguments, which are converted to strings and joined with spaces. Use Javascript string interpolation rather than relying on format strings, for example:

```javascript
console.info(`Device ${deviceId} reported temperature: ${temperature}`);
```

| Method | Description |
|--------|-------------|
| `console.log(...args)` | Alias for `console.info`. |
| `console.info(...args)` | Informational message. |
| `console.warn(...args)` | Warning message. |
| `console.error(...args)` | Error message. |
| `console.debug(...args)` | Debug-level output. |

For more detail about how to view the logs see [Runtime behavior and limits](#logs).

#### TextEncoder {#text-encoder}

Encodes strings as UTF-8 bytes. Instantiate with a zero-argument constructor.

| Method / Property | Description |
|-------------------|-------------|
| `encode(input)` | Encodes a string and returns a `Uint8Array`. |
| `encodeInto(input, dest)` | Encodes a string into an existing `Uint8Array`. |
| `encoding` | Always returns `"utf-8"`. |

```javascript
const encoder = new TextEncoder();
const bytes = encoder.encode('Hello World');
```

#### TextDecoder {#text-decoder}

Decodes bytes into a string. Instantiate with the encoding name as the first argument.

| Method / Property | Description |
|-------------------|-------------|
| `decode(input)` | Decodes a `Uint8Array` and returns a string. |
| `encoding` | Returns the encoding specified at construction. |

```javascript
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(msg.payload);
```

#### Base64 {#base64}

Encodes and decodes Base64 data. All methods are static.

| Method | Description |
|--------|-------------|
| `Base64.encode(bytes)` | Encodes a `Uint8Array` to a Base64 string. |
| `Base64.decode(str)` | Decodes a Base64 string to a `Uint8Array`. |
| `Base64.encodeStr(str)` | Encodes a plain string to a Base64 string. |
| `Base64.decodeStr(str)` | Decodes a Base64 string to a plain string. |

#### OPCUACodec {#opcua-codec}

Encodes and decodes OPC UA binary data. Instantiate with a zero-argument constructor.

| Method | Description |
|--------|-------------|
| `decode(bytes)` | Decodes OPC UA binary data. |
| `decodeDataValue(bytes)` | Decodes an OPC UA DataValue. |
| `encode(value)` | Encodes a value to OPC UA binary. |
| `encodeDataValue(value)` | Encodes a value as an OPC UA DataValue. |

### Importable libraries {#importable-libraries}

The following libraries are available as explicit imports.

#### protobufjs {#protobufjs}

Parse and encode Protocol Buffer messages.

```javascript
import protobuf from 'protobufjs.js';
```

Data Preparation provides [protobufjs](https://protobufjs.github.io/protobuf.js/) version 8.

#### cbor2 {#cbor2}

Work with CBOR (Concise Binary Object Representation) encoded data.

```javascript
import { /* exported names */ } from 'cbor2.js';
```

Data Preparation provides [cbor2](https://hildjj.github.io/cbor2/) version 1.

### Bundling external libraries {#bundling-external-libraries}

When developing outside the platform, you can use any third-party Javascript or TypeScript library by bundling it into a single file with your smart function. The result is uploaded as a single Javascript module.


This is the recommended approach for libraries that are not provided by the platform. The platform does not download libraries from package registries at runtime.

For details on the external development workflow, including transpilation and bundling, see the external development section.
