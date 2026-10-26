---
weight: 55
title: Device onboarding
layout: bundle
sector:
  - device_management
---

When a data preparation rule produces a message containing an external ID that does not yet exist in {{< product-c8y-iot >}}, the platform creates the device before it sends the message. By default, it creates a basic device and associates that external ID with it, so that your rules do not lose data due to a missing device.

To specify what the platform creates, add an `onDeviceCreate` function to the rule. The function can set the name, type, and fragments of new devices. It can place them under gateways, assets, and groups, or create nothing for clients that you do not recognize.

### Automatically created devices {#automatically-created-devices}

If a rule does not define `onDeviceCreate`, the platform creates each device with the following properties:

| Property | Value |
|----------|-------|
| `name` | `Auto generated device for {externalIdType}/{externalId}` |
| `type` | `c8y_GeneratedDeviceType` |
| `c8y_IsDevice` | `{}` |
| `com_cumulocity_model_Agent` | `{}` |

The external ID that triggered the creation is registered as an external identity for the new device.

{{< c8y-admon-info >}}
The properties of automatically created devices cannot be customized. To customize device creation, define `onDeviceCreate` in the rule. For details, see [Customizing device creation](#customizing-device-creation).
{{< /c8y-admon-info >}}

### Customizing device creation {#customizing-device-creation}

The `onDeviceCreate` function is an optional second smart function, in the same Javascript file as `onMessage`. When an output of `onMessage` names an external ID that does not exist, the platform invokes `onDeviceCreate` with the input message and the missing external ID. The platform then acts on the return value:

- **A list of objects**: The platform creates the devices, assets, and groups in the list, with the names, types, fragments, external IDs, and parents that you choose. It sends the output to the object that carries the missing external ID.
- **An empty list, `[]`**: The platform creates nothing and drops the output.

Rules without `onDeviceCreate` work as before.

For example, pump-station gateways publish on the MQTT topic `sites/<site>/<gateway>`, with readings for the sensors attached to them. The following function creates the site as an asset, the gateway under the site, and the sensors under the gateway. It creates nothing for clients that do not publish on a site topic, such as test clients:

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  // Only create devices for gateways on a site topic: sites/<siteId>/<gatewayId>
  if (!inputMsg.topic.startsWith("sites/")) {
    return [];
  }
  const siteId = inputMsg.topic.split("/")[1];
  const data = JSON.parse(new TextDecoder().decode(inputMsg.payload));

  const site = { type: "c8y_Asset", externalId: siteId };
  const gateway = { type: "c8y_Serial", externalId: inputMsg.clientID };

  return [
    {
      cumulocityType: "asset",
      externalSource: [site],
      payload: { type: "acme_site", name: "Site " + siteId }
    },
    {
      cumulocityType: "device",
      externalSource: [gateway],
      payload: { name: "Gateway " + inputMsg.clientID, type: "acme_gateway" },
      parentAssets: [site]
    },
    ...(data.sensors || []).map((s) => ({
      cumulocityType: "device",
      externalSource: [{ type: "c8y_Serial", externalId: s.id }],
      payload: { name: s.name, type: "acme_sensor" },
      parentDevice: gateway
    }))
  ];
}
```

When a second gateway on the same site reports, the site already exists, so the platform uses it rather than creating it again.

For details on the signature and the return values, see [Device creation](/data-preparation/smart-functions/#function-device-create). For details on the objects you can return, see [Objects to create](/data-preparation/smart-functions/#objects-to-create).

### How device creation works {#how-device-creation-works}

#### When onDeviceCreate is invoked {#when-ondevicecreate-is-invoked}

The platform invokes `onDeviceCreate` once for each missing external ID, in the order in which they appear in `onMessage`'s outputs. The platform does not invoke the function for a missing external ID already returned by an earlier call for the same input message. After the platform creates the objects, it knows the external ID, so later messages from that device do not invoke `onDeviceCreate`.

When `onDeviceCreate` returns `[]`, the platform does not remember the result. A later message that names the same external ID invokes `onDeviceCreate` again. The platform can then still create the device, for example, from its registration message.

If several rules produce outputs for the same missing external ID, a rule with `onDeviceCreate` takes priority over the automatic creation. If several of these rules define `onDeviceCreate`, the platform only invokes the function of the rule whose name comes first in alphabetical order. It writes a warning to the log of each of these rules.

#### How the objects are created {#how-the-objects-are-created}

The platform creates the objects from all calls for one message together, with their external IDs. Then it links the objects to their parents. Messages from other devices on the same transport wait until the creation is complete, so the more objects a call returns, the longer they wait.

If an object that `onDeviceCreate` returns has an external ID that already exists, the platform uses the existing object and does not create it again. It registers any other external IDs of the object for the existing object. If two calls for one message return the same object, the platform creates it once.

A parent must be one of the following:

- An object that already exists.
- An object listed earlier in the returned list.
- An object that another call for the same message returns.

If a parent is listed after its child in the same returned list, the platform rejects the result and creates nothing.

If a parent does not exist and no call for the message returns it, the platform creates the object without the link to that parent. It raises an alarm that names the missing parent, and never creates a parent in its place. Create the link yourself, for example, in the Device Management application.

An object does not need an external ID. However, an object with no external IDs cannot be named as a parent, and the platform can create it a second time when it retries a failed attempt.

#### When creation fails {#when-creation-fails}

The platform drops the output and raises an alarm of type `c8y_DataPrep_DeviceCreateFailure` on the rule in the following cases:

- `onDeviceCreate` throws an error.
- `onDeviceCreate` returns an invalid result.
- Creating or linking the objects fails.

The platform does not remember a failure, so the next message that names the external ID tries again. If the failed attempt created some of the objects, the platform finds and uses them, and does not create them again.

#### Managed object updates from onMessage {#managed-object-updates-and-device-creation}

A managed object update from `onMessage` is an output like any other. If its device does not exist, `onDeviceCreate` decides what the platform creates, and then the platform applies the update to the new device. This gives you two places to set the fields of a device:

| Set it in | For fields that | Examples |
|----------|-------|-------|
| `onDeviceCreate` | you set once, when the platform creates the device | Type, parents, additional external IDs, owner, and initial name |
| A managed object update from `onMessage` | change over time, and that every message with them sends | Firmware version, status, and a name that the device reports |

If both set the same fragment, the platform keeps the value from `onMessage`, because it applies the update after creation. The `onDeviceCreate` function receives only the input message, not the update.

#### One message for many devices {#one-message-for-many-devices}

A gateway message often contains readings for many sensors, so `onMessage` returns outputs for many missing external IDs. If `onDeviceCreate` returns the gateway and all of its sensors on the first call, the result already covers the external IDs of the other sensors. The platform then does not invoke `onDeviceCreate` again for the message. For an example, see [Create a gateway and its sensors](#gateway-and-sensors).

If the function returns only one device for each call, the platform invokes it once for each sensor. In this case, each sensor names a gateway that does not exist yet, so the platform creates each sensor without the link to the gateway. To avoid this, return the gateway and all of its sensors in one call.

### Ways to use onDeviceCreate {#ways-to-use-ondevicecreate}

The `inputMsg` argument is a `DeviceMessage`. Its `payload` is a `Uint8Array`, so decode JSON payloads before you use them.

#### Turn off automatic creation {#turn-off-automatic-creation}

The rule only sends data for devices that already exist:

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  return [];
}
```

