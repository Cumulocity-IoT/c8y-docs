---
title: Apply and retrieve device configuration
description: Install configuration text or a configuration file on a device, make the device report its current configuration, and read the configuration file that the device uploads.
weight: 300
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
  - operation: getEventCollectionResource
    method: GET
    path: /event/events
    title: Retrieve all events
  - operation: getEventBinaryResource
    method: GET
    path: /event/events/{id}/binaries
    title: Retrieve the attached file of a specific event
---

Devices manage their configuration in one of the following formats:

* **Text-based configuration**: The configuration is a text in the `c8y_Configuration` fragment of the device. Use it only for short configurations that people can read.
* **Typed file-based configuration**: The device manages several configuration files, each with a configuration type such as `agent_conf`. The device lists its configuration types in the `c8y_SupportedConfigurations` fragment.
* **Legacy file-based configuration**: The device manages a single configuration file.

For each task, you create an operation. The device lists the operations that it supports in its `c8y_SupportedOperations` fragment:

* `c8y_Configuration`: Install configuration text.
* `c8y_SendConfiguration`: Report the current configuration text.
* `c8y_DownloadConfigFile`: Install a configuration file.
* `c8y_UploadConfigFile`: Upload the current configuration file.

The fragment names describe the view of the device. With `c8y_DownloadConfigFile`, the device downloads a file that you send. With `c8y_UploadConfigFile`, the device uploads its file, and you receive it. For details on the formats, see [Configuration](/device-integration/fragment-library/#configuration).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the device: ROLE_INVENTORY_READ
* To create operations: ROLE_DEVICE_CONTROL_ADMIN
* To read operations: ROLE_DEVICE_CONTROL_READ
* To read an uploaded configuration file: ROLE_EVENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device, `<operation_id>` for the ID of the operation, and `<configuration_type>` for a configuration type. The device ID is the `id` that the platform assigned to the device, not its name.

Each procedure creates an operation, which follows the same lifecycle as every other operation. To follow it, send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request to `GET /devicecontrol/operations/<operation_id>` every 5 seconds until the `status` is SUCCESSFUL or FAILED. For details and for how to cancel an operation that stays PENDING, see [Send an operation to a device](/recipes/send-operation/#to-follow-the-status-of-the-operation). If the platform returns HTTP 422 when you create an operation, the device is not an agent, and none of its parent devices is an agent.

### To check which configuration operations the device supports {#to-check-which-configuration-operations-the-device-supports}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

Check the following properties in the response:

* The fragment `c8y_IsDevice` is present.
* The array `c8y_SupportedOperations` contains the operation of your task, for example `"c8y_DownloadConfigFile"`.
* The array `c8y_SupportedConfigurations`, if present, lists the configuration types of the device. A device with this fragment supports typed file-based configuration. A device without it that supports `c8y_UploadConfigFile` or `c8y_DownloadConfigFile` uses legacy file-based configuration.

If the operation is missing in `c8y_SupportedOperations`, do not create it. No agent picks it up.

### To install configuration text {#to-install-configuration-text}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with the complete configuration text in `config`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Install configuration text",
  "c8y_Configuration": {
    "config": "c8y.url.http=https://management.cumulocity.com\nc8y.url.mqtt=mqtt.cumulocity.com\n"
  }
}
```

Escape the line breaks and other control characters of the text according to the JSON specification.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. After the operation is SUCCESSFUL, the device shows the new text in the `c8y_Configuration` fragment of its managed object.

### To install a configuration file {#to-install-a-configuration-file}

Take the configuration file from the configuration repository: the `url` of a configuration snapshot as `<snapshot_url>` and, for legacy file-based configuration, its `id` as `<snapshot_id>`. See [Manage the configuration repository](/recipes/manage-configuration-repository/).

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request. For a device with typed file-based configuration, send the URL and the configuration type:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Install configuration file",
  "c8y_DownloadConfigFile": {
    "url": "<snapshot_url>",
    "type": "<configuration_type>"
  }
}
```

For a device with legacy file-based configuration, send the URL and the ID of the configuration snapshot:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Install configuration file",
  "c8y_DownloadConfigFile": {
    "url": "<snapshot_url>",
    "c8y_ConfigurationDump": {
      "id": "<snapshot_id>"
    }
  }
}
```

Send the ID of the snapshot in `c8y_ConfigurationDump`, never its name. The device copies the `c8y_ConfigurationDump` fragment unchanged into its own managed object. Legacy file-based configuration only works with files that are stored in {{< product-c8y-iot >}}, not with external URLs.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. After the operation is SUCCESSFUL, the device shows the installed file in its managed object:

* **Typed file-based configuration**: In the fragment `c8y_Configuration_<configuration_type>`, with the properties `name`, `time`, `type`, and `url`.
* **Legacy file-based configuration**: In the fragment `c8y_ConfigurationDump`, with the ID of the snapshot.

### To request the current configuration text {#to-request-the-current-configuration-text}

1. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<device_id>",
      "description": "Request configuration text",
      "c8y_SendConfiguration": {}
    }
    ```

    The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`.

2. Wait until the operation is SUCCESSFUL. The device then writes its current configuration into the `c8y_Configuration` fragment of its managed object.
3. Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request to `GET /inventory/managedObjects/<device_id>` and read `c8y_Configuration.config`.

### To request the current configuration file {#to-request-the-current-configuration-file}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request. For a device with typed file-based configuration, send the configuration type of the file:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<device_id>",
  "description": "Request configuration file",
  "c8y_UploadConfigFile": {
    "type": "<configuration_type>"
  }
}
```

For a device with legacy file-based configuration, send an empty fragment: `"c8y_UploadConfigFile": {}`.

The platform returns HTTP 201 and the operation with its `id`, `creationTime`, and `"status": "PENDING"`. Note the `creationTime` as `<creation_time>`.

After the operation is SUCCESSFUL, the uploaded file is available:

* **Typed file-based configuration**: The device creates an event of the type `<configuration_type>` and attaches the file to it. Read the file as described in [To read the uploaded configuration file](#to-read-the-uploaded-configuration-file).
* **Legacy file-based configuration**: The device uploads the file and creates a new configuration snapshot in the configuration repository. See [Manage the configuration repository](/recipes/manage-configuration-repository/#to-list-the-configuration-snapshots).

Only a file that the device uploaded after your operation shows the current configuration. Earlier uploads and snapshots in the repository can be outdated.

### To read the uploaded configuration file {#to-read-the-uploaded-configuration-file}

1. Send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request for the events of the device that the platform created after your operation:

    ```http
    GET /event/events?source=<device_id>&type=<configuration_type>&createdFrom=<creation_time>&pageSize=5
    ```

    If `<creation_time>` contains a `+`, encode it as `%2B`. The `events` array of the response contains the upload event. Note the `id` of the event with the newest `creationTime` as `<event_id>`.

    If the `events` array is empty, the device reported SUCCESSFUL without uploading a file.

2. Send a [Retrieve the attached file of a specific event](https://{{< domain-c8y >}}/api/core/#operation/getEventBinaryResource) request:

    ```http
    GET /event/events/<event_id>/binaries
    ```

    The platform returns HTTP 200 and the content of the configuration file. If the platform returns HTTP 404, no file is attached to the event.
