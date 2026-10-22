---
title: Manage the software repository
description: Create a software in the software repository, upload software files, add versions, list the software that a device can install, and delete a software with all its versions.
when: "the user wants to add software or software versions to the software repository, list them, or delete them"
weight: 370
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

The software repository collects the software packages that you install on devices. It is stored in the inventory:

* Each software is a managed object of the type `c8y_Software` with a `name` and a `description`.
* Each version of a software is a child addition of the software, of the type `c8y_SoftwareBinary`. Its `c8y_Software` fragment contains the `version` and the `url` of the software file.

A software can have the following restrictions:

* **Device type filter**: With `c8y_Filter.type`, the software is only available for devices of this managed object type.
* **Software type**: The `softwareType` property organizes the software, for example by package manager, such as `apt` or `container`. A device that lists software types in its `c8y_SupportedSoftwareTypes` fragment can only install software of these types.

To install a software version on a device, see [Install software on a device](/skills/device-management/install-device-software/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete software, versions, and files: ROLE_INVENTORY_ADMIN
* To list software and versions: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<software_id>` for the ID of a software, `<version>` for a version identifier such as `1.0.0`, `<device_type>` for a device type, and `<software_type>` for a software type.

### To create a software {#to-create-a-software}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "myapp",
  "description": "Telemetry collector for field gateways",
  "type": "c8y_Software",
  "softwareType": "<software_type>",
  "c8y_Filter": {
    "type": "<device_type>"
  }
}
```

Omit `c8y_Filter` to make the software available for all device types. Omit `softwareType` if the software has no software type.

To make the software visible to all users of the tenant, regardless of their inventory permissions, add the fragment `"c8y_Global": {}` to the software and to each version. The visibility does not extend to child objects. See [Globally accessible objects](/concepts/security/#globally-accessible-objects).

The platform returns HTTP 201 and the software with its `id`. Note the `id` as `<software_id>`.

### To upload a software file {#to-upload-a-software-file}

Each version refers to its software file by URL. You have the following options:

* Use the URL of a file that is already hosted elsewhere.
* Upload the file to {{< product-c8y-iot >}} and use its URL.
* Use an empty string if the device resolves the file itself, for example with a package manager. If the device cannot resolve it, the software operation fails.

To upload the file, send an [Upload a file](https://{{< domain-c8y >}}/api/core/#operation/postBinariesCollectionResource) request as `multipart/form-data`. The part `object` contains the name and the media type of the file, the part `file` contains the file:

```http
POST /inventory/binaries
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="object"

{ "name": "myapp-1.0.0.deb", "type": "application/octet-stream" }
--boundary
Content-Disposition: form-data; name="file"; filename="myapp-1.0.0.deb"
Content-Type: application/octet-stream

<file_content>
--boundary--
```

The platform returns HTTP 201 and a managed object with the fragment `c8y_IsBinary`. Note its `self` URL as `<file_url>`.

### To add a version {#to-add-a-version}

Send an [Assign a managed object as child addition](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAdditionsResource) request with the content type `application/vnd.com.nsn.cumulocity.managedobject+json`:

```http
POST /inventory/managedObjects/<software_id>/childAdditions
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "type": "c8y_SoftwareBinary",
  "c8y_Software": {
    "version": "<version>",
    "url": "<file_url>"
  }
}
```

With this content type, the platform creates the version and assigns it to the software in one request. It returns HTTP 201 and the version with its `id`. If the platform returns HTTP 404, the software `<software_id>` does not exist.

### To list software {#to-list-software}

The examples in this section show the `query` parameter unencoded for readability. URL-encode its value when you send the request, for example, replace each space with `%20`.

To list all software sorted by name, send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Software') $orderby=name asc&pageSize=2000&withTotalPages=true
```

The `managedObjects` array of the response contains the software. Without `pageSize`, the platform returns 5 objects per page. The `statistics.totalPages` property shows the number of pages.

### To list the software that a device can install {#to-list-the-software-that-a-device-can-install}

A software matches a device if both of the following conditions apply:

* Its `c8y_Filter.type` equals the `type` of the device, is empty, or is missing.
* If the device has a `c8y_SupportedSoftwareTypes` fragment, the `softwareType` of the software is one of its values.

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with both conditions:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Software' and (c8y_Filter.type eq '<device_type>' or c8y_Filter.type eq '' or not(has(c8y_Filter.type))) and (softwareType eq '<software_type>')) $orderby=name asc&pageSize=2000
```

If the device supports several software types, add one `softwareType eq` condition for each type and join them with `or`. If the device has no `c8y_SupportedSoftwareTypes` fragment, omit the software type condition.

Put the type condition into the query. If the request has a `query` parameter, the platform ignores a separate `type` parameter.

### To list the versions of a software {#to-list-the-versions-of-a-software}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request for the children of the software, newest first:

```http
GET /inventory/managedObjects?query=$filter=(bygroupid(<software_id>)) $orderby=creationTime.date desc&pageSize=2000&withTotalPages=true
```

Each entry of the `managedObjects` array contains the `id` of the version and its `c8y_Software.version`. If the array is empty, the software has no versions yet.

### To delete a software {#to-delete-a-software}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request with `forceCascade=true`:

```http
DELETE /inventory/managedObjects/<software_id>?forceCascade=true
```

With `forceCascade=true`, the platform deletes the software together with all its versions. It returns HTTP 204. If the deletion takes longer than 30 seconds, the platform returns HTTP 202 and continues in the background. If the platform returns HTTP 404, the software does not exist.
