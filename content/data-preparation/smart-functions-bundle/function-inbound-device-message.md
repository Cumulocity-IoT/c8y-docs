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
- Each object must specify an `externalSource` to identify the target device. The external ID must contain `msg.clientID`, see [External IDs must contain the client ID](#external-ids).

For the full list of domain object fields, see [{{< product-c8y-iot >}} objects](#cumulocity-objects).

### External IDs must contain the client ID {#external-ids}

{{< c8y-admon-important >}}
Every external ID that a smart function returns in `externalSource` must contain `msg.clientID`. An external ID that is built only from the payload or the topic allows one device to send data as another device.
{{< /c8y-admon-important >}}

A device chooses the payload and the topic of every message that it sends. A device does not choose the `clientID` of a message: the transport sets the `clientID` from the connection. If a smart function takes the external ID from a payload field such as `deviceId`, any device that can publish to the rule's topic can put the ID of another device in that field. The platform then stores the measurements, events, and alarms on the other device, and overwrites its properties if the function returns a managed object update. If no device has that external ID, the platform creates one.

Build each external ID as follows:

- **The device that sent the message**: use `msg.clientID` as the external ID.
- **A device behind the sender**, for example a sensor that reports through a gateway, or a device that names itself with a serial number in the payload or topic: use the client ID, a separator, and the ID from the message.

```javascript
// The device that sent the message
externalSource: [{ externalId: msg.clientID, type: "c8y_Serial" }]

// A device named in the payload, behind the client that sent the message
externalSource: [{ externalId: `${msg.clientID}:${data.deviceId}`, type: "c8y_Serial" }]
```

With this pattern, a client can only write to devices whose external ID starts with its own client ID. Choose a separator that does not occur in your client IDs. If the client ID `gw-1:a` exists and the separator is a colon, the client `gw-1` can produce the external ID `gw-1:a:7`, which belongs to the client `gw-1:a`.

The same rule applies to sub-devices and child devices. An ID that a gateway reports for one of its sensors is payload content, so the external ID of the sensor must also start with the client ID of the gateway.

{{< c8y-admon-info >}}
The client ID identifies a device only if the transport binds the client ID to the credentials of the device. The MQTT Service does this when a device connects with a certificate: the Common Name of the certificate must match the client ID. With basic authentication, the MQTT Service does not check which user connects with which client ID. See [Client identifiers](/device-integration/mqtt-service/#client-id) and [Authentication](/device-integration/mqtt-service/#authentication) in the MQTT Service documentation.
{{< /c8y-admon-info >}}

### When devices are created {#when-devices-created}

If a returned object specifies an `externalSource` that does not match an existing device, that device is created automatically with a default configuration. This is one reason why the external ID must contain the client ID: otherwise any device can create devices under IDs of its choice.

### Behavior notes {#behavior-notes}

**Ordering**: Within a single shard (one device's `clientID`), invocations are strictly serial and in-order. The function is never called concurrently for the same source client ID. See [Runtime behavior and limits](#limits) for details.

**Errors**: If the function throws an error or returns an unparsable object, the message is dropped, an error is logged and an alarm is raised. The platform does not retry. To drop a message intentionally, return an empty array.

**State**: The function is stateless — it cannot rely on global variables to persist data across invocations. Any global state may be wiped between calls.
