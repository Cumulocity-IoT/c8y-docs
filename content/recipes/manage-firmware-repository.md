---
title: Manage the firmware repository
description: Create a firmware in the firmware repository, upload firmware files, add versions and patches, list the firmware for a device type, and delete a firmware with all its versions.
weight: 360
sector:
  - device_management
requires:
  - authentication
api:
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: postBinariesCollectionResource
    method: POST
    path: /inventory/binaries
    title: Upload a file
  - operation: postManagedObjectChildAdditionsResource
    method: POST
    path: /inventory/managedObjects/{id}/childAdditions
    title: Assign a managed object as child addition
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

The firmware repository collects the firmware that you install on devices. It is stored in the inventory:

* Each firmware is a managed object of the type `c8y_Firmware` with a `name`, a `description`, and an optional device type filter in `c8y_Filter.type`.
* Each version of a firmware is a child addition of the firmware, of the type `c8y_FirmwareBinary`. Its `c8y_Firmware` fragment contains the `version` and the `url` of the firmware file.
* A patch is a version with the additional fragment `c8y_Patch`. Its `dependency` property names the base version that the patch applies to.

To install a firmware version on a device, see [Update the firmware of a device](/recipes/update-device-firmware/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete firmware, versions, and files: ROLE_INVENTORY_ADMIN
* To list firmware and versions: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<firmware_id>` for the ID of a firmware, `<version>` for a version identifier such as `1.0.1`, and `<device_type>` for the managed object type of the devices that a firmware applies to.

### To create a firmware {#to-create-a-firmware}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "ubuntu core",
  "description": "Operating system of the field gateways",
  "type": "c8y_Firmware",
  "c8y_Filter": {
    "type": "<device_type>"
  }
}
```

With `c8y_Filter`, the firmware is only available for devices of the type `<device_type>`. Omit `c8y_Filter` to make the firmware available for all devices.

To make the firmware visible to all users of the tenant, regardless of their inventory permissions, add the fragment `"c8y_Global": {}` to the firmware and to each version. The visibility does not extend to child objects. See [Globally accessible objects](/concepts/security/#globally-accessible-objects).

The platform returns HTTP 201 and the firmware with its `id`. Note the `id` as `<firmware_id>`.

### To upload a firmware file {#to-upload-a-firmware-file}

Each version refers to its firmware file by URL. You have the following options:

* Use the URL of a file that is already hosted elsewhere.
* Upload the file to {{< product-c8y-iot >}} and use its URL.
* Use an empty string if the device resolves the file itself. If the device cannot resolve it, the firmware operation fails.

To upload the file, send an [Upload a file](https://{{< domain-c8y >}}/api/core/#operation/postBinariesCollectionResource) request as `multipart/form-data`. The part `object` contains the name and the media type of the file, the part `file` contains the file:

```http
POST /inventory/binaries
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="object"

{ "name": "ubuntu-core-1.0.1.bin", "type": "application/octet-stream" }
--boundary
Content-Disposition: form-data; name="file"; filename="ubuntu-core-1.0.1.bin"
Content-Type: application/octet-stream

<file_content>
--boundary--
```

The platform returns HTTP 201 and a managed object with the fragment `c8y_IsBinary`. Note its `self` URL as `<file_url>`.

### To add a version {#to-add-a-version}

Send an [Assign a managed object as child addition](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAdditionsResource) request with the content type `application/vnd.com.nsn.cumulocity.managedobject+json`:

```http
POST /inventory/managedObjects/<firmware_id>/childAdditions
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "type": "c8y_FirmwareBinary",
  "c8y_Firmware": {
    "version": "<version>",
    "url": "<file_url>"
  }
}
```

With this content type, the platform creates the version and assigns it to the firmware in one request. It returns HTTP 201 and the version with its `id`. If the platform returns HTTP 404, the firmware `<firmware_id>` does not exist.

### To add a patch {#to-add-a-patch}

Send an [Assign a managed object as child addition](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAdditionsResource) request with the version of the patch and the fragment `c8y_Patch`:

```http
POST /inventory/managedObjects/<firmware_id>/childAdditions
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "type": "c8y_FirmwareBinary",
  "c8y_Firmware": {
    "version": "<patch_version>",
    "url": "<file_url>"
  },
  "c8y_Patch": {
    "dependency": "<version>"
  }
}
```

`<patch_version>` is the version of the patch and `<version>` is the base version that the patch applies to. The platform returns HTTP 201 and the patch with its `id`.

### To list firmware {#to-list-firmware}

The examples in this section show the `query` parameter unencoded for readability. URL-encode its value when you send the request, for example, replace each space with `%20`.

To list all firmware sorted by name, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Firmware') $orderby=name asc&pageSize=2000&withTotalPages=true
```

The `managedObjects` array of the response contains the firmware. Without `pageSize`, the platform returns 5 objects per page. The `statistics.totalPages` property shows the number of pages.

To list the firmware that applies to devices of the type `<device_type>`, query the firmware whose `c8y_Filter.type` equals the device type, is empty, or is missing:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Firmware' and (c8y_Filter.type eq '<device_type>' or c8y_Filter.type eq '' or not(has(c8y_Filter.type)))) $orderby=name asc&pageSize=2000
```

Put the type condition into the query. If the request has a `query` parameter, the platform ignores a separate `type` parameter.

### To list the versions and patches of a firmware {#to-list-the-versions-and-patches-of-a-firmware}

To list the base versions of a firmware, newest first, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(bygroupid(<firmware_id>) and not(has(c8y_Patch))) $orderby=creationTime.date desc&pageSize=2000&withTotalPages=true
```

Each entry of the `managedObjects` array contains the `id` of the version and its `c8y_Firmware.version`. If the array is empty, the firmware has no versions yet.

To list the patches of the base version `<version>`, query the children with this dependency:

```http
GET /inventory/managedObjects?query=$filter=(bygroupid(<firmware_id>) and c8y_Patch.dependency eq '<version>') $orderby=creationTime.date desc&pageSize=2000
```

### To delete a firmware {#to-delete-a-firmware}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request with `forceCascade=true`:

```http
DELETE /inventory/managedObjects/<firmware_id>?forceCascade=true
```

With `forceCascade=true`, the platform deletes the firmware together with all its versions and patches. It returns HTTP 204. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and continues in the background. If the platform returns HTTP 404, the firmware does not exist.
