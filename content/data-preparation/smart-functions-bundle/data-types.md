---
weight: 30
title: Data types
layout: redirect
---

This section describes the data types you receive as inputs and produce as outputs. These types are shared across all Data Preparation smart functions.

For type-safe development, the same types are available as TypeScript declarations in the published API package. See [API reference](#api-reference) for details.

### DeviceMessage {#device-message}

A `DeviceMessage` represents a message received from (or to be sent to) a device transport.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `payload` | `Uint8Array` | Yes | The message payload as bytes. Always present, even if empty. Use `TextDecoder` to decode text-based payloads, or use a binary library (protobuf, CBOR) for binary formats. |
| `transportID` | `string` | Yes | Identifier of the source transport, for example `"mqtt"` or `"opc-ua"`. |
| `clientID` | `string` | No | Identifier of the transport client. For MQTT, this is the MQTT client ID. May be absent for broadcast messages. |
| `topic` | `string` | Yes | The topic, path, or equivalent on the transport. For MQTT this is the MQTT topic; for OPC UA it is the node path. |
| `transportFields` | `{ [key: string]: any }` | No | Optional dictionary of transport-specific metadata. For MQTT, may include QoS or retain flags. Values are strings. |
| `time` | `Date` | No | Timestamp the message was received by the platform. May be absent on outbound paths. |

### CumulocityObject {#cumulocity-object}

A `CumulocityObject` is a request to create or update a Cumulocity domain object. It is the base type returned from `onMessage`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `string` | Yes | Discriminator for the object type. One of: `"measurement"`, `"event"`, `"alarm"`, `"operation"`. |
| `payload` | `object` | Yes | The object data, in the same shape as the Cumulocity REST API, with the difference that you don't need to provide an internal `id` when using `externalSource`. |
| `externalSource` | `ExternalId[]` | Yes (usually) | One or more external IDs identifying the target device. The platform looks these up to find the Cumulocity device. Required unless an internal `id` is provided in the payload. |
| `destination` | `string` | No | Advanced. Destination for the object. Defaults to `"cumulocity"`. Other values include `"streaming-analytics"` and `"iceflow"`. |

### ExternalId {#external-id}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `externalId` | `string` | Yes | The external identifier value, for example a serial number. |
| `type` | `string` | Yes | The external identifier type, for example `"c8y_Serial"`. |

The platform looks up the device by `(externalId, type)`. If no device matches, the behavior depends on the rule configuration (in future releases this will trigger a device-creation function).

### Measurement {#measurement}

A `Measurement` extends `CumulocityObject` with `cumulocityType: "measurement"`.

```typescript
{
  cumulocityType: "measurement",
  payload: {
    type: string,
    time: Date,
    [fragment: string]: { [series: string]: MeasurementValue } | any
  },
  externalSource: ExternalId[]
}
```

A measurement payload contains:

- `type` — the measurement type (for example, `"c8y_Temperature"`).
- `time` — the measurement timestamp.
- One or more **fragments** — objects mapping series names to `MeasurementValue` for measurement series, or any custom data for other fragments.

#### MeasurementValue

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | `number` | Yes | The numeric value of the measurement. |
| `unit` | `string` | No | The unit, for example `"C"` or `"hPa"`. |

Additional custom properties on `MeasurementValue` are permitted.

### Event {#event}

An `Event` extends `CumulocityObject` with `cumulocityType: "event"`.

```typescript
{
  cumulocityType: "event",
  payload: {
    type: string,
    text: string,
    time: Date,
    [fragment: string]: any
  },
  externalSource: ExternalId[]
}
```

An event payload contains:

- `type` — the event type (for example, `"c8y_LocationUpdate"`).
- `text` — a human-readable description.
- `time` — the event timestamp.
- Optional custom or standard fragments (for example, `c8y_Position`).

### Alarm {#alarm}

An `Alarm` extends `CumulocityObject` with `cumulocityType: "alarm"`.

```typescript
{
  cumulocityType: "alarm",
  payload: {
    type: string,
    severity: "CRITICAL" | "MAJOR" | "MINOR" | "WARNING",
    text: string,
    time: Date,
    [fragment: string]: any
  },
  externalSource: ExternalId[]
}
```

An alarm payload requires:

- `type` — the alarm type.
- `severity` — one of `CRITICAL`, `MAJOR`, `MINOR`, `WARNING`.
- `text` — a human-readable description.
- `time` — the alarm timestamp.

Alarms can only be **created** through smart functions in this release. Updating existing alarms is not yet supported.

### Operation {#operation}

An `Operation` extends `CumulocityObject` with `cumulocityType: "operation"`.

```typescript
{
  cumulocityType: "operation",
  payload: {
    status?: "PENDING" | "SUCCESSFUL" | "FAILED" | "EXECUTING",
    description?: string,
    [fragment: string]: any
  },
  externalSource: ExternalId[]
}
```

Operations are typically used for device control — for example, including a `c8y_Restart` fragment to issue a restart operation to a device.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- Should we group all four output subtypes into a single "specialized output types" subsection, or keep them as siblings?
- Worth showing what a Cumulocity REST API equivalent looks like, for users coming from REST?
- Document what happens when fields are wrong type or missing — is it strict validation, or lenient coercion?
- Note about timezones in `Date` — are they always UTC?
- Note about JSON-vs-not — are we expecting users to construct plain objects, or do we provide constructors/helpers?
- Worth a small section on "common pitfalls" — for example, forgetting `externalSource`, missing required fields?
- Should we document `destination: "streaming-analytics"` and `"iceflow"` more, or leave them as advanced?
- Do we need a section on identifier handling — when to use external IDs vs internal IDs?
