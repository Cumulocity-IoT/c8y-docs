---
weight: 20
title: Common features
layout: redirect
---

Every smart function in {{< product-c8y-iot >}} follows a consistent API, regardless of whether it runs in Data Preparation, Streaming Analytics, thin-edge.io, or another component. This section covers the features and patterns that apply to all implementations.

### Function signature {#function-signature}

A smart function exports a single named function as the entry point. The function name depends on the component (for example, `onMessage` for Data Preparation or `onInput` for Streaming Analytics), but the pattern is always the same:

```javascript
export [async] function FUNCTION_NAME(arg1, arg2, ..., context) {
  // Your logic here
  return result;
}
```

The final parameter is always a `context` object provided by the system. This object gives your function access to runtime information and utilities it may need.

### Language and runtime {#language-and-runtime}

Smart functions run in a Javascript runtime and support **ECMAScript 2023** features and later. Some components allow you to write Javascript code directly within the platform in the Cumulocity UI. Alternatively, you can write and transpile your code outside the platform—using Javascript directly or TypeScript with your own build toolchain—and upload the resulting Javascript file for execution.

Supported language features include:

- Arrow functions, destructuring, spread operators, and other modern syntax
- `async` and `await` for asynchronous operations
- Template literals, classes, modules, and more

### Standard library {#standard-library}

In addition to the standard library features within the ES2023 standard, all smart functions also provide a Console API: `console.log()`, `console.info()`, `console.warn()`, `console.error()`, and `console.debug()` for logging messages visible in the system.

Some components my provide other libraries in addition depending on the needs of that component. 

These utilities are sufficient for most common tasks. If you need additional functionality, additional libraries can be deployed with all smart functions via transpilation when you write your code outside of the platform. On a per-component-basis it may also be possible to provide further libraries that can be included at runtime within the Javascript.

### Context object {#context-object}

The `context` parameter provides access to system-supplied information and utilities:

```javascript
export function onMessage(message, context) {
  console.log('Runtime:', context.runtime);
  // Your function can access runtime details and any implementation-specific utilities
  return message;
}
```

All smart functions receive a `context` object with a `runtime` property that identifies the execution environment (for example, `"data-preparation"` or `"streaming-analytics"`). Different implementations may add additional functions and properties to the context for component-specific functionality.

### Asynchronous operations {#asynchronous-operations}

You can define smart functions as `async` to support asynchronous operations:

```javascript
export async function onMessage(message, context) {
  const result = await someAsyncOperation(message);
  return result;
}
```

The system automatically handles both synchronous and asynchronous function signatures. Async functions should return promises that resolve to the expected output type for your implementation.

### No global state {#no-global-state}

Each invocation of your smart function runs in isolation. You must not rely on global variables or state that persists between invocations. Every execution receives fresh inputs, and any side effects outside your function's inputs and outputs are not guaranteed to persist.

This design ensures that smart functions are stateless, scalable, and predictable. If you need to maintain state (for example, counters or caches), use the context object or implementation-specific utilities provided by your component.

### Return values {#return-values}

The data your smart function returns depends on the component using it. For example:

- Data Preparation expects an array of objects.
- Streaming Analytics expects an array of block values.
- thin-edge.io expects an array of edge messages.

Always check the documentation for your specific component to understand the expected return type. 

### Error handling {#error-handling}

If your smart function throws an error, the system catches it and handles it according to component-specific policies. For example, some components may discard the input, retry the function, or log the error for inspection. You can use standard Javascript try/catch blocks to handle expected errors within your function.

```javascript
export function onMessage(message, context) {
  try {
    return processMessage(message);
  } catch (error) {
    console.error('Processing failed:', error);
    return []; // Or handle gracefully based on your needs
  }
}
