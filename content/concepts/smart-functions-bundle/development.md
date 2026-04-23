---
weight: 50
title: Development
layout: bundle
---

This section covers the tools, patterns, and workflow for developing smart functions.

## Language and tooling

You write smart functions in **Javascript** or **TypeScript** and build them outside the platform. {{< product-c8y-iot >}} provides TypeScript type definitions to give you full type safety and editor support during development, but you are responsible for transpiling TypeScript to Javascript before uploading. The platform only accepts Javascript at deployment time.

## Function structure

Every smart function follows a consistent structure:

```javascript
export [async] function FUNCTION_NAME(input1, input2, ..., context) {
  // Your logic here
  return output;
}
```

- **`export`**: The function must be exported as a named export for the system to recognize it.
- **`async`**: Optional. Use this keyword if your function performs asynchronous operations.
- **`FUNCTION_NAME`**: Depends on the component. Check your component's documentation (for example, `onMessage`, `onInput`).
- **Input parameters**: Vary by component and documented separately.
- **`context`**: Always the final parameter. Provides runtime information and utilities.
- **Return value**: Depends on the component and should be documented in the component guide.

## TypeScript API and types

If you are using TypeScript, the system provides type definitions for smart functions. Import types from your component's package:

```typescript
// Example for Data Preparation (check actual package names)
import { DeviceMessage, DataPrepContext } from '@cumulocity/data-preparation';

export function onMessage(
  message: DeviceMessage,
  context: DataPrepContext
): DeviceMessage[] {
  // TypeScript ensures type safety
  return [message];
}
```

Check your component's documentation for the exact type definitions and import paths.

## Working with the context

The `context` object provides access to runtime information and utilities specific to your component:

```javascript
export function onMessage(message, context) {
  // Log information visible in the system
  console.log('Runtime:', context.runtime);

  // Component-specific utilities may be available on context
  // Check component documentation for details

  return message;
}
```

At minimum, `context.runtime` identifies the execution environment. Additional properties depend on the component.

## Standard library usage

Use the standard library for common tasks:

**Logging**
```javascript
console.log('Info:', message);
console.warn('Warning:', value);
console.error('Error:', error);
```

**Text encoding and decoding**
```javascript
// Convert string to UTF-8 bytes
const encoder = new TextEncoder();
const bytes = encoder.encode('Hello');

// Convert UTF-8 bytes to string
const decoder = new TextDecoder();
const text = decoder.decode(bytes);
```

**Base64 encoding and decoding**
```javascript
// Encode to Base64 (check exact API in your runtime)
const encoded = btoa('Hello'); // 'SGVsbG8='

// Decode from Base64
const decoded = atob('SGVsbG8='); // 'Hello'
```

## Including external libraries

If you need functionality beyond the standard library, you can include external Javascript libraries in your deployment package. The exact process depends on your component, but typically involves:

1. Adding the library to your project (for example, using npm).
2. Bundling or transpiling your code to include the library.
3. Uploading the bundled package to the component.

Check your component's deployment documentation for specific instructions on library inclusion and bundling.

## Development workflow

A typical development workflow looks like this:

1. **Write locally**
   Create your smart function in your local IDE with TypeScript support and your preferred tooling.

2. **Test locally (optional)**
   Some components may provide local testing tools. Check your component documentation for local testing options.

3. **Build and package**
   Transpile your TypeScript to Javascript using your preferred toolchain (for example, `tsc`, `esbuild`, or a bundler like Rollup or Webpack). Package your function along with any included libraries into a single deployable Javascript file.

4. **Deploy**
   Upload the package to your component using the UI, API, or CLI tools.

5. **Monitor and iterate**
   Use system logs to monitor execution, identify issues, and iterate on your function.

## Error handling

Use standard Javascript try/catch blocks to handle expected errors:

```javascript
export function onMessage(message, context) {
  try {
    const result = processMessage(message);
    return result;
  } catch (error) {
    console.error('Processing failed:', error);
    // Return null, throw, or handle gracefully based on requirements
    return null;
  }
}
```

If your function throws an unhandled error, the component will catch it and handle it according to its policy (for example, skip the message, log an error, or retry).

## Async operations

Use `async` and `await` for asynchronous code:

```javascript
export async function onMessage(message, context) {
  try {
    // Simulate an asynchronous operation
    const result = await someAsyncTask(message);
    return result;
  } catch (error) {
    console.error('Async operation failed:', error.message);
    return null;
  }
}

async function someAsyncTask(message) {
  // Your async logic here
  return new Promise(resolve => {
    setTimeout(() => resolve(message), 100);
  });
}
```

## Performance considerations

**Keep functions lean**
Avoid unnecessary computations or large data allocations. Remember that your function runs for every message or event processed, so optimization has a multiplier effect.

**Use stateless design**
Do not rely on global state or side effects. Write pure functions where possible, making them predictable and testable.

**Monitor with logging**
Use console logging strategically to identify performance bottlenecks. Avoid excessive logging in high-frequency code paths.

**Understand resource limits**
Remember that your function has CPU and memory constraints. Test with realistic data volumes to ensure your function completes within limits.

## Next steps

Learn how to package and deploy your smart function in [Deployment](deployment/).

See practical examples from different components in [Examples](examples/).

For component-specific details, check the documentation for your implementation (Data Preparation, Streaming Analytics, or thin-edge.io).
