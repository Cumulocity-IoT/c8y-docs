---
weight: 30
title: Sandbox and limits
layout: bundle
---

Smart functions run in a sandboxed environment designed to protect your data, ensure platform stability, and prevent resource abuse. This section explains the security model and constraints that apply to all smart function implementations.

## Sandboxing and isolation

Every smart function executes in a confined environment with strict access controls:

**No filesystem access**
Your smart function cannot read, write, or delete files on the host system. If your function needs to work with file-like data, you must operate on it in memory using the standard library or data passed as input.

**No network socket access**
Smart functions cannot open direct network connections to external services. This prevents data exfiltration and ensures that all outbound communication is controlled by the platform.

**No access to other tenants' data**
If your {{< product-c8y-iot >}} instance hosts multiple tenants, each smart function runs with strict tenant isolation. Your function cannot access data, configurations, or state belonging to other tenants, even if you could guess their identifiers.

**Limited system resource access**
Smart functions cannot read environment variables, access the host clock in ways that compromise security, or interact with the operating system in privileged ways.

## Multi-tenant safety

The sandboxing layer ensures that smart functions deployed by one tenant cannot interfere with smart functions or data from other tenants. Each function runs with only the data and context explicitly passed to it. This multi-tenant isolation is mandatory and non-negotiable.

## Resource consumption limits

To prevent a single smart function from consuming all available resources and degrading the platform for others, the system enforces limits on:

**CPU time**
Smart functions must complete within a reasonable time window. Long-running computations or infinite loops will be terminated to prevent resource starvation. The exact timeout depends on the component and deployment configuration, but typical limits range from a few seconds to a minute per function invocation.

**Memory usage**
Each smart function is allocated a fixed memory budget. If your function exceeds this budget (for example, by creating very large objects or accumulating data without releasing it), execution will be terminated. The specific limit depends on your deployment and component, but you should write functions that process data efficiently without accumulating large data structures unnecessarily.

## What smart functions can do

Within these constraints, smart functions have significant power:

- Process and transform input data using all available ECMAScript 2023 language features.
- Perform calculations, filtering, aggregation, and complex logic on inputs.
- Call included standard library functions (console, Base64, text encoding).
- Use synchronous or asynchronous patterns as supported by your component.
- Return structured data to be handled by the next step in the processing pipeline.

## Security best practices

When writing smart functions, keep these practices in mind:

**Validate all inputs**
Never assume that input data is safe, well-formed, or trustworthy. Validate and sanitize data before using it in logic or passing it downstream.

**Avoid blocking operations**
Use async/await instead of blocking calls when possible. This keeps your function responsive and allows the platform to process other requests while yours is waiting.

**Keep functions focused**
A smart function with a single responsibility is easier to understand, test, and secure. Avoid trying to do too much in one function.

**Monitor performance**
Use console logging to track function execution and identify performance bottlenecks. Logs are available in the system and help with debugging and optimization.

## Compliance and audit

All smart function executions are subject to the same audit and compliance requirements as other platform operations. Logs, errors, and invocations may be retained for audit purposes according to your tenant's retention policies.

## Next steps

Learn which implementations of smart functions are available and how they differ in [Implementations](#implementations).

Get started developing your own smart function in [Development](#development).
