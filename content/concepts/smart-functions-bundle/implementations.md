---
weight: 40
title: Implementations
layout: bundle
---

Smart functions are available across multiple components of {{< product-c8y-iot >}}, each applying the concept to its specific domain. This page explains where smart functions are available, how they differ, and how to choose the right implementation for your use case.

## Data Preparation

**Purpose**: Transform and filter inbound device messages before they are stored in the database.

**Function name**: `onMessage`

**When to use it**: Use Data Preparation smart functions when you need to normalize device data at ingestion time, filter out unwanted messages, enrich data with calculated fields, or route messages to specific destinations based on custom logic. This is the first processing layer for incoming data and is ideal for use cases involving data cleaning, transformation, or validation.

**Example use cases**:
- Convert sensor units (for example, Celsius to Fahrenheit) from the raw device message.
- Enrich messages with additional context or calculated fields.
- Drop duplicate or malformed messages before they consume storage.
- Route messages to different storage or processing pipelines based on content.

For detailed documentation on Data Preparation smart functions, see the Data Preparation guide.

## Streaming Analytics

**Purpose**: Apply custom logic to real-time data streams within analytics models.

**Function name**: `onInput`

**When to use it**: Use Streaming Analytics smart functions when you are building real-time analytics models and need to apply custom calculations, aggregations, or business logic that goes beyond the built-in analytics blocks. Streaming Analytics smart functions are ideal for complex computations on data streams, state management across multiple events, and integration of custom algorithms into analytics pipelines.

**Example use cases**:
- Calculate moving averages or statistical metrics across a sliding window of events.
- Implement custom anomaly detection logic tailored to your domain.
- Combine multiple data streams with custom fusion logic.
- Maintain state across multiple invocations (for example, running totals or session counters).

For detailed documentation on Streaming Analytics smart functions, see the Streaming Analytics guide.

## thin-edge.io

**Purpose**: Process messages at the edge before they are transmitted to {{< product-c8y-iot >}}.

**Function name**: `onMessage`

**When to use it**: Use thin-edge.io smart functions when you want to reduce bandwidth, enable local processing on edge devices, or perform filtering and enrichment before data leaves the device. This is ideal for IoT deployments where devices have limited connectivity or where local processing provides value (for example, triggering local alerts before cloud transmission).

**Example use cases**:
- Filter or downsample high-frequency sensor data to reduce bandwidth consumption.
- Perform local anomaly detection and alert before sending data to the cloud.
- Enrich device messages with local context or time-series calculations.
- Route messages based on local rules before cloud transmission.

For detailed documentation on thin-edge.io smart functions, see the thin-edge.io guide.

## Comparing implementations

The table below provides a quick comparison of smart functions across available implementations:

| Feature | Data Preparation | Streaming Analytics | thin-edge.io |
|---------|------------------|---------------------|--------------|
| **Primary use** | Message transformation at ingestion | Real-time stream analytics | Edge processing |
| **Function name** | `onMessage` | `onInput` | `onMessage` |
| **Input type** | Device messages | Block values from preceding analytics blocks | Edge device messages |
| **Output type** | Array of messages or objects | Array of block values | Array of edge messages |
| **State management** | Stateless per invocation | Context-based state support | Stateless per invocation |
| **Execution environment** | Cloud-hosted | Cloud-hosted | Edge device |
| **Typical latency** | Milliseconds | Milliseconds to seconds | Milliseconds |
| **Scaling** | Automatic, per platform capacity | Automatic, per model requirements | Per-device capacity |

## Choosing an implementation

Use this decision tree to select the right implementation for your scenario:

1. **Are you processing messages as they arrive in {{< product-c8y-iot >}}?**
   - Yes → Use **Data Preparation**.
   - No → Continue to step 2.

2. **Are you building a real-time analytics model with custom calculations?**
   - Yes → Use **Streaming Analytics**.
   - No → Continue to step 3.

3. **Are you processing data on edge devices before cloud transmission?**
   - Yes → Use **thin-edge.io**.
   - No → Consider whether smart functions are the right approach.

## Common patterns across implementations

All implementations share:

- **Function signature pattern**: `export [async] function FUNCTION_NAME(inputs..., context) { ... }`
- **ECMAScript 2023 support**: Use modern Javascript language features in all implementations.
- **Standard library**: TextEncoder, TextDecoder, Base64, and console logging available everywhere.
- **Sandboxing**: Security and multi-tenant isolation enforced in all implementations.
- **Resource limits**: CPU and memory constraints protect platform stability.

## Next steps

Understand the technical details and universal features in [Common features](#common-features).

Learn about security, isolation, and resource constraints in [Sandbox and limits](#sandbox-and-limits).

Start developing your first smart function in [Development](#development).
