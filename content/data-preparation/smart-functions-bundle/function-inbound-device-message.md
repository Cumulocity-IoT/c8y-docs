---
weight: 20
title: Inbound device messages
layout: redirect
---

This page describes the smart function used to process inbound messages received from devices. The function is implemented as `onMessage` in your Javascript file. It is invoked once per inbound message that matches the rule's conditions, and it returns the {{< product-c8y-iot >}} objects (measurements, events, alarms, operations) to be created or updated as a result.

### Purpose {#purpose}

Use this function to:

- Decode raw device payloads from a device transport (currently only MQTT service is supported).
- Map device data to {{< product-c8y-iot >}} domain objects.
- Enrich messages with calculated fields, lookups, or context.
- Filter or drop messages based on content.

### Signature {#signature}

```typescript
export function onMessage(
  msg: DeviceMessage,
  context: DataPrepContext
): CumulocityObject[];
```

The function may also be declared `async` if an API being used returns a promise that is already fulfilled.

### When the function is invoked {#when-invoked}

The function is invoked once per inbound `DeviceMessage` that matches the rule's conditions. Specifically:

- Each message arriving on a transport that matches the rule's filters (device, topic, transport) triggers exactly one invocation.
- Messages that do not match the rule's conditions never reach the function.
- The function is invoked synchronously with respect to the message --- the rule waits for the function (or its returned promise) to complete before proceeding to the next message in the same shard.

For details on how invocations are sharded and ordered, see [Runtime behavior and limits](#limits).

### Inputs {#inputs}

The function receives two arguments:

- `msg` --- a [`DeviceMessage`](#device-message) representing the inbound message. The `payload` is always present (as a `Uint8Array`), the `transportID`, `topic`, `clientID` and `time` will always be present. Additional information may be present in `transportFields` depending on the transport.
- `context` — a [`DataPrepContext`](#context) providing runtime metadata.

For the full list of fields available on `DeviceMessage`, see [DeviceMessage](#device-message). For details on the context object, see [Context](#context).

### Outputs {#outputs}

The function returns an array of {{< product-c8y-iot >}} domain objects: `Measurement`, `Event`, `Alarm`, or `Operation`. Each object in the array is processed independently:

- Each object is created in the {{< product-c8y-iot >}} operational store.
- Returning an empty array (`[]`) drops the message --- no objects are created and no error is reported.
- Each object must specify an `externalSource` to identify the target device.

For the full list of domain object fields, see [{{< product-c8y-iot >}} objects](#cumulocity-objects).

### When devices are created {#when-devices-created}

If a returned object specifies an `externalSource` that does not match an existing device, that device is created automatically with a default configuration.

### Behavior notes {#behavior-notes}

**Ordering**: Within a single shard (one device's `clientID`), invocations are strictly serial and in-order. The function is never called concurrently for the same source client ID. See [Runtime behavior and limits](#limits) for details.

**Errors**: If the function throws an error or returns an unparsable object, the message is dropped, an error is logged and an alarm is raised. The platform does not retry. To drop a message intentionally, return an empty array.

**State**: The function is stateless — it cannot rely on global variables to persist data across invocations. Any global state may be wiped between calls.
