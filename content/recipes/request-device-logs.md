---
title: Request a log file from a device
description: Check which logs a device supports, request a log file with a c8y_LogfileRequest operation, wait until the device uploads the file, and download it.
weight: 250
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
  - operation: getEventBinaryResource
    method: GET
    path: /event/events/{id}/binaries
    title: Retrieve the attached file of a specific event
  - operation: getBinariesResource
    method: GET
    path: /inventory/binaries/{id}
    title: Retrieve a stored file
---

To get a log file from a device, you send the device a `c8y_LogfileRequest` operation. The device collects the log lines, filters them, and uploads them as a file. It then sets the operation to SUCCESSFUL and writes the URL of the file into the operation. The operation goes through the same statuses as any other operation, see [Send an operation to a device](/recipes/send-operation/).

A device that supports log requests has the following fragments in its managed object:

* `c8y_SupportedOperations` contains `c8y_LogfileRequest`.
* `c8y_SupportedLogs` lists the types of logs that the device provides, for example `"syslog"` and `"dmesg"`.

In the Device Management application, you request log files in the **Logs** tab of the device, see [Logs](/device-management-application/viewing-device-details/#logs). For the device side, see [Logs](/device-integration/fragment-library/#logs) in the fragment library.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To create the operation: ROLE_DEVICE_CONTROL_ADMIN
* To read the operation: ROLE_DEVICE_CONTROL_READ
* To download a log file that is attached to an event: ROLE_EVENT_READ
* To download a log file that is stored in the inventory: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation.

### To check that the device supports log requests {#to-check-that-the-device-supports-log-requests}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check the following:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_LogfileRequest"`. Otherwise, do not request a log file. No agent executes the operation.
* The array `c8y_SupportedLogs` contains the type of log that you want. If the device lists other types only, request one of these types.

The fragment `c8y_SupportedLogs` is recommended, not mandatory. If it is missing, you can still request a log file.

### To request the log file {#to-request-the-log-file}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Request log file syslog",
  "c8y_LogfileRequest": {
    "logFile": "syslog",
    "dateFrom": "2026-10-13T00:00:00.000Z",
    "dateTo": "2026-10-14T00:00:00.000Z",
    "searchText": "kernel",
    "maximumLines": 1000
  }
}
```

The `c8y_LogfileRequest` fragment has the following properties. All of them are mandatory:

* `logFile`: The type of log, one of the values in `c8y_SupportedLogs`.
* `dateFrom` and `dateTo`: The time range of the log lines, in ISO 8601 format.
* `searchText`: A text that each returned log line contains. To get all lines, send an empty string.
* `maximumLines`: The maximum number of log lines, as a number.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device does not exist, or neither the device nor one of its parent devices is an agent.

### To get the URL of the log file {#to-get-the-url-of-the-log-file}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED, for example for at most 2 minutes:

* **SUCCESSFUL**: The property `c8y_LogfileRequest.file` contains the URL of the uploaded file. Note it as `<log_file_url>`. If the property is missing, the device completed the operation without uploading a file.
* **FAILED**: The `failureReason` property describes why the device did not provide the log file.

If the operation is still PENDING or EXECUTING after the timeout, see [To follow the status of the operation](/recipes/send-operation/#to-follow-the-status-of-the-operation). To cancel an operation that stays PENDING, see [To cancel a pending operation](/recipes/send-operation/#to-cancel-a-pending-operation).

### To download the log file {#to-download-the-log-file}

`<log_file_url>` is an absolute URL in your tenant. It has one of the following forms:

* `https://<tenant_domain>/event/events/<event_id>/binaries`: The device attached the file to an event of type `c8y_Logfile`. This is the recommended way for devices.
* `https://<tenant_domain>/inventory/binaries/<binary_id>`: The device stored the file in the inventory.

Send a GET request to `<log_file_url>` with the same `Authorization` header as your other requests.

For a file that is attached to an event, this is a [Retrieve the attached file of a specific event](https://{{< domain-c8y >}}/api/core/#operation/getEventBinaryResource) request:

```http
GET /event/events/<event_id>/binaries
```

For a file in the inventory, this is a [Retrieve a stored file](https://{{< domain-c8y >}}/api/core/#operation/getBinariesResource) request:

```http
GET /inventory/binaries/<binary_id>
```

The platform returns HTTP 200, and the response body is the content of the log file.

If the platform returns HTTP 404, the file was deleted after the device uploaded it. If it returns HTTP 403, the user does not have the role to read the file. For a file attached to an event, this is ROLE_EVENT_READ.
