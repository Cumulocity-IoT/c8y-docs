---
title: Read and write LWM2M resources with shell commands
description: Read, write, execute, discover, create, and delete LWM2M resources on a device by sending shell commands as c8y_Command operations, and interpret the results.
weight: 504
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: getEventCollectionResource
    method: GET
    path: /event/events
    title: Retrieve all events
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
  - operation: getOperationCollectionResource
    method: GET
    path: /devicecontrol/operations
    title: Retrieve a list of operations
---

An LWM2M shell command is the text of a `c8y_Command` operation. The LWM2M agent parses the text, sends the matching LWM2M request to the device, and writes the answer of the device to the `c8y_Command.result` property of the same operation. These are the same commands that you use in the **Shell** tab of the device, see [Handling LWM2M shell commands](/device-integration/lwm2m/#handling-shell-commands).

This skill covers the commands that access resources. For observations, see [Observe LWM2M resources with shell commands](/skills/lwm2m-shell-observe/). For binary data, raw CoAP requests, and commands that change the whole device, see [Run advanced LWM2M shell commands](/skills/lwm2m-shell-advanced/).

### Rules for the command text {#rules-for-the-command-text}

The vocabulary of the commands is fixed. Write the text as follows:

* Separate the keyword and the arguments with exactly one space. Do not add spaces at the start or at the end. The agent splits the text at single spaces, so a leading space breaks the path, and a double space creates an empty argument. In both cases, the operation fails.
* Write a path with a leading slash: `/<object_id>/<instance_id>/<resource_id>`, optionally followed by `/<resource_instance_id>`. Each part is an integer from 0 to 65535, and a path has at most four parts.
* Use the path depth that the command needs, for example a resource path for `write`. The agent checks the depth when it executes the command, not when you create the operation.

The agent matches the keyword case-insensitively.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To read the registration events: ROLE_EVENT_READ
* To send shell commands: ROLE_DEVICE_CONTROL_ADMIN
* To read the results: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the LWM2M device, `<operation_id>` for the ID of the operation, and `<path>` for an LWM2M path, for example `/3/0/0`.

### To check that the device accepts shell commands {#to-check-that-the-device-accepts-shell-commands}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsLwm2mDevice` is present. Otherwise, the device is not an LWM2M device, and the commands in this skill do not apply. See [Run a shell command on a device](/skills/run-shell-command/) instead.
* The array `c8y_SupportedOperations` contains `"c8y_Command"`. The agent adds it when the device registers for the first time. If it is missing, the device has never connected, and the agent does not execute shell commands for it.

### To find the LWM2M version of the device {#to-find-the-lwm2m-version-of-the-device}

Some commands need LWM2M 1.1. The managed object does not contain the LWM2M version, but the registration events of the device do, see [Device lifecycle events](/device-integration/lwm2m/#device-lifecycle-events).

Send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request for the newest registration update:

```http
GET /event/events?source=<device_id>&type=c8y_LWM2MDeviceRegistrationUpdate&pageSize=1
```

The platform returns the newest events first. The `lwm2mVersion` property of the `c8y_LWM2MDeviceRegistrationUpdate` fragment is `1.0` or `1.1`.

If the response contains no event, repeat the request with the type `c8y_LWM2MDeviceRegistration`. If there is still no event, the device has never connected, or its event log level is NONE, see [Manage the LWM2M configuration of a device](/skills/manage-lwm2m-configuration/). Then treat the device as LWM2M 1.0.

### Resource commands {#resource-commands}

Select the command for your task:

| Command | Task | LWM2M version | Result on success |
|---|---|---|---|
| `read <path>` | Read an object, an instance, or a resource | 1.0, 1.1. A resource instance path needs 1.1. | A JSON map of the values, or `Content is null` |
| `cread <path> <path>` | Read several paths in one request | 1.1 | A JSON map of the values |
| `discover <path>` | List the resources that a path contains | 1.0, 1.1 | A list of paths, for example `[/3/0/0, /3/0/1]`, or `[]` |
| `write <path> <value>` | Write one resource | 1.0, 1.1 | `CHANGED(204)` |
| `writej <path> <json>` | Write several resources of one object instance | 1.0, 1.1 | `CHANGED(204)` |
| `cwrite <path> <value> <path> <value>` | Write several paths in one request | 1.1 | `CHANGED(204)` |
| `writep <path> <value>` | Write a resource with a CoAP POST request | 1.1 | `CHANGED(204)` |
| `execute <path> <arguments>` | Execute a resource, with optional arguments | 1.0, 1.1 | `CHANGED(204)` |
| `executelegacy <path> <text>` | Execute a resource with a plain text payload | 1.0, 1.1 | `CHANGED(204)` |
| `create /<object_id> <json>` | Create an object instance, with optional values | 1.0, 1.1 | `CREATED(201)` |
| `delete /<object_id>/<instance_id>` | Delete an object instance | 1.0, 1.1 | `DELETED(202)` |

On an LWM2M 1.0 device, the agent or the device rejects the commands that need 1.1. Do not send them.

The arguments follow these rules:

* `write`: The path must be a resource path. The value is the rest of the line. For a multi-instance resource, write the values as a JSON array, for example `[1,2]`. To write a whole object instance, use `writej`.
* `writej` and `create`: The JSON contains a `list` array. Each entry has the `id` of the resource as a number, the `type` (`s` for string, `i` for integer, `f` for float, `b` for boolean, `d` for date, `o` for opaque), and the `value`, for example `{"list":[{"id":15,"type":"s","value":"Europe/Berlin"}]}`. The path of `writej` is an object instance path. `create` without JSON creates an empty instance.
* `cwrite`: Pairs of path and value, separated by single spaces. You can put a value in double quotes.
* `execute`: The agent joins the arguments with commas. For example, `execute /3/0/4 0='a' 1='b'` sends `0='a',1='b'`. The arguments follow the arglist syntax of the LWM2M specification.
* `executelegacy`: The agent sends the text after the path unchanged, spaces included, as a plain text string.

Do not use the keyword `reads`. The agent reserves it for its firmware update.

### To send a shell command {#to-send-a-shell-command}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the command in `c8y_Command.text`. The example reads the resource `/3/0/0`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "read /3/0/0",
  "c8y_Command": {
    "text": "read /3/0/0"
  }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device does not exist or is not an agent. Check the device again, see [To check that the device accepts shell commands](#to-check-that-the-device-accepts-shell-commands).

### To read the result {#to-read-the-result}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the status is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/send-operation/#to-follow-the-status-of-the-operation). The agent sets EXECUTING before it parses the text, so EXECUTING does not mean that the command is valid.

If the status is SUCCESSFUL, `c8y_Command.result` contains the result in the form that the table in [Resource commands](#resource-commands) shows.

If the status is FAILED, the `failureReason` property describes the cause:

* **Starts with `Unexpected failure of operation. Details:`**: The agent cannot parse the command, for example because of an unknown keyword, a wrong path, or invalid JSON.
* **Contains `is not supported!`**: The keyword is not part of the vocabulary. Correct the keyword. Do not send the same text again.
* **Contains `Command string is empty`**: The text is empty, often because of an empty line in a multi-line command.
* **Contains `Missing resource path`**: The command needs a path.
* **Contains `Invalid LWM2M path`**: A part of the path is not a number, or the path has more than four parts.
* **Contains `Only resource writes are currently supported with write command`**: Use `writej` to write an object instance.
* **Contains `Invalid data provided, JSON data is expected`**: The JSON argument is not valid JSON.
* **Contains `This device doesn't support composite command operations`** or **`This device doesn't support resource instance level operations`**: The device uses LWM2M 1.0. Send single-path commands, or read the resource instead of the resource instance.
* **Starts with `Operation execution failed on device side with error code:`**: The device rejected the request. The CoAP response code follows as name and number, for example `NOT_FOUND(404)`. The command text is valid.

If the status changes from EXECUTING back to PENDING, the device did not answer, and the agent assumes that it is not connected. The agent sends the command again when the device sends its next registration or registration update. Do not create the command again. For details, see [Shell command lifecycle](/device-integration/lwm2m/#shell-command-lifecycle).

To cancel a command that is no longer needed, see [To cancel a pending operation](/skills/send-operation/#to-cancel-a-pending-operation).

### To send several commands at once {#to-send-several-commands-at-once}

Write one command per line, separated by `\n`. Lines that start with `#` are comments. Do not add empty lines, because the operation for an empty line fails with `Command string is empty`.

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Read device resources",
  "c8y_Command": {
    "text": "read /3/0/0\nread /3/0/1"
  }
}
```

The agent creates one operation for each command line, with the line in `c8y_Command.text` and in `description`. It sets the operation that you created to SUCCESSFUL with the result `Successfully divided a multi-line operation into <n> individual operations`, where `<n>` also counts the comment lines. This operation itself never reaches the device.

The new operations have no reference to the operation that you created. To find them, send a [Retrieve a list of operations](https://{{< domain-c8y >}}/api/core/#operation/getOperationCollectionResource) request with the `creationTime` of your operation as `<creation_time>`:

```http
GET /devicecontrol/operations?deviceId=<device_id>&dateFrom=<creation_time>
```

The platform returns the operations in the order of their IDs, which is the order of the lines. Read the result of each operation as described in [To read the result](#to-read-the-result).
