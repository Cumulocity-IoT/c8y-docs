---
weight: 40
title: Implementations
layout: redirect
---

Smart functions are available across multiple components of {{< product-c8y-iot >}}, each applying the concept to its specific domain. This page explains where smart functions are available, how they differ, and how to choose the right implementation for your use case.

### Data Preparation {#data-preparation}

**Deployed as**: Data Preparation rule

**Function name**: `onMessage`

A Data Preparation rule contains exactly one smart function, which is applied to every inbound device message that the rule matches. The function receives a `DeviceMessage` and returns an array of `CumulocityObject` or `DeviceMessage` values.

**Example use cases**:
- Parse raw device payloads and create Cumulocity measurements, events, or alarms.
- Enrich messages with additional context or calculated fields.
- Drop duplicate or malformed messages before they consume storage.
- Route messages to different processing pipelines based on content.

For detailed documentation on Data Preparation smart functions, see the Data Preparation guide.

### Streaming Analytics {#streaming-analytics}

**Deployed as**: Streaming Analytics model

**Function name**: `onInput`

A Streaming Analytics model defines a processing pipeline made up of connected blocks. Smart functions appear as custom blocks within that pipeline. The function receives the output values from the preceding blocks and returns values for the next. The context provides `getState()` and `setState()` for maintaining state across invocations within a model partition.

**Example use cases**:
- Calculate custom metrics or aggregations from real-time data streams.
- Implement domain-specific anomaly detection or threshold logic.
- Combine multiple data streams with custom fusion logic.
- Maintain running state (for example, counters or history buffers) across events.

For detailed documentation on Streaming Analytics smart functions, see the Streaming Analytics guide.

### thin-edge.io {#thin-edge-io}

**Deployed as**: thin-edge.io flow

**Function name**: `onMessage`

A thin-edge.io flow defines a message-processing pipeline on the edge device and can include one or more smart functions at different stages. Each function receives a `DeviceMessage` and returns an array of `DeviceMessage` values, allowing you to filter, transform, or enrich data locally before it leaves the device.

**Example use cases**:
- Filter or downsample high-frequency sensor data to reduce bandwidth consumption.
- Perform local anomaly detection before sending data to the cloud.
- Enrich device messages with local context or time-series calculations.
- Route messages based on local rules before cloud transmission.

For detailed documentation on thin-edge.io smart functions, see the thin-edge.io guide.
