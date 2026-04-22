---
weight: 20
title: Common features
layout: bundle
---

Every smart function in {{< product-c8y-iot >}} follows a consistent API, regardless of whether it runs in Data Preparation, Streaming Analytics, thin-edge.io, or another component. This section covers the features and patterns that apply to all implementations.

## Function signature

A smart function exports a single named function as the entry point. The function name depends on the component (for example, `onMessage` for Data Preparation or `onInput` for Streaming Analytics), but the pattern is always the same:

```javascript
export [async] function FUNCTION_NAME(arg1, arg2, ..., context) {
  // Your logic here
  return result;
}
```

The final parameter is always a `context` object provided by the system. This object gives your function access to runtime information and utilities it may need.

## Language and runtime

Smart functions run in a Javascript runtime and support **ECMAScript 2023** features and later. You write and transpile your code outside the platform—using Javascript directly or TypeScript with your own build toolchain—and upload the resulting Javascript file for execution.

Supported language features include:

- Arrow functions, destructuring, spread operators, and other modern syntax
- `async` and `await` for asynchronous operations
- Template literals, classes, modules, and more

## Standard library

The system provides a lightweight standard library available in all smart functions:

- **Console API**: `console.log()`, `console.info()`, `console.warn()`, `console.error()`, and `console.debug()` for logging messages visible in the system.
- **TextEncoder and TextDecoder**: Convert strings to and from UTF-8 byte arrays.
- **Base64 utilities**: Encode and decode Base64 strings for working with binary data.

These utilities are sufficient for most common tasks. If you need additional functionality, you can include external libraries in your deployment package.

## Context object

The `context` parameter provides access to system-supplied information and utilities:

```javascript
export function onMessage(message, context) {
  console.log('Runtime:', context.runtime);
  // Your function can access runtime details and any implementation-specific utilities
  return message;
}
```

All smart functions receive a `context` object with a `runtime` property that identifies the execution environment (for example, `"data-preparation"` or `"streaming-analytics"`). Different implementations may add additional properties to the context for component-specific functionality.

## Asynchronous operations

You can define smart functions as `async` to support asynchronous operations:

```javascript
export async function onMessage(message, context) {
  const result = await someAsyncOperation(message);
  return result;
}
```

The system automatically handles both synchronous and asynchronous function signatures. Async functions should return promises that resolve to the expected output type for your implementation.

## No global state

Each invocation of your smart function runs in isolation. You must not rely on global variables or state that persists between invocations. Every execution receives fresh inputs, and any side effects outside your function's inputs and outputs are not guaranteed to persist.

This design ensures that smart functions are stateless, scalable, and predictable. If you need to maintain state (for example, counters or caches), use the context object or implementation-specific utilities provided by your component.

## Return values

The data your smart function returns depends on the component using it. For example:

- Data Preparation expects an array of objects or messages.
- Streaming Analytics expects an array of block values.
- thin-edge.io expects an array of edge messages.

Always check the documentation for your specific component to understand the expected return type. If your function returns `null` or `undefined`, the system typically treats this as "no output" and does not propagate any data downstream.

## Error handling

If your smart function throws an error, the system catches it and handles it according to component-specific policies. For example, some components may discard the input, retry the function, or log the error for inspection. You can use standard Javascript try/catch blocks to handle expected errors within your function.

```javascript
export function onMessage(message, context) {
  try {
    return processMessage(message);
  } catch (error) {
    console.error('Processing failed:', error);
    return null; // Or handle gracefully based on your needs
  }
}
```

## Next steps

Learn about the security model and resource limits that protect your smart functions and the platform in [Sandbox and limits](../sandbox-and-limits/).

Explore which implementations are available and how to choose the right one for your use case in [Implementations](../implementations/).