#### Only create devices you recognize {#only-create-devices-you-recognize}

The following function creates devices that publish on known topics and ignores the rest. Each message from an ignored device invokes the function again. To ignore a device permanently, filter its messages in `onMessage`.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  if (!inputMsg.topic.startsWith("plant/")) {
    return [];
  }
  return [{
    cumulocityType: "device",
    externalSource: [externalId],
    payload: { name: "Plant device " + externalId.externalId }
  }];
}
```

#### Set your own name, type, and fragments {#set-your-own-name-type-and-fragments}

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  return [{
    cumulocityType: "device",
    externalSource: [externalId],
    payload: {
      name: "Pump " + externalId.externalId,
      type: "acme_pump",
      requiredAvailability: 60,
      acme_Firmware: { channel: "stable" }
      // c8y_IsDevice and com_cumulocity_model_Agent are added by the platform
    }
  }];
}
```

#### Register additional external IDs {#register-additional-external-ids}

The following function links the device to an asset tag from an enterprise resource planning (ERP) system:

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  return [{
    cumulocityType: "device",
    externalSource: [
      externalId,
      { type: "acme_AssetTag", externalId: "tag-" + externalId.externalId }
    ],
    payload: { name: "Pump " + externalId.externalId, type: "acme_pump" }
  }];
}
```

#### Wait for the registration message of the device {#wait-for-the-registration-message}

In the following example, devices describe themselves on the topic `<id>/meta`, and the function creates a device only from that message. `onMessage` must also return an output for the registration message, for example, a managed object update, so that the platform invokes `onDeviceCreate` for it. The platform drops data that arrives before the registration message.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  if (!inputMsg.topic.endsWith("/meta")) {
    return [];
  }
  const meta = JSON.parse(new TextDecoder().decode(inputMsg.payload));
  return [{
    cumulocityType: "device",
    externalSource: [externalId],
    payload: { name: meta.name, type: meta.model, c8y_Hardware: { serialNumber: meta.serial } }
  }];
}
```

