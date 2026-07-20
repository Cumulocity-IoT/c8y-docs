---
weight: 60
title: Runtime behavior and limits
layout: redirect
---

This section covers the execution environment your smart function runs in: how it is invoked, what guarantees the platform makes about ordering and concurrency, what limits apply, and what happens when things go wrong.

For the cross-component view of sandboxing and resource limits that applies to all smart functions, see [Sandbox and limits](/concepts/smart-function-concept/#sandbox-and-limits). This section adds Data Preparation-specific detail.

### Execution model {#execution-model}

Each Data Preparation rule runs across multiple shards to scale throughput. Within each shard, the platform maintains its own independent Javascript runtime for the rule.

**Sharding key**: The shard is determined by the device's `clientID`.

**Per-shard guarantees**:

- Within a single shard, smart function invocations are strictly serial and processed in arrival order.
- For a given `clientID`, the platform guarantees end-to-end serial, in-order execution: a message is fully processed before the next one starts.
- Across shards, invocations run concurrently. There is no ordering guarantee between different `clientID`s.

**Per-shard runtime isolation**:

- Each shard has its own Javascript runtime instance. Code loaded in one shard is not visible in another, even for the same rule.
- The platform may reinstantiate runtimes at any time --- for example, after rule updates, scaling events, or recovery from errors.
- This is the reason global state is not shared across invocations: even if your code runs back-to-back for the same `clientID`, the runtime may have been reinstantiated between calls.

### State handling {#statelessness}

Smart functions must not rely on global Javascript state to persist data between invocations.

- Top-level `let`, `const`, and `var` declarations may be reset between calls. Do not store mutable data in them.
- Module-level objects (caches, counters) are unreliable because runtimes can be recreated at any time.
- Static configuration loaded once at module load is acceptable, as long as you accept it may be reloaded at any time.

If you need state across messages, persist it externally (for example, by emitting it as a {{< product-c8y-iot >}} object).

### Synchronous vs. asynchronous functions {#sync-vs-async}

You can declare your smart function as synchronous or `async`. The platform handles both forms:

- **Synchronous**: returns an array directly. 
- **Asynchronous**: returns a `Promise` that resolves to an array. This promise will be immediately resolved. Use for calling libraries which use an async API.

Even when async, the function executes serially within its shard. The platform waits for the promise to resolve before moving to the next message in the same shard. Async does not give you parallelism within a shard.

### Error handling {#error-handling}

If your function throws synchronously, the returned promise rejects, or the return values are not parseable:

- The message that caused the error is dropped.
- An error is logged with the function name, error message, and (where possible) stack trace.
- An alarm is raised on the tenant with the failing device message and the error.
- The platform does not retry the message.
- The shard continues processing the next message.

To drop a message without raising an error, return an empty array (`[]`).

### Logs {#logs}

All output written with `console.log`, `console.info`, `console.warn`, `console.error`, and `console.debug` is written to the Apama microservice log file. For per-tenant microservices, this log is visible in the Administration application. More details are available in the [Streaming Analytics documentation](/streaming-analytics/troubleshooting/#logfiles).

When running tests in the rule editor before deployment, all log output is also shown directly in the test UI.

### Resource limits {#resource-limits}

The platform enforces per-invocation limits to protect against runaway functions:

- **Execution time**: 1 second elapsed time per invocation. Functions that exceed this limit are terminated and the message is dropped.
- **Memory**: 100 MB per rule. This covers function compilation, input consumption, stack, processing, and output production, which implicitly limits input and output size.

When a limit is exceeded, the function is terminated mid-execution, the message is dropped, an error is logged and an alarm is raised in the tenant.

These limits are designed to protect the platform, not as a target to build towards. You should not expect to be able to consume the full limits on every function invocation within the resources deployed to the platform.

### Sandboxing {#sandboxing}

Smart functions run in a sandboxed Javascript environment. Within Data Preparation specifically:

- **No filesystem access** --- there is no `fs` or equivalent.
- **No network access** --- you cannot open sockets, perform HTTP requests, or contact external services. All I/O happens through the function's input arguments and return value.
- **No process control** --- you cannot spawn workers, threads, or subprocesses.
- **No access to other tenants' data** --- the runtime is scoped to a single tenant.
- **No access to other rules' data** --- runtimes are scoped to a single rule.
- **No access to other devices' data** --- rules execute in different contexts for each incoming device.
- **No environment variables or system info** --- `process` is not available.

For the underlying security model, see [Sandbox and limits](/concepts/smart-function-concept/#sandbox-and-limits).

### Reinstantiation and idempotency {#reinstantiation}

The platform may reinstantiate the runtime at any time, including:

- After a rule update or redeployment.
- After scaling events (shards being added or removed).
- After errors that compromise the runtime.
- During platform upgrades.

Reinstantiation never interrupts an in-progress invocation. It can only occur between the processing of two messages. It may also happen at different times across different shards --- for example, a rule redeployment may take effect on one shard before another.

When the runtime is reinstantiated, top-level code runs again. Be aware that:

- Module-load side effects may run multiple times during a function's lifetime.
- You cannot rely on top-level `console.log` calls firing exactly once.
- Initialization should be cheap and idempotent.

