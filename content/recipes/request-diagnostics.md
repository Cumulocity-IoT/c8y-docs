---
title: Request a diagnostics report from a device
description: Check that a device supports diagnostics reports, request a report with a c8y_DiagnosticReport operation, download the report file, and delete it.
weight: 260
sector:
  - recipes
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
  - operation: getBinariesResource
    method: GET
    path: /inventory/binaries/{id}
    title: Retrieve a stored file
  - operation: deleteBinariesResource
    method: DELETE
    path: /inventory/binaries/{id}
    title: Remove a stored file
---

To get a diagnostics report from a device, you send the device a `c8y_DiagnosticReport` operation. The device generates the report and uploads it as a file to the inventory. It then sets the operation to SUCCESSFUL and writes the URL of the file into the operation. The operation goes through the same statuses as any other operation, see [Send an operation to a device](/recipes/send-operation/).

A device supports diagnostics reports if its `c8y_SupportedOperations` fragment contains `c8y_DiagnosticReport`. The Device Management application then shows the **Diagnostics** tab for the device.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device and download the report: ROLE_INVENTORY_READ
* To create the operation: ROLE_DEVICE_CONTROL_ADMIN
* To read the operation: ROLE_DEVICE_CONTROL_READ
* To delete the report: ROLE_INVENTORY_ADMIN
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device and `<operation_id>` for the ID of the operation.

### To check that the device supports diagnostics reports {#to-check-that-the-device-supports-diagnostics-reports}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the managed object. Check the following:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains `"c8y_DiagnosticReport"`.

If `c8y_DiagnosticReport` is missing, do not request a report. No agent executes the operation.

### To request the report {#to-request-the-report}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Diagnostic file request",
  "c8y_DiagnosticReport": {}
}
```

The operation has no parameters, so the `c8y_DiagnosticReport` fragment is empty.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422, the device does not exist, or neither the device nor one of its parent devices is an agent.

### To get the URL of the report {#to-get-the-url-of-the-report}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED, for example for at most 2 minutes:

* **SUCCESSFUL**: The property `c8y_DiagnosticReport.file` contains the URL of the report, in the form `https://<tenant_domain>/inventory/binaries/<binary_id>`. If the property is missing, the device completed the operation without uploading a report.
* **FAILED**: The `failureReason` property describes why the device did not provide the report.

If the operation is still PENDING after the timeout, no agent picked it up. Cancel it as described in [To cancel a pending operation](/recipes/send-operation/#to-cancel-a-pending-operation). If it is still EXECUTING, do not cancel it, because the device can still complete it. See [To follow the status of the operation](/recipes/send-operation/#to-follow-the-status-of-the-operation).

### To download the report {#to-download-the-report}

`<binary_id>` is the last part of the URL in `c8y_DiagnosticReport.file`. Send a [Retrieve a stored file](https://{{< domain-c8y >}}/api/core/#operation/getBinariesResource) request:

```http
GET /inventory/binaries/<binary_id>
```

The platform returns HTTP 200, and the response body is the content of the report. If it returns HTTP 404, the report was deleted after the device uploaded it.

### To delete the report {#to-delete-the-report}

Send a [Remove a stored file](https://{{< domain-c8y >}}/api/core/#operation/deleteBinariesResource) request:

```http
DELETE /inventory/binaries/<binary_id>
```

The platform returns HTTP 204 and deletes the file. The operation still contains the URL in `c8y_DiagnosticReport.file`. A download from this URL now returns HTTP 404.