#### Place a device under an existing gateway and asset {#under-an-existing-gateway-and-asset}

Name existing parents by their external IDs. If a parent does not exist, the platform creates the device without the link to that parent, and raises an alarm that names the missing parent.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  const siteId = inputMsg.topic.split("/")[1];      // for example, sites/site-3/gw-1
  return [{
    cumulocityType: "device",
    externalSource: [externalId],
    payload: { name: "Pump " + externalId.externalId, type: "acme_pump" },
    parentDevice: { type: "c8y_Serial", externalId: inputMsg.clientID },
    parentAssets: [{ type: "c8y_Asset", externalId: siteId }]
  }];
}
```

#### Create a gateway and its sensors {#gateway-and-sensors}

One call returns the gateway and all of its sensors, so the result already covers the external IDs of the other sensors. The gateway comes before the sensors, because parents come first.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  const data = JSON.parse(new TextDecoder().decode(inputMsg.payload));
  const gateway = { type: "c8y_Serial", externalId: inputMsg.clientID };
  return [
    {
      cumulocityType: "device",
      externalSource: [gateway],
      payload: { name: "Gateway " + inputMsg.clientID, type: "acme_gateway" }
    },
    ...(data.sensors || []).map((s) => ({
      cumulocityType: "device",
      externalSource: [{ type: "c8y_Serial", externalId: s.id }],
      payload: { name: s.name || s.id, type: "acme_sensor" },
      parentDevice: gateway
    }))
  ];
}
```

#### Create a device under a new asset {#device-under-a-new-asset}

If the asset already exists, the platform uses it rather than creating it again.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  const siteId = inputMsg.topic.split("/")[1];
  const site = { type: "c8y_Asset", externalId: siteId };
  return [
    {
      cumulocityType: "asset",
      externalSource: [site],
      payload: { type: "acme_site", name: "Site " + siteId }
    },
    {
      cumulocityType: "device",
      externalSource: [externalId],
      payload: { name: "Pump " + externalId.externalId, type: "acme_pump" },
      parentAssets: [site]
    }
  ];
}
```

#### Add a device to a group {#device-in-a-group}

The platform gives a group the fragment `c8y_IsDeviceGroup` and the type `c8y_DeviceGroup`, or `c8y_DeviceSubgroup` if the group has a parent.

```javascript
export function onDeviceCreate(inputMsg, externalId, context) {
  const fleet = { type: "acme_Fleet", externalId: "fleet-north" };
  return [
    {
      cumulocityType: "group",
      externalSource: [fleet],
      payload: { name: "North fleet" }
    },
    {
      cumulocityType: "device",
      externalSource: [externalId],
      payload: { name: "Truck " + externalId.externalId, type: "acme_truck" },
      parentAssets: [fleet]
    }
  ];
}
```
