---
title: Run advanced LWM2M shell commands
description: Write binary data, send raw CoAP requests, change the serialization format, start a firmware update, or restart an LWM2M device with shell commands.
weight: 506
sector:
  - device_management
requires:
  - authentication
api:
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationCollectionResource
    method: GET
    path: /devicecontrol/operations
    title: Retrieve a list of operations
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
---

The commands in this recipe write raw bytes, bypass the LWM2M encoding, or change the whole device. Like all LWM2M shell commands, each command is the text of a `c8y_Command` operation, see [Read and write LWM2M resources with shell commands](/recipes/lwm2m-shell-resources/). All commands in this recipe work with LWM2M 1.0 and 1.1.

Before you send a command, check that the device accepts shell commands, see [To check that the device accepts shell commands](/recipes/lwm2m-shell-resources/#to-check-that-the-device-accepts-shell-commands). Write the command text as described in [Rules for the command text](/recipes/lwm2m-shell-resources/#rules-for-the-command-text).

{{< c8y-admon-caution >}}
Three commands change the device or its configuration: `serialization` changes the encoding of all later requests, `fwupdate` starts a firmware installation, and `restart` restarts the device. Send them only if you intend this change.
{{< /c8y-admon-caution >}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To send shell commands: ROLE_DEVICE_CONTROL_ADMIN
* To read the results: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the LWM2M device, `<operation_id>` for the ID of an operation, and `<path>` for an LWM2M path. For a firmware update, they use `<firmware_name>`, `<firmware_version>`, and `<firmware_url>` for the name, the version, and the URL of the firmware.

### Advanced commands {#advanced-commands}

| Command | Task | Result on success |
|---|---|---|
| `writeb <path> <hex_value>` | Write binary data, given as hexadecimal characters, to a resource | `CHANGED(204)` |
| `writeb <path> binary:<binary_id>` | Write the content of a file that is uploaded to the platform to a resource | `CHANGED(204)` |
| `coap <request_json>` | Send a raw CoAP request | A JSON object with `responseCode`, `payloadHex`, `payloadString`, and `success` |
| `serialization <format>` | Set the content format of all later requests to the device | `Serialization set` |
| `fwupdate <firmware_name>;<firmware_version>;<firmware_url>` | Start a firmware update | `Firmware update operation started` |
| `restart` | Restart the device | `CHANGED(204)` |

### To write binary data to a resource {#to-write-binary-data-to-a-resource}

Give the binary data in one of the following forms:

* As hexadecimal characters, two for each byte. The number of characters must be even.
* As `binary:` followed by the ID of a file that is uploaded to {{< product-c8y-iot >}}. The agent reads the file and writes its content to the device.

The agent uses the content format in the `binaryDeliveryEncoding` fragment of the device, or OPAQUE if the device has no such fragment, see [Advanced settings](/device-integration/lwm2m/#advanced-settings).

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `writeb` command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "writeb /3442/0/150 010A0B020F",
  "c8y_Command": {
    "text": "writeb /3442/0/150 010A0B020F"
  }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and read the result, see [To read the result of a command](#to-read-the-result-of-a-command).

### To send a raw CoAP request {#to-send-a-raw-coap-request}

A raw CoAP request bypasses the LWM2M layer. The agent does not check the request against the object model, and {{< product-c8y-iot >}} does not process the response further. Use raw CoAP requests only in exceptional cases.

Describe the request as JSON without spaces, with the following properties:

* `method`: Mandatory. One of `get`, `post`, `put`, `delete`, `fetch`, `patch`, or `ipatch`.
* `uri`: Optional. The LWM2M path, for example `/3/0/0`.
* `contentFormat` and `accept`: Optional. IANA content types, for example `application/vnd.oma.lwm2m+json`.
* `payloadHex`: Optional. The payload as hexadecimal characters.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `coap` command. In the JSON body of the operation, escape the double quotes of the CoAP request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "coap get /3/0/0",
  "c8y_Command": {
    "text": "coap {\"method\":\"get\",\"uri\":\"/3/0/0\"}"
  }
}
```

The platform returns HTTP 201. When the command is SUCCESSFUL, `c8y_Command.result` contains the CoAP response with `responseCode`, `payloadHex`, `payloadString`, and `success`.

### To change the serialization format {#to-change-the-serialization-format}

The `serialization` command sets the content format that the agent uses for all later requests to the device: `TLV`, `CBOR`, `TEXT`, `OPAQUE`, `JSON`, `SENML_JSON`, or `SENML_CBOR`. `DEFAULT` restores the standard behavior. The agent stores the format in the LWM2M configuration of the device and sends no request to the device. See also [Manage the LWM2M configuration of a device](/recipes/manage-lwm2m-configuration/).

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `serialization` command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "serialization SENML_JSON",
  "c8y_Command": {
    "text": "serialization SENML_JSON"
  }
}
```

The platform returns HTTP 201. When the command is SUCCESSFUL, its result is `Serialization set`.

### To start a firmware update {#to-start-a-firmware-update}

The `fwupdate` command takes the name, the version, and the URL of the firmware, separated by semicolons and not by spaces. The command does not send a request to the device. It creates a separate `c8y_Firmware` operation, which performs the update.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `fwupdate` command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "fwupdate <firmware_name>;<firmware_version>;<firmware_url>",
  "c8y_Command": {
    "text": "fwupdate <firmware_name>;<firmware_version>;<firmware_url>"
  }
}
```

The platform returns HTTP 201. When the command is SUCCESSFUL, its result is `Firmware update operation started`. This only means that the update started.

To find the `c8y_Firmware` operation, send a [Retrieve a list of operations](https://{{< domain-c8y >}}/api/core/#operation/getOperationCollectionResource) request with the `creationTime` of your command as `<creation_time>`:

```http
GET /devicecontrol/operations?deviceId=<device_id>&fragmentType=c8y_Firmware&dateFrom=<creation_time>
```

Follow the `c8y_Firmware` operation as described in [Update the firmware of an LWM2M device](/recipes/lwm2m-firmware-update/#to-follow-the-firmware-update).

### To restart the device {#to-restart-the-device}

The `restart` command takes no arguments. The agent executes the resource `/3/0/4` on the device.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `restart` command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "restart",
  "c8y_Command": {
    "text": "restart"
  }
}
```

The platform returns HTTP 201. When the command is SUCCESSFUL, its result is `CHANGED(204)`. The agent replaces the text of the command with `Restart Device`, so the original text is no longer in the operation.

### To read the result of a command {#to-read-the-result-of-a-command}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the status is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/recipes/send-operation/#to-follow-the-status-of-the-operation). If the status is SUCCESSFUL, `c8y_Command.result` contains the result that the table in [Advanced commands](#advanced-commands) shows.

If the status is FAILED, the `failureReason` property describes the cause. In addition to the reasons in [To read the result](/recipes/lwm2m-shell-resources/#to-read-the-result), the following reasons apply to the advanced commands:

* **Contains `Cannot parse CoAP request representation`**: The CoAP request is not valid JSON.
* **Contains `method: must not be blank`**: The CoAP request has no `method`.
* **Contains `Reading binary data failed`**: The hexadecimal value is malformed. Use an even number of hexadecimal characters.
* **Contains `No content provided to write to the device`**: The `writeb` command has no data.
* **Contains `Failed to read binary data for id`**: No file with this ID exists.
* **Contains `Unsupported serialization format`**: The format is not one of the formats listed in [To change the serialization format](#to-change-the-serialization-format).
* **Contains `Missing required parameter: firmware URL`**: The `fwupdate` command has fewer than three parts separated by semicolons.

If the status changes from EXECUTING back to PENDING, the device is not connected. The agent sends the command again when the device registers again. Do not create the command again.
