---
title: Observe LWM2M resources with shell commands
description: Set notification attributes, start and stop observations of LWM2M resources on a device with shell commands, and check that measurements arrive.
weight: 505
sector:
  - device_management
requires:
  - authentication
api:
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
  - operation: getMeasurementCollectionResource
    method: GET
    path: /measurement/measurements
    title: Retrieve all measurements
---

When the LWM2M agent observes a resource, the device sends a notification with the value of the resource instead of waiting for a read request. Notification attributes control how often the device sends notifications. From the values, the agent creates measurements, events, or alarms as the object mapping of the resource defines, see [LWM2M device protocols](/device-integration/lwm2m/#device-protocols).

You start and stop observations with shell commands. A shell command is the text of a `c8y_Command` operation, see [Read and write LWM2M resources with shell commands](/skills/lwm2m-shell-resources/). Before you send a command, follow these steps of that skill:

* [To check that the device accepts shell commands](/skills/lwm2m-shell-resources/#to-check-that-the-device-accepts-shell-commands)
* [To find the LWM2M version of the device](/skills/lwm2m-shell-resources/#to-find-the-lwm2m-version-of-the-device)

Write the command text as described in [Rules for the command text](/skills/lwm2m-shell-resources/#rules-for-the-command-text). Use the commands in the following order:

1. Set the notification attributes with `writeattr`. Attributes that you set on an active observation only take effect when the observation is renewed.
2. Start the observation with `observe` or `cobserve`.
3. Check that measurements arrive.
4. Stop the observation with `cancelobservation`, `cancelobserve`, or `cancelCompositeObserve`.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To send shell commands: ROLE_DEVICE_CONTROL_ADMIN
* To read the results: ROLE_DEVICE_CONTROL_READ
* To read measurements: ROLE_MEASUREMENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the LWM2M device, `<operation_id>` for the ID of an operation, and `<path>` for an LWM2M path, for example `/3/0/13`.

### Observation commands {#observation-commands}

| Command | Task | LWM2M version | Result on success |
|---|---|---|---|
| `writeattr <path> <attributes>` | Set the notification attributes of a path | 1.0, 1.1 | `CHANGED(204)` |
| `observe <path>` | Observe one path | 1.0, 1.1 | A JSON map with the first value |
| `cobserve <path> <path>` | Observe several paths in one request | 1.1 | A JSON map with the first values |
| `cancelobservation <path> <path>` | Cancel a single or a composite observation with a reset message | 1.0, 1.1 | `OBSERVATION CANCELLED` |
| `cancelobserve <path>` | Cancel the observation of one path with a request to the device | 1.1 | `Observation was successfully cancelled` |
| `cancelCompositeObserve <path> <path>` | Cancel a composite observation with a request to the device | 1.1 | `Observation was successfully cancelled` |

On an LWM2M 1.0 device, the agent or the device rejects the commands that need 1.1. Do not send them.

### To set the notification attributes {#to-set-the-notification-attributes}

Write the attributes as one argument: `key=value` pairs, joined with `&`, without spaces. A space splits the argument, and the agent rejects the command. The agent uses the following attributes:

* `pmin`: The minimum time in seconds between two notifications.
* `pmax`: The maximum time in seconds between two notifications.
* `gt` and `lt`: Thresholds for the value: greater than and less than.
* `st`: The minimum change of the value, the step.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `writeattr` command. The example sets a minimum of 5 seconds and a maximum of 30 seconds between notifications:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "writeattr /3/0/13 pmin=5&pmax=30",
  "c8y_Command": {
    "text": "writeattr /3/0/13 pmin=5&pmax=30"
  }
}
```

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>` and read the result, see [To read the result of a command](#to-read-the-result-of-a-command).

### To start an observation {#to-start-an-observation}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the `observe` command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "observe /3/0/13",
  "c8y_Command": {
    "text": "observe /3/0/13"
  }
}
```

To observe several paths in one request on an LWM2M 1.1 device, use `cobserve` with the paths separated by single spaces, for example `cobserve /3/0/13 /3/0/9`.

The platform returns HTTP 201 and the operation with its `id`. Note the `id` as `<operation_id>` and the `creationTime` as `<start_time>`, and read the result.

### To read the result of a command {#to-read-the-result-of-a-command}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the status is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/send-operation/#to-follow-the-status-of-the-operation). If the status is SUCCESSFUL, `c8y_Command.result` contains the result that the table in [Observation commands](#observation-commands) shows.

If the status is FAILED, the `failureReason` property describes the cause. In addition to the reasons in [To read the result](/skills/lwm2m-shell-resources/#to-read-the-result), the following reasons apply to observations:

* **Contains `Missing attribute(s)`**: The `writeattr` command has no attributes.
* **Contains `Invalid write attributes:`**: The agent does not accept a key or a value in the attributes. Check the attributes, and do not use spaces.
* **Contains `This device doesn't support composite command operations`**: The device uses LWM2M 1.0. Send `observe` for each path instead of `cobserve`.

If the status changes from EXECUTING back to PENDING, the device is not connected. The agent sends the command again when the device registers again. Do not create the command again.

### To check that measurements arrive {#to-check-that-measurements-arrive}

After an `observe` or `cobserve` command is SUCCESSFUL, send a [Retrieve all measurements](https://{{< domain-c8y >}}/api/core/#operation/getMeasurementCollectionResource) request for the measurements since `<start_time>`:

```http
GET /measurement/measurements?source=<device_id>&dateFrom=<start_time>&revert=true&pageSize=1
```

With `dateFrom` and `revert=true`, the platform returns the newest measurement first. If the `measurements` array contains a measurement, the observation works. New measurements arrive at least every `pmax` seconds.

If the array is empty, the value has not changed yet, or the object mapping of the resource does not create measurements, see [Send measurement](/device-integration/lwm2m/#send-measurement) and [Manage LWM2M object mappings](/skills/manage-object-mappings/). Wait `pmax` seconds and send the request again.

If measurements stop arriving, the device dropped the observation, often after it registered again. Start the observation again.

### To stop an observation {#to-stop-an-observation}

Select the cancel command:

* `cancelobservation`: Cancels a single or a composite observation with a reset message. It works with LWM2M 1.0 and 1.1, and you can use it when the device is not reachable. To cancel a composite observation, list the same paths as in the `cobserve` command, in any order.
* `cancelobserve` and `cancelCompositeObserve`: Cancel the observation with a request to the device, a GET request with the observe option. They need LWM2M 1.1 on the device.

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the cancel command:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "cancelobservation /3/0/13",
  "c8y_Command": {
    "text": "cancelobservation /3/0/13"
  }
}
```

The platform returns HTTP 201. Read the result of the command. After the command is SUCCESSFUL with its fixed result text, no further measurements arrive for the path.
