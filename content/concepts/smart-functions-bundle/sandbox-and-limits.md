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

## Multi-tenant and -user safety

The sandboxing layer ensures that one smart function cannot interfere with any other smart functions whether deployed in other tenants or by other users. Each function runs with only the data and context explicitly passed to it. 

## Resource consumption limits

To prevent a single smart function from consuming all available resources and degrading the platform for others, the system enforces limits on:

**CPU time**
Smart functions must complete within a reasonable time window. Long-running computations or infinite loops will be terminated to prevent resource starvation. The exact timeout depends on the component and deployment configuration, but typical limits range from a few seconds to a minute per function invocation.

**Memory usage**
Each smart function is allocated a fixed memory budget. If your function exceeds this budget (for example, by creating very large objects or accumulating data without releasing it), execution will be terminated. The specific limit depends on your deployment and component, but you should write functions that process data efficiently without accumulating large data structures unnecessarily.
