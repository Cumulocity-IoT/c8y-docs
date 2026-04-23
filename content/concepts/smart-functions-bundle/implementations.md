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
