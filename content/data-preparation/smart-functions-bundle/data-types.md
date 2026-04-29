---
weight: 30
title: Data types
layout: redirect
---

This section describes the data types you receive as inputs and produce as outputs in Data Preparation smart functions.

### DeviceMessage {#device-message}

A `DeviceMessage` represents a message received from a device transport.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `payload` | `Uint8Array` | Yes | The message payload as bytes. Always present, even if empty. Use `TextDecoder` to decode text-based payloads, or use a binary library (protobuf, CBOR) for binary formats. |
| `transportID` | `string` | Yes | Identifier of the source transport, for example `"mqtt"`. |
| `clientID` | `string` | No | Identifier of the transport client. For MQTT, this is the MQTT client ID. |
| `topic` | `string` | Yes | The topic, path, or equivalent on the transport. For MQTT this is the MQTT topic. |
| `transportFields` | `{ [key: string]: string }` | No | Optional dictionary of transport-specific metadata. Values are strings. |
| `time` | `Date` | No | Timestamp the message was received by the platform. |

### {{< product-c8y-iot >}} Objects {#cumulocity-objects}

When you return objects from `onMessage`, you return one of four domain object types: `Measurement`, `Event`, `Alarm`, or `Operation`. All four share the same common fields and differ only in their payload structure.

#### Common fields {#common-fields}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `string` | Yes | Discriminator for the object type. One of: `"measurement"`, `"event"`, `"alarm"`, `"operation"`. |
| `payload` | `object` | Yes | The object data, in the same shape as the {{< product-c8y-iot >}} REST API, but without the source field. |
| `externalSource` | `ExternalId[]` | Yes | One or more external IDs (externalId and type pair) identifying the target device. The platform looks these up to find the {{< product-c8y-iot >}} device. |
| `destination` | `string` | No | Advanced. Destination for the object. Defaults to `"cumulocity"`, to create the object in the operational store. |

#### Measurement {#measurement}

A measurement includes sensor data as numeric values. Each measurement has a type and one or more fragments (object properties mapping series names to numeric values and units).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The measurement type (for example, `"c8y_Temperature"`). |
| `time` | `Date` | Yes | The measurement timestamp. |
| `[fragment: string]` | `{ [series: string]: MeasurementValue }` \| `any` | No | One or more fragments mapping series names to `MeasurementValue` for measurement series, or any custom data for other fragments. |

**MeasurementValue**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | `number` | Yes | The numeric value of the measurement. |
| `unit` | `string` | No | The unit (for example, `"C"` or `"hPa"`). |

#### Event {#event}

An event records an occurrence or state change. Events typically include a type, timestamp, and human-readable description.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The event type (for example, `"c8y_LocationUpdate"`). |
| `text` | `string` | Yes | A human-readable description. |
| `time` | `Date` | Yes | The event timestamp. |
| `[fragment: string]` | `any` | No | Optional custom or standard fragments (for example, `c8y_Position`). |

#### Alarm {#alarm}

An alarm represents an error or alert condition. Alarms include a severity level and optional context fragments.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The alarm type. |
| `severity` | `"CRITICAL"` \| `"MAJOR"` \| `"MINOR"` \| `"WARNING"` | Yes | The alarm severity level. |
| `text` | `string` | Yes | A human-readable description. |
| `time` | `Date` | Yes | The alarm timestamp. |

#### Operation {#operation}

An operation represents a request to perform an action on a device, such as restart or firmware update. Operations are typically used for device control.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `"PENDING"` \| `"SUCCESSFUL"` \| `"FAILED"` \| `"EXECUTING"` | No | The operation status. |
| `description` | `string` | No | Human-readable description. |
| `[fragment: string]` | `any` | No | Custom fragments (for example, `c8y_Restart` to issue a restart operation). |

