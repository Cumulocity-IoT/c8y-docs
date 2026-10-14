---
title: Manage device profiles
description: Create a device profile with a firmware version, software packages, and configuration files, read and update it, list all device profiles, and delete a profile.
weight: 350
sector:
  - recipes
  - device_management
requires:
  - authentication
api:
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
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
---

A device profile combines a firmware version, software packages, and configuration files that a device installs together. A profile is a managed object of the type `c8y_Profile`. Its `c8y_DeviceProfile` fragment contains the following sections, each of them optional:

* `firmware`: An object with the `name`, `version`, and `url` of one firmware version. All three properties are mandatory.
* `software`: An array of software packages. Each entry has a `name`, a `version`, a `url`, and an `action`, which is `install` or `delete`. These properties are mandatory. The `softwareType` property is optional.
* `configuration`: An array of configuration files. Each entry has a `name`, a `type`, and a `url`. All three properties are mandatory.

Take the values from the firmware repository, the software repository, and the configuration repository, see [Manage the firmware repository](/recipes/manage-firmware-repository/), [Manage the software repository](/recipes/manage-software-repository/), and [Manage the configuration repository](/recipes/manage-configuration-repository/). To install a profile on a device, see [Apply a device profile to a device](/recipes/apply-device-profile/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create, update, and delete profiles: ROLE_INVENTORY_ADMIN
* To read and list profiles: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<profile_id>` for the ID of a device profile and `<device_type>` for the managed object type of the devices that a profile applies to.

### To create a device profile {#to-create-a-device-profile}

Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

```http
POST /inventory/managedObjects
Content-Type: application/json
Accept: application/json

{
  "name": "Gateway baseline",
  "type": "c8y_Profile",
  "c8y_Filter": {
    "type": "<device_type>"
  },
  "c8y_DeviceProfile": {
    "firmware": {
      "name": "device_fw",
      "version": "1.0.1",
      "url": "https://example.com/fw"
    },
    "software": [
      {
        "name": "curl",
        "action": "install",
        "version": "2.3.4",
        "url": "https://example.com/curl",
        "softwareType": "rpm"
      }
    ],
    "configuration": [
      {
        "name": "agent_conf",
        "type": "agent_conf",
        "url": "https://example.com/agent.conf"
      }
    ]
  }
}
```

With `c8y_Filter`, the profile is only available for devices of the type `<device_type>`. Omit `c8y_Filter` to make the profile available for all device types. Omit each section of `c8y_DeviceProfile` that the profile does not contain.

The platform returns HTTP 201 and the profile with its `id`. Note the `id` as `<profile_id>`.

### To read a device profile {#to-read-a-device-profile}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<profile_id>
```

The platform returns HTTP 200 and the profile with its `name`, `"type": "c8y_Profile"`, `c8y_Filter`, and `c8y_DeviceProfile`. If the platform returns HTTP 404, the profile does not exist.

### To update a device profile {#to-update-a-device-profile}

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request with the fragments that you change, for example a new name:

```http
PUT /inventory/managedObjects/<profile_id>
Content-Type: application/json
Accept: application/json

{
  "name": "Gateway baseline 2"
}
```

The request changes only the fragments in the body. All other fragments stay unchanged. To remove a fragment, send it with the value `null`.

The platform replaces each fragment in the body as a whole. To change one section of `c8y_DeviceProfile`, for example to add a software package, read the profile first and send the complete `c8y_DeviceProfile` fragment with all sections.

The platform returns HTTP 200 and the updated profile. If the platform returns HTTP 404, the profile does not exist.

### To list device profiles {#to-list-device-profiles}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with a query for the type:

```http
GET /inventory/managedObjects?query=$filter=(type eq 'c8y_Profile')&pageSize=100&withTotalPages=true
```

The example shows the `query` parameter unencoded for readability. URL-encode its value when you send the request, for example, replace each space with `%20`.

The `managedObjects` array of the response contains the profiles. The `statistics.totalPages` property shows the number of pages. To read the next page, add `currentPage=2`, and so on.

### To delete a device profile {#to-delete-a-device-profile}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<profile_id>
```

The platform returns HTTP 204. Deleting a profile does not affect the devices that use it.
