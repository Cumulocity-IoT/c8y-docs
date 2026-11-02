---
weight: 25
title: Device creation
layout: redirect
---

This page describes the optional smart function that decides what the platform creates when a rule sends data for a device that does not exist yet. You implement the function as `onDeviceCreate`, in the same Javascript file as `onMessage`. If a rule does not define it, the platform creates a basic device. For details, see [Automatically created devices](/data-preparation/device-onboarding/#automatically-created-devices).

### Purpose {#device-create-purpose}

Use this function to:

- Set the name, type, owner, and fragments of new devices.
- Register additional external IDs for a device, for example, an asset tag from another system.
- Create assets and groups, and place new devices under parent devices, assets, or groups.
- Create nothing for unknown, test, or unexpected clients.

For details on how creation works, and for examples, see [Customizing device creation](/data-preparation/device-onboarding/#customizing-device-creation).

### Signature {#device-create-signature}

```typescript
export function onDeviceCreate(
  inputMsg: DeviceMessage,
  externalId: ExternalId,
  context: DataPrepContext
): (CreateDevice | CreateAsset | CreateGroup)[];
```

### When the function is invoked {#device-create-when-invoked}

The platform invokes the function when an object that `onMessage` returns has an `externalSource` that is not registered in {{< product-c8y-iot >}}. This applies to every type of object that `onMessage` returns, including managed object updates.

- The platform invokes the function once for each missing external ID, in the order in which they appear in `onMessage`'s outputs.
- The platform does not invoke the function for a missing external ID already returned by an earlier call for the same input message.
- After the platform creates and links the objects, it knows the external ID, so later messages do not invoke the function for it.
- If the function returns `[]`, the platform does not remember the result. The next message that names the same external ID invokes the function again.

### Inputs {#device-create-inputs}

The function receives three arguments:

- `inputMsg` --- the [`DeviceMessage`](#device-message) that `onMessage` processed when it returned the output with the missing external ID. The function does not receive the output itself.
- `externalId` --- the missing [`ExternalId`](#external-id).
- `context` --- the [`DataPrepContext`](#context) that `onMessage` also receives.

### Outputs {#device-create-outputs}

The function returns an array of objects to create: `CreateDevice`, `CreateAsset`, or `CreateGroup`.

- If one of the objects has the missing external ID, the platform creates any new objects and links them to their parents. It sends the output to the object with that external ID.
- If none of the objects carries the missing external ID, or the result is invalid, the platform rejects the result. It creates nothing, drops the output, and raises an alarm.
- Returning an empty array (`[]`) drops the output --- the platform creates nothing and raises no alarm.

For the full list of fields of these objects, see [Objects to create](#objects-to-create).

Invalid results include:

- Two objects in the result have the same external ID.
- An object names a parent that comes later in the result. List parents before their children.
- The `owner` of an object is not a user in the tenant.
- A group sets a `type` in its payload.
- An object sets the marker fragments of another kind of object, for example, an asset with `c8y_IsDevice`.

### Behavior notes {#device-create-behavior-notes}

**Errors**: If the function throws an error, or the platform rejects its result, the platform creates nothing and drops the output. It writes an error to the log of the rule and raises an alarm of type `c8y_DataPrep_DeviceCreateFailure` on the rule. The alarm contains the input message and the error. The next message that names the same external ID invokes the function again.

**Limits**: The function runs under the same limits as `onMessage`. For details, see [Resource limits](#resource-limits).

**State**: Like `onMessage`, the function is stateless. For details, see [State handling](#statelessness).

**Rule changes**: If you redeploy or delete the rule after `onMessage` runs and before the platform invokes `onDeviceCreate`, the platform invokes neither version of `onDeviceCreate`. It drops the output and writes a message to the log of the rule.
