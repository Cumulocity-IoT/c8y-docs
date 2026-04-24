---
weight: 10
title: Overview
layout: redirect
---

### What are smart functions in Data Preparation? {#what-are-smart-functions}

Smart functions are custom Javascript functions that run within a Data Preparation rule to transform and process incoming device messages. Each Data Preparation rule contains exactly one smart function that is invoked for every message matching the rule's conditions.

A smart function receives a device message (which may be raw binary data from a transport like MQTT or OPC UA) and returns an array of Cumulocity objects (measurements, events, alarms, operations) or transformed device messages to forward to other rules.

### Why use smart functions? {#why-use-smart-functions}

Smart functions provide several key benefits:

**Flexible data transformation**: Parse raw device payloads in any format (binary, JSON, protobuf, CBOR) and map them to Cumulocity domain objects with full control over the transformation logic.

**Reduced development time**: Implement custom message processing without building, deploying, and managing a separate microservice.

**Embedded libraries**: Access standard libraries like TextDecoder, Base64, and specialized libraries for protocol decoding (protobuf, CBOR, OPC UA).

**Unified platform**: Use the same function signature and context patterns across all Data Preparation smart functions, with consistent security and performance guarantees.

**Link to general concept**: For an overview of smart functions across {{< product-c8y-iot >}} components, see [Smart functions](/concepts/smart-function-concept/).

### Key concepts {#key-concepts}

**Function invocation**: Your smart function's `onMessage` method is called once for each device message that matches the Data Preparation rule's device or topic conditions.

**Input**: A `DeviceMessage` object containing the raw payload (as bytes), transport information (MQTT topic, OPC UA path), and metadata about the source.

**Output**: An array of `CumulocityObject` instances (measurement, event, alarm, operation) or `DeviceMessage` instances. Returning an empty array drops the message without creating anything in Cumulocity.

**State**: Data Preparation smart functions are stateless—each invocation is independent. If you need to maintain state across messages (for example, calculating a moving average), you must store state externally or implement stateless aggregation.

### Limitations {#limitations}

- Each Data Preparation rule contains exactly one smart function
- Functions are sandboxed and cannot access external services directly
- Execution time is limited to prevent performance impact
- Memory usage is constrained to prevent resource exhaustion
- Functions run synchronously and must complete within the time limit

