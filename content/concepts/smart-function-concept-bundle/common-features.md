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

Smart functions run in a Javascript runtime and support **ECMAScript 2023** features. Some components allow you to write Javascript code directly within the platform in the {{< product-c8y-iot >}} UI. Alternatively, you can write and transpile your code outside the platform—using Javascript directly or TypeScript with your own build toolchain—and upload the resulting Javascript file for execution.

Supported language features include:

- Arrow functions, destructuring, spread operators, and other modern syntax
- Template literals, classes, modules, and more

### Standard library {#standard-library}

In addition to the standard library features within the ES2023 standard, all smart functions also provide a Console API: `console.log()`, `console.info()`, `console.warn()`, `console.error()`, and `console.debug()` for logging messages visible in the system.

Some components may provide other libraries in addition depending on the needs of that component.

These utilities are sufficient for most common tasks. If you need additional functionality, you can deploy additional libraries with all smart functions via transpilation when you write your code outside of the platform. On a per-component-basis it may also be possible to provide further libraries that can be included at runtime within the Javascript.

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

The system automatically handles both synchronous and asynchronous function signatures. Async functions should return promises that resolve to the expected output type for your implementation. By default, no unfulfilled promises can be created within a smart function runtime, so use of async is purely for convenience with APIs, they cannot actually run asynchronously. Some implementations may provide true asynchronous operations.

### No global state {#no-global-state}

Each invocation of your smart function runs in isolation. You must not rely on global variables or state that persists between invocations. Every execution receives fresh inputs, and the system does not guarantee that any side effects outside your function's inputs and outputs will persist.

This design ensures that smart functions are stateless, scalable, and predictable. If you need to maintain state (for example, counters or caches), use implementation-defined functions on the context object provided by your component.

### Return values {#return-values}

The data your smart function returns depends on the component using it. For example:

- Data Preparation expects an array of objects.
- Streaming Analytics expects an array of block values.
- thin-edge.io expects an array of edge messages.

Always check the documentation for your specific component to understand the expected return type. 

### Error handling {#error-handling}

If your smart function throws an error, the system catches it and handles it according to component-specific policies. For example, some components may discard the input, retry the function, log the error for inspection, or raise an alarm in the tenant. You can use standard Javascript try/catch blocks to handle expected errors where you have a recovery strategy.

```javascript
export function onMessage(message, context) {
  const deviceList = JSON.parse(new TextDecoder().decode(message.payload));
  const results = [];
  
  for (const device of deviceList) {
    try {
      results.push(parseMeasurementData(device.data));
    } catch (error) {
      console.warn(`Skipping device ${device.id}: ${error.message}`);
      // Skip this device and continue with the next
    }
  }
  
  return results;
}
```

Only catch errors when you have a meaningful recovery path. In this example, the recovery strategy is to skip the failed device but continue processing others. If there is no recovery strategy, let the error propagate --- the component will handle it appropriately.
