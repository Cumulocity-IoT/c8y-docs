---
weight: 20
title: Processing inbound device messages
layout: redirect
---

This page describes the smart function used to process inbound messages received from devices. The function is implemented as `onMessage` in your Javascript file. It is invoked once per inbound message that matches the rule's conditions, and it returns the Cumulocity objects (measurements, events, alarms, operations) to be created or updated as a result.

A rule that processes inbound device messages may also define an [`onDeviceCreate`](#) function, which is invoked separately when a returned object refers to a device that does not yet exist. The two functions are independent: `onMessage` describes the per-message mapping, `onDeviceCreate` describes how to create the missing device.

This is currently the only purpose for which `onMessage` is supported. In future releases, additional purposes will be supported using the same function name with different signatures, including:

- Inbound device messages with reflection back to the device or other devices.
- Outbound platform events sent to devices.

A given rule will support exactly one of these purposes, configured through the rule itself.

### Purpose {#purpose}

Use this function to:

- Decode raw device payloads from any transport (MQTT, OPC UA, HTTP, and others).
- Map device data to Cumulocity domain objects.
- Enrich messages with calculated fields, lookups, or context.
- Filter or drop messages based on content.

### When the function is invoked {#when-invoked}

The function is invoked once per inbound `DeviceMessage` that matches the rule's conditions. Specifically:

- Each message arriving on a transport that matches the rule's filters (device, topic, transport) triggers exactly one invocation.
- Messages that do not match the rule's conditions never reach the function.
- The function is invoked synchronously with respect to the message --- the rule waits for the function (or its returned promise) to complete before proceeding to the next message in the same shard.

For details on how invocations are sharded and ordered, see [Runtime behavior and limits](#runtime-behavior-and-limits).

### Signature {#signature}

```typescript
export function onMessage(
  msg: DeviceMessage,
  context: DataPrepContext
): CumulocityObject[];
```

The function may also be declared `async` and return a `Promise<CumulocityObject[]>`. The platform handles both forms transparently.

```typescript
export async function onMessage(
  msg: DeviceMessage,
  context: DataPrepContext
): Promise<CumulocityObject[]>;
```

### Inputs {#inputs}

The function receives two arguments:

- `msg` --- a [`DeviceMessage`](#data-types) representing the inbound message. The `payload` is always present (as a `Uint8Array`), the `transportID` and `topic` are always present, and `clientID`, `transportFields`, and `time` may be present depending on the transport.
- `context` — a [`DataPrepContext`](#context) providing runtime metadata.

For the full list of fields available on `DeviceMessage`, see [Data types](#data-types).

### Outputs {#outputs}

The function returns an array of [`CumulocityObject`](#data-types) instances. Each object in the array is processed independently:

- Each `CumulocityObject` is created or updated in the Cumulocity operational store.
- Returning an empty array (`[]`) drops the message — no objects are created and no error is reported.
- The objects in the array may be of any subtype: `Measurement`, `Event`, `Alarm`, or `Operation`.
- Each object must specify an `externalSource` to identify the target device (or an internal `id` in the payload).

### Interaction with onDeviceCreate {#interaction-with-on-device-create}

If any returned object specifies an `externalSource` that does not match an existing device, the rule's [`onDeviceCreate`](#) function (if defined) is invoked to produce the device that should be created. Once the device exists, the original objects are applied to it.

`onDeviceCreate` and the inbound `onMessage` function are defined in the same Javascript file for the rule. They are otherwise independent — they do not share state and may run in different shards.

### Behavior notes {#behavior-notes}

**Ordering**: Within a single shard (one device's `clientID`), invocations are strictly serial and in-order. The function is never called concurrently for the same source device. See [Runtime behavior and limits](#runtime-behavior-and-limits) for details.

**Errors**: If the function throws or rejects, the message is dropped and an error is logged. The platform does not retry. To drop a message intentionally, return an empty array.

**State**: The function is stateless — it cannot rely on global variables to persist data across invocations. Any global state may be wiped between calls. Each shard has its own runtime, so even within a single device's traffic, you should not rely on globals.

### Things to consider when writing the section {#section-considerations}

<!-- Notes for the documentation team — remove before publishing. -->

- The page name reflects the purpose ("processing inbound device messages") rather than the function symbol (`onMessage`), because `onMessage` is shared across multiple purposes with different signatures.
- Should the title be more user-facing, like "Inbound device messages" or "Decoding device data"?
- Worth a small table at the top mapping purposes → function name → signature, so users coming from the API can find the right page?
- Should we describe what happens with malformed inputs (for example, what if the platform passes a message with no `clientID`)?
- Worth a side-by-side example of sync vs. async signatures?
- Add a "common patterns" subsection or just point to Examples?
- Cross-link from this page to [`onDeviceCreate`](#) (currently a placeholder anchor — page does not yet exist).
- When future purposes land, decide naming convention: `function-inbound-with-reflection.md`, `function-outbound-platform-events.md`, etc.
- Be clear that within a single rule, only one inbound/outbound purpose is in effect, but `onDeviceCreate` is always co-resident.

- How do we want to handle migration when function variants 2/3/4 land — rename this page, or leave it as the inbound-only definition?
- Consider adding a diagram showing the message lifecycle from transport → rule conditions → smart function → operational store.
- Note about idempotency: if the function is retried due to platform-level failure (not Javascript errors), what guarantees apply?
- Note about message size limits and what happens if `payload` is unusually large.
