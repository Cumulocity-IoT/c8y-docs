---
title: Manage the LWM2M configuration of a device
description: Read and replace the LWM2M configuration of a device on the LWM2M agent, section by section, for the basic settings, the servers, the connectivity, the bootstrap, and the firmware update.
weight: 501
requires:
  - authentication
---

The LWM2M agent keeps an LWM2M configuration for each registered device. It is the configuration that the **LWM2M configuration** tab in the device details shows, see [LWM2M configuration](/device-integration/lwm2m/#lwm2m-configuration). The configuration has the following sections:

* `basic`: General device settings, for example the awake time, the serialization format, and the event log level.
* `servers`: The servers that the bootstrap server writes to the device.
* `connectivity`: The security settings of the bootstrap connection and of the server connection.
* `bootstrap`: The bootstrap settings, for example the bootstrap server ID and the security instance offset.
* `firmware`: The firmware update settings.

All requests go to the LWM2M agent and start with `/service/lwm2m-agent/v1/device/<device_id>/configuration`, where `<device_id>` is the managed object ID of the LWM2M device. To register a device, see [Register an LWM2M device](/skills/device-management/register-lwm2m-device/).

{{< c8y-admon-important >}}
A PUT or POST request replaces the stored section with exactly the body that you send. There is no partial update. Always read the section first, change only the fields that you want to change, and send the complete section back.
{{< /c8y-admon-important >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the configuration: ROLE_INVENTORY_READ or ROLE_LWM2M_READ
* To change the configuration: ROLE_INVENTORY_ADMIN, ROLE_INVENTORY_CREATE, or ROLE_LWM2M_ADMIN
{{< /c8y-admon-req >}}

### To read the basic settings {#to-read-the-basic-settings}

Send a GET request for the `basic` section to the LWM2M agent:

```http
GET /service/lwm2m-agent/v1/device/<device_id>/configuration/basic
```

The agent returns HTTP 200 and the section with the following properties:

* `id`: The identity of the device, with `deviceId`, `endpointId`, and `tenantId`.
* `endpointId`: The endpoint client ID of the device.
* `awakeTime`: The time in milliseconds for which the device is awake after a registration or a registration update. `0` means that the device is always online. See [LWM2M client awake time](/device-integration/lwm2m/#lwm2m-client-awake-time).
* `requestTimeout`: The timeout of requests to the device.
* `serializationFormat`: TLV, CBOR, TEXT, OPAQUE, JSON, SENML_JSON, SENML_CBOR, or DEFAULT.
* `binaryEncoding`: OPAQUE, TLV, JSON, or TEXT.
* `logLevel`: NONE, LIFECYCLE, or VERBOSE.
* `useTimestampResources`, `keepOldValuesOnOperationFail`, `disableObjectInstanceActions`, `autoManageAvailabilityRequiredInterval`, and `useLegacyEventDateFormat`: Boolean switches.

The response leaves out fields without a value. For the meaning of the settings, see [Advanced settings](/device-integration/lwm2m/#advanced-settings).

If the agent returns HTTP 404, no device with this ID exists, or the device is not an LWM2M device. If it returns HTTP 400, the ID is malformed.

### To change the basic settings {#to-change-the-basic-settings}

Send a PUT request with the complete section that you read, with your changes. The example sets the awake time to 2 minutes and the event log level to VERBOSE:

```http
PUT /service/lwm2m-agent/v1/device/<device_id>/configuration/basic
Content-Type: application/json
Accept: application/json

{
  "endpointId": "<endpoint_id>",
  "awakeTime": 120000,
  "useTimestampResources": false,
  "keepOldValuesOnOperationFail": true,
  "serializationFormat": "DEFAULT",
  "binaryEncoding": "OPAQUE",
  "disableObjectInstanceActions": false,
  "autoManageAvailabilityRequiredInterval": true,
  "logLevel": "VERBOSE",
  "useLegacyEventDateFormat": false
}
```

The agent ignores an `id` in the body and keeps the identity of the device.

The agent returns HTTP 200 and the stored section with your values. To verify the change, read the section again. It contains exactly the values that you sent.

If the agent returns HTTP 400, a value is invalid, for example a `logLevel` that is not NONE, LIFECYCLE, or VERBOSE. The error response names the field.

### To read the other sections {#to-read-the-other-sections}

Send a GET request for the section, where `<section>` is `servers`, `connectivity`, `bootstrap`, or `firmware`:

```http
GET /service/lwm2m-agent/v1/device/<device_id>/configuration/<section>
```

The agent returns HTTP 200 and the section. As for the basic settings, the response leaves out fields without a value:

* `servers`: An array of server entries. Each entry has an `id` (a UUID), `uri`, `bootstrap`, `shortServerId`, `security`, `registrationLifetime`, `defaultMinPeriod`, `defaultMaxPeriod`, `bindingMode` (U or UQ), `storeNotifications`, `disableTimeout`, and `acl`. The `security` object contains the security `mode` and, depending on the mode, the PSK or X.509 settings.
* `connectivity`: An object with `bootstrapConnectivity` and `serverConnectivity`. Both have the same structure as the `security` object of a server entry.
* `bootstrap`: An object with `bootstrapServerId`, `securityInstanceOffset`, `useDiscoverToVerifyConfiguration`, `bootstrapSerializationFormat`, and the arrays of LWM2M paths `bootstrapDelete` and `bootstrapRead`.
* `firmware`: An object with `firmwareDeliveryMethod` (PUSH, PULL, or BOTH), `supportedDeviceProtocol` (COAP, COAPS, HTTP, or HTTPS), `resetMethod` (PACKAGE or PACKAGE_URI), `resetStateMachineOnStart`, `disableFirmwareStateMachine`, and `failOnStateAndResultIncompatibility`.

If the agent returns HTTP 404, the device does not exist.

### To replace the connectivity, bootstrap, or firmware section {#to-replace-the-connectivity-bootstrap-or-firmware-section}

Send a PUT request with the complete section to `/service/lwm2m-agent/v1/device/<device_id>/configuration/<section>`, where `<section>` is `connectivity`, `bootstrap`, or `firmware`. The example makes the device download new firmware itself over CoAP:

```http
PUT /service/lwm2m-agent/v1/device/<device_id>/configuration/firmware
Content-Type: application/json
Accept: application/json

{
  "firmwareDeliveryMethod": "PULL",
  "supportedDeviceProtocol": "COAP",
  "resetMethod": "PACKAGE_URI",
  "resetStateMachineOnStart": true,
  "disableFirmwareStateMachine": false,
  "failOnStateAndResultIncompatibility": false
}
```

If the section that you read contains an `id`, send it back unchanged.

The agent returns HTTP 200 and the stored section. For the meaning of the firmware settings, see [LWM2M device firmware update](/device-integration/lwm2m/#firmware-update).

To delete the connectivity section, send a DELETE request:

```http
DELETE /service/lwm2m-agent/v1/device/<device_id>/configuration/connectivity
```

The agent returns HTTP 200.

If the agent returns HTTP 400, the validation of the section failed. The error response names the field. If it returns HTTP 404, the device does not exist.

### To add, replace, or delete a server {#to-add-replace-or-delete-a-server}

The `servers` section is a list. You change it one entry at a time. The examples use `<server_id>` for the `id` of a server entry and `<server_uri>` for the URI of the server.

* To add a server, send a POST request with one complete server entry without `id`:

    ```http
    POST /service/lwm2m-agent/v1/device/<device_id>/configuration/servers
    Content-Type: application/json
    Accept: application/json

    {
      "uri": "<server_uri>",
      "bootstrap": false,
      "shortServerId": 2,
      "security": {
        "mode": "NO_SEC"
      },
      "registrationLifetime": 3600,
      "bindingMode": "U"
    }
    ```

* To replace a server, read the `servers` section, change the entry, and send the complete entry in a PUT request to `/service/lwm2m-agent/v1/device/<device_id>/configuration/servers/<server_id>`.
* To delete a server, send a DELETE request:

    ```http
    DELETE /service/lwm2m-agent/v1/device/<device_id>/configuration/servers/<server_id>
    ```

The agent returns HTTP 200. For POST and PUT requests, the response contains the stored server entry.

If the agent returns HTTP 400, the validation failed, and the error response names the field. If it returns HTTP 404, the device or the server entry with `<server_id>` does not exist.

The configuration belongs to the device registration. When you delete the device registration, the agent deletes the configuration too.
