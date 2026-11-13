---
title: Manage the configuration repository
description: Upload a configuration file, create a configuration snapshot for it in the configuration repository, announce the configuration types of a device, list the snapshots, and delete a snapshot with its file.
when: "the user wants to add, list, or delete configuration files in the configuration repository, or announce the configuration types of a device"
weight: 340
requires:
  - authentication
api:
  - operation: postBinariesCollectionResource
    method: POST
    path: /inventory/binaries
    title: Upload a file
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: putManagedObjectResource
    method: PUT
    path: /inventory/managedObjects/{id}
    title: Update a specific managed object
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
  - operation: deleteBinariesResource
    method: DELETE
    path: /inventory/binaries/{id}
    title: Remove a stored file
---

The configuration repository stores configuration snapshots: configuration files that you can install on devices. Each snapshot is a managed object of the type `c8y_ConfigurationDump`. Its `url` points to the configuration file, usually a file that is stored in the inventory of your tenant.

A configuration snapshot has the following properties:

* `name`: The name of the snapshot. Mandatory.
* `type`: Always `c8y_ConfigurationDump`. Mandatory.
* `url`: The URL of the configuration file. Mandatory.
* `description`: A description of the snapshot. Optional.
* `configurationType`: The configuration type, for devices with typed file-based configuration. Omit it for devices with legacy file-based configuration.
* `deviceType`: The device type that the snapshot applies to. Omit it to make the snapshot available for all device types.

Devices with legacy file-based configuration only accept files that are stored in {{< product-c8y-iot >}}. External URLs only work with devices that support typed file-based configuration. To install a snapshot on a device, see [Apply and retrieve device configuration](/skills/device-management/apply-device-configuration/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To upload files and to create, update, and delete managed objects: ROLE_INVENTORY_ADMIN
* To list the snapshots: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<snapshot_id>` for the ID of a configuration snapshot, `<binary_id>` for the ID of an uploaded file, and `<device_id>` for the ID of a device.

### To upload the configuration file {#to-upload-the-configuration-file}

If the configuration file is already available at a URL, skip this step and use that URL as `<file_url>`.

Send an [Upload a file](https://{{< domain-c8y >}}/api/core/#operation/postBinariesCollectionResource) request as `multipart/form-data` with two parts. The part `object` contains the name and the media type of the file, the part `file` contains the file:

```http
POST /inventory/binaries
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="object"

{ "name": "agent.conf", "type": "text/plain" }
--boundary
Content-Disposition: form-data; name="file"; filename="agent.conf"
Content-Type: text/plain

c8y.url.http=https://management.cumulocity.com
c8y.url.mqtt=mqtt.cumulocity.com
--boundary--
```

The platform returns HTTP 201 and a managed object with the fragment `c8y_IsBinary`. Note its `self` URL as `<file_url>` and its `id` as `<binary_id>`.

### To create a configuration snapshot {#to-create-a-configuration-snapshot}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "Agent configuration",
  "description": "Default agent configuration for Linux gateways",
  "type": "c8y_ConfigurationDump",
  "url": "<file_url>",
  "configurationType": "agent_conf",
  "deviceType": "c8y_Linux"
}
```

To make the snapshot visible to all users of the tenant, regardless of their inventory permissions, also add the fragment `"c8y_Global": {}`. See [Globally accessible objects](/concepts/security/#globally-accessible-objects).

The platform returns HTTP 201 and the snapshot with its `id`. Note the `id` as `<snapshot_id>`.

If the request fails after you uploaded a file for the snapshot, delete the file, see [To delete a configuration snapshot](#to-delete-a-configuration-snapshot).

### To announce the configuration types of a device {#to-announce-the-configuration-types-of-a-device}

A device with typed file-based configuration lists its configuration types in the `c8y_SupportedConfigurations` fragment of its managed object. Usually, the device agent sets this fragment. {{< product-c8y-iot >}} does not validate the types. They are plain strings, and the device agent assigns them to its configuration files.

To set the fragment, send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request with all types of the device:

```http
PUT /inventory/managedObjects/<device_id>
Content-Type: application/json
Accept: application/json

{
  "c8y_SupportedConfigurations": ["agent_conf", "ssh_conf"]
}
```

The platform returns HTTP 200 and the device with the new `c8y_SupportedConfigurations` array. The request replaces the whole fragment and does not change other fragments. If the platform returns HTTP 404, the device does not exist.

### To list the configuration snapshots {#to-list-the-configuration-snapshots}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the type:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_ConfigurationDump')&pageSize=100&withTotalPages=true
```

The example shows the `query` parameter unencoded for readability. URL-encode its value when you send the request, for example, replace each space with `%20`.

The `managedObjects` array of the response contains the snapshots with their `id`, `name`, `url`, `configurationType`, and `deviceType`. The `statistics.totalPages` property shows the number of pages. To read the next page, add `currentPage=2`, and so on.

### To delete a configuration snapshot {#to-delete-a-configuration-snapshot}

1. Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

    ```http
    DELETE /inventory/managedObjects/<snapshot_id>
    ```

    The platform returns HTTP 204.

2. If you uploaded the file for this snapshot, send a [Remove a stored file](https://{{< domain-c8y >}}/api/core/#operation/deleteBinariesResource) request:

    ```http
    DELETE /inventory/binaries/<binary_id>
    ```

    The platform returns HTTP 204 and deletes the file together with its managed object.
