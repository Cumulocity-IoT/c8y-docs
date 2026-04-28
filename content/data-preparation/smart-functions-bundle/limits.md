---
weight: 60
title: Runtime behavior and limits
layout: redirect
---

This section covers the execution environment your smart function runs in: how it is invoked, what guarantees the platform makes about ordering and concurrency, what limits apply, and what happens when things go wrong.

For the cross-component view of sandboxing and resource limits that applies to all smart functions, see [Sandbox and limits](/concepts/smart-function-concept/#sandbox-and-limits). This section adds Data Preparation–specific detail.

### Execution model {#execution-model}

Each Data Preparation rule runs across multiple shards to scale throughput. Within each shard, the platform maintains its own independent Javascript runtime for the rule.

**Sharding key**:

- For inbound messages from devices, the shard is determined by the device's `clientID`.
- For outbound messages from the platform, the shard is determined by the inventory object ID of the target device.
- Inbound and outbound traffic for the same logical device are not guaranteed to land in the same shard.

**Per-shard guarantees**:

- Within a single shard, smart function invocations are strictly serial and processed in arrival order.
- For a given `clientID` (inbound) or inventory object ID (outbound), the platform guarantees end-to-end serial, in-order execution: a message is fully processed before the next one starts.
- Across shards, invocations run concurrently. There is no ordering guarantee between different `clientID`s or different inventory object IDs.

**Per-shard runtime isolation**:

- Each shard has its own Javascript runtime instance. Code loaded in one shard is not visible in another, even for the same rule.
- This is the reason global state is not shared across invocations: even if your code runs back-to-back for the same `clientID`, the runtime may have been reinstantiated between calls, and a different shard handling the same device after a failover would have a fresh runtime.
- The platform may reinstantiate runtimes at any time — for example, after rule updates, scaling events, or recovery from errors.

### Statelessness {#statelessness}

Smart functions must not rely on global Javascript state to persist data between invocations.

- Top-level `let`, `const`, and `var` declarations may be reset between calls. Do not store mutable data in them.
- Module-level objects (caches, counters) are unreliable because runtimes can be recreated at any time.
- Static configuration loaded once at module load is acceptable, as long as you accept it may be re-loaded any time.

If you need state across messages, persist it externally (for example, by emitting it as a Cumulocity object) or use a stateful component such as Streaming Analytics.

### Synchronous vs. asynchronous functions {#sync-vs-async}

You can declare your smart function as synchronous or `async`. The platform handles both forms:

- **Synchronous**: returns an array directly. Faster to dispatch.
- **Asynchronous**: returns a `Promise` that resolves to an array. Use this when you need `await` for libraries that return promises.

Even when async, the function executes serially within its shard. The platform waits for the promise to settle before moving to the next message in the same shard. Async does not give you parallelism within a shard.

### Error handling {#error-handling}

If your function throws synchronously or its returned promise rejects:

- The message that caused the error is dropped.
- An error is logged with the function name, error message, and (where possible) stack trace.
- The platform does not retry the message.
- The shard continues processing the next message.

To drop a message without raising an error, return an empty array (`[]`).

The platform does not currently expose a dead-letter queue for failed messages. Logs are the primary diagnostic tool.

### Resource limits {#resource-limits}

The platform enforces per-invocation limits to prevent any single function from monopolizing resources:

- **CPU time**: each invocation has a maximum execution time. Functions that exceed this limit are terminated and the message is dropped. Exact value: to be confirmed.
- **Memory**: each runtime has a maximum memory budget. Functions that exceed this limit are terminated. Exact value: to be confirmed.
- **Stack depth**: there is a maximum recursion depth. Exact value: to be confirmed.
- **Output size**: the array returned from the function may have a maximum size or total byte size. To be confirmed.

When a limit is exceeded, the function is terminated mid-execution, the message is dropped, and an error is logged.

### Sandboxing {#sandboxing}

Smart functions run in a sandboxed Javascript environment. Within Data Preparation specifically:

- **No filesystem access** — there is no `fs` or equivalent.
- **No network access** — you cannot open sockets, perform HTTP requests, or contact external services. All I/O happens through the function's input arguments and return value.
- **No process control** — you cannot spawn workers, threads, or subprocesses.
- **No access to other tenants' data** — the runtime is scoped to a single tenant.
- **No access to other rules' data** — runtimes are scoped to a single rule.
- **No environment variables or system info** — `process` is not available.

For the underlying security model, see [Sandbox and limits](/concepts/smart-function-concept/#sandbox-and-limits).

### Reinstantiation and idempotency {#reinstantiation}

The platform may reinstantiate the runtime at any time, including:

- After a rule update or redeployment.
- After scaling events (shards being added or removed).
- After errors that compromise the runtime.
- During platform upgrades.

When the runtime is reinstantiated, top-level code runs again. Be aware that:

- Module-load side effects may run multiple times during a function's lifetime.
- You cannot rely on top-level `console.log` calls firing exactly once.
- Initialization should be cheap and idempotent.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- We need actual numbers for limits before publishing — placeholders marked "to be confirmed" throughout.
- Should we explain how to test/diagnose hitting a limit (logs, error messages, metrics)?
- Worth a sequence diagram showing message → shard → runtime → function?
- Note about clock skew — what `Date.now()` returns, time zone handling.
- Note about random number generation — is `Math.random()` deterministic, seeded, or true random?
- Should we list explicitly what *is* available globally? `console`, `Date`, `Math`, `JSON`, `Promise`, `TextEncoder`/`Decoder`, `atob`/`btoa`, etc.
- What happens to a long-running async function if its rule is being redeployed mid-flight? Is it aborted, or allowed to complete?
- Backpressure: what happens if messages arrive faster than the function can process them within a shard? Buffering, dropping, blocking the transport?
- How does the user observe their function's CPU/memory usage? Are there metrics or only failure logs?
- If we expose any per-function metrics (invocations, errors, latency), this might be the right place to list them.
- Does the threading detail belong here or in a more architectural section that's separate from "writing the function"? Some readers won't care; others will need it. Maybe a "for advanced readers" admonition.
