---
weight: 20
title: API reference
layout: redirect
---

### Function signature {#function-signature}

```javascript
export function onMessage(message, context) {
  // Your implementation
  return [/* array of CumulocityObject or DeviceMessage */];
}
```

### Input: DeviceMessage {#input-devicemessage}

The `DeviceMessage` object represents a message received from a device or transport protocol:

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `Uint8Array` | The message payload as bytes. Use `TextDecoder` to decode JSON or text, or use specialized libraries for binary formats. |
| `transportID` | `string` | The transport identifier (for example, "mqtt", "opc-ua", "http") indicating the protocol the message arrived through. |
| `clientID` | `string` (optional) | The transport client identifier, such as MQTT client ID or OPC UA node identifier. |
| `topic` | `string` | The message topic or path on the transport (for example, MQTT topic or OPC UA object path). |
| `transportFields` | `object` (optional) | Protocol-specific metadata. For MQTT, may include quality of service (QoS) or retain flags. |
| `time` | `Date` (optional) | The timestamp when the message was received by the platform. |

### Output: CumulocityObject {#output-cumulocityobject}

The `CumulocityObject` represents a domain object to be created or updated in Cumulocity. The base interface has the following structure:

| Field | Type | Description |
|-------|------|-------------|
| `cumulocityType` | `string` | The type of object: "measurement", "event", "alarm", or "operation". |
| `payload` | `object` | The object data specific to the type (see specialized interfaces below). |
| `externalSource` | `ExternalId[]` | Array of external IDs that identify the device. At least one is required to look up the Cumulocity device ID. |
| `destination` | `string` (optional) | Advanced: Where to send the object. Defaults to "cumulocity" for Cumulocity platform. |

### Specialized output types {#specialized-output-types}

#### Measurement

```javascript
{
  cumulocityType: 'measurement',
  payload: {
    type: 'c8y_Temperature',  // measurement type
    time: new Date(),
    c8y_Temperature: {         // measurement fragment
      T: { value: 25.5, unit: 'C' }
    }
  },
  externalSource: [{ externalId: 'device123', type: 'c8y_Serial' }]
}
```

#### Event

```javascript
{
  cumulocityType: 'event',
  payload: {
    type: 'c8y_LocationUpdate',
    text: 'Device location updated',
    time: new Date(),
    c8y_Position: {            // custom fragment
      lat: 52.5200,
      lng: 13.4050
    }
  },
  externalSource: [{ externalId: 'device123', type: 'c8y_Serial' }]
}
```

#### Alarm

```javascript
{
  cumulocityType: 'alarm',
  payload: {
    type: 'c8y_Temperature',
    severity: 'CRITICAL',
    text: 'Temperature exceeds threshold',
    time: new Date()
  },
  externalSource: [{ externalId: 'device123', type: 'c8y_Serial' }]
}
```

#### Operation

```javascript
{
  cumulocityType: 'operation',
  payload: {
    status: 'PENDING',
    c8y_Restart: {}
  },
  externalSource: [{ externalId: 'device123', type: 'c8y_Serial' }]
}
```

### Context object {#context-object}

The `context` parameter provides metadata about the execution environment:

| Field | Type | Description |
|-------|------|-------------|
| `runtime` | `string` | Always "c8y-data-preparation" for Data Preparation smart functions. |

### Behavior {#behavior}

**Invocation**: The `onMessage` function is called synchronously for each message matching the rule's conditions. The rule stops processing and waits for the function to complete before proceeding.

**Error handling**: If your function throws an error, the message is dropped and an error is logged. Return an empty array to drop a message intentionally.

**Return values**: Return an array of `CumulocityObject` or `DeviceMessage` instances. Each object in the array is processed independently:
- `CumulocityObject` instances are created/updated in Cumulocity
- `DeviceMessage` instances can be forwarded to subsequent rules or destinations

Returning an empty array (`[]`) drops the message without creating anything.

### Statefulness {#statefulness}

Data Preparation smart functions are **stateless**. Each function invocation is independent and cannot access data from previous invocations. If you need to maintain state across messages, consider:

- Using Streaming Analytics models with state management capabilities
- Pre-aggregating data externally before processing in Data Preparation
- Implementing a stateless aggregation pattern within the function (for example, calculating percentiles from a single message)

