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
| `payload` | `Uint8Array` | Yes | The message payload as bytes. Always present, even if empty. Use `TextDecoder` to decode text-based payloads, or use a [binary library](#libraries) (protobufjs, cbor2) for binary formats. |
| `transportID` | `string` | Yes | Identifier of the source transport, for example `"mqtt"`. |
| `clientID` | `string` | No | Identifier of the transport client. For MQTT, this is the MQTT client ID. |
| `topic` | `string` | Yes | The topic, path, or equivalent on the transport. For MQTT this is the MQTT topic. |
| `transportFields` | `{ [key: string]: string }` | No | Optional dictionary of transport-specific metadata. Values are strings. |
| `time` | `Date` | No | Timestamp the message was received by the platform. |

### ExternalId {#external-id}

An `ExternalId` identifies a {{< product-c8y-iot >}} object by one of its external IDs. For details on external IDs, see [External IDs](https://cumulocity.com/api/core/#tag/External-IDs) in the {{< openapi >}}.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `externalId` | `string` | Yes | The external ID, for example, `"pump-17"`. |
| `type` | `string` | Yes | The type of the external ID, for example, `"c8y_Serial"`. |

### {{< product-c8y-iot >}} objects {#cumulocity-objects}

When you return objects from `onMessage`, you return one of five domain object types: `Measurement`, `Event`, `Alarm`, `Operation`, or `ManagedObject`. All five share the same common fields and differ only in their payload structure.

#### Common fields {#common-fields}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `string` | Yes | Discriminator for the object type. One of: `"measurement"`, `"event"`, `"alarm"`, `"operation"`, `"managedObject"`. |
| `payload` | `object` | Yes | The object data, in the same shape as the {{< product-c8y-iot >}} REST API, but without the source field. These are described for each type below. |
| `externalSource` | [`ExternalId[]`](#external-id) | Yes | One or more external IDs (externalId and type pair) identifying the target device. The platform looks these up to find the {{< product-c8y-iot >}} device. |
| `destination` | `string` | No | Advanced. Destination for the object. Defaults to `"cumulocity"`, to create the object in the operational store. |

#### Measurement {#measurement}

A measurement payload includes sensor data as numeric values. Each measurement has a type and one or more fragments (object properties mapping series names to numeric values and units).

| Payload field | Type | Required | Description |
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

An event records an occurrence or state change. Event payloads typically include a type, timestamp, and human-readable description.

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The event type (for example, `"c8y_LocationUpdate"`). |
| `text` | `string` | Yes | A human-readable description. |
| `time` | `Date` | Yes | The event timestamp. |
| `[fragment: string]` | `any` | No | Optional custom or standard fragments (for example, `c8y_Position`). |

#### Alarm {#alarm}

An alarm represents an error or alert condition. Alarm payloads include a severity level and optional context fragments.

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The alarm type. |
| `severity` | `"CRITICAL"` \| `"MAJOR"` \| `"MINOR"` \| `"WARNING"` | No | The alarm severity level. |
| `status` | `"ACTIVE"` \| `"ACKNOWLEDGED"` \| `"CLEARED"` | No | The status of the alarm. |
| `text` | `string` | No | A human-readable description. |
| `time` | `Date` | No | The alarm timestamp. |

When Data Preparation sends an `Alarm`, the platform applies upsert API behavior equivalent to [Create or update an alarm](https://cumulocity.com/api/core/#operation/postAlarmUpsertResource).

- If an alarm with the same device (identified via `externalSource`, see [Common fields](#common-fields)) and `type` exists and its status is not `"CLEARED"`, the existing alarm is updated and the count is incremented. Custom fragments that are set to null will be deleted. Other fragments that are set to null or omitted, will retain their existing values.
- If no matching non-cleared alarm exists, a new alarm is created. On create, if omitted or set to null, `severity` defaults to `"MAJOR"`, `status` defaults to `"ACTIVE"`, and `time` defaults to the current time.

#### Operation {#operation}

An operation represents a request to perform an action on a device, such as restart or firmware update. Operations are typically used for device control.

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `"PENDING"` \| `"SUCCESSFUL"` \| `"FAILED"` \| `"EXECUTING"` | No | The operation status. |
| `description` | `string` | No | Human-readable description. |
| `[fragment: string]` | `any` | No | Custom fragments (for example, `c8y_Restart` to issue a restart operation). |

#### Managed object {#managed-object}

A managed object update applies an update to an existing managed object (MO) in the {{< product-c8y-iot >}} inventory. Use this type to update managed object details and custom fragments on a device or asset.

The external ID you provide in `externalSource` is used to identify the target managed object. If no managed object exists for that external ID, the platform creates one before it applies the update. If the rule defines `onDeviceCreate`, that function decides what the platform creates, or whether it creates nothing and drops the update. For details on device creation, see [Device onboarding](/data-preparation/device-onboarding/).

Every field in the Managed Object API is optional, so you only need to include the fields you want to change. To remove a fragment, set its value to `null`.

{{< c8y-admon-important >}}
Managed object updates are designed for updating existing managed objects, not as the primary way to create new managed objects. The `ManagedObject` type does not have the ability to make hierarchy changes (for example, assigning child devices or assets). To control what the platform creates for a new managed object, including its hierarchy, use `onDeviceCreate`. For details, see [Device creation](#function-device-create).
{{< /c8y-admon-important >}}

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | No | The display name of the managed object. |
| `owner` | `string` | No | The owner of the managed object. |
| `type` | `string` | No | The managed object type. |
| `c8y_IsDevice` | `{}` | No | Marks the managed object as a device. Set to an empty object to add this marker. Set to `null` to remove it. |
| `c8y_SupportedOperations` | `string[]` | No | List of operation types the device supports. |
| `[fragment: string]` | `any` | No | Any custom fragment to add, update, or remove. Set to `null` to remove a fragment. |

### Objects to create {#objects-to-create}

When you return objects from `onDeviceCreate`, each object has one of three types: `CreateDevice`, `CreateAsset`, or `CreateGroup`. One array can contain objects of all three types. The `cumulocityType` field identifies the type. The platform adds the marker fragments of each type, so you do not set them yourself. For details on the function, see [Device creation](#function-device-create).

| Type | `cumulocityType` | Fragments the platform adds automatically |
|-------|------|-------------|
| `CreateDevice` | `"device"` | `c8y_IsDevice` and `com_cumulocity_model_Agent`. |
| `CreateAsset` | `"asset"` | `c8y_IsAsset` and `c8y_IsDeviceGroup`. |
| `CreateGroup` | `"group"` | `c8y_IsDeviceGroup`, and the type `c8y_DeviceGroup`, or `c8y_DeviceSubgroup` if the group has a parent. |

You name a parent by its [`ExternalId`](#external-id).

#### CreateDevice {#create-device}

A device to create.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `"device"` | Yes | Identifies the object as a device. Must be `"device"`. |
| `externalSource` | [`ExternalId[]`](#external-id) | No | The external IDs to register for the device. A device with no external IDs cannot be named as a parent. |
| `payload` | `object` | Yes | The fields of the new device. See below. |
| `parentDevice` | [`ExternalId`](#external-id) | No | The parent device: an existing device, or a device listed earlier in the returned array. The platform adds the new device to the child devices of the parent. |
| `parentAssets` | [`ExternalId[]`](#external-id) | No | The parent assets or groups: existing ones, or ones listed earlier in the returned array. The platform adds the new device to the child assets of each parent. |

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | No | The display name of the device. |
| `type` | `string` | No | The device type. |
| `owner` | `string` | No | The owner of the device. The owner must be a user in the tenant. If not set, the owner is the service user of the Data Preparation microservice that creates the device. |
| `requiredAvailability` | `number` | No | The number of minutes without data after which {{< product-c8y-iot >}} reports the device as unavailable. Must be a whole number. |
| `[fragment: string]` | `any` | No | Any custom fragment. |

#### CreateAsset {#create-asset}

An asset to create, for example, a site or a building.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `"asset"` | Yes | Identifies the object as an asset. Must be `"asset"`. |
| `externalSource` | [`ExternalId[]`](#external-id) | No | The external IDs to register for the asset. An asset with no external IDs cannot be named as a parent. |
| `payload` | `object` | Yes | The fields of the new asset. See below. |
| `parentAssets` | [`ExternalId[]`](#external-id) | No | The parent assets or groups: existing ones, or ones listed earlier in the returned array. The platform adds the new asset to the child assets of each parent. |

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | The asset type. |
| `name` | `string` | No | The display name of the asset. |
| `owner` | `string` | No | The owner of the asset. The owner must be a user in the tenant. If not set, the owner is the service user of the Data Preparation microservice that creates the asset. |
| `[fragment: string]` | `any` | No | Any custom fragment. |

#### CreateGroup {#create-group}

A group to create.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cumulocityType` | `"group"` | Yes | Identifies the object as a group. Must be `"group"`. |
| `externalSource` | [`ExternalId[]`](#external-id) | No | The external IDs to register for the group. A group with no external IDs cannot be named as a parent. |
| `payload` | `object` | Yes | The fields of the new group. See below. |
| `parentAssets` | [`ExternalId[]`](#external-id) | No | The parent assets or groups: existing ones, or ones listed earlier in the returned array. The platform adds the new group to the child assets of each parent. |

| Payload field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | No | The display name of the group. |
| `owner` | `string` | No | The owner of the group. The owner must be a user in the tenant. If not set, the owner is the service user of the Data Preparation microservice that creates the group. |
| `[fragment: string]` | `any` | No | Any custom fragment. |

