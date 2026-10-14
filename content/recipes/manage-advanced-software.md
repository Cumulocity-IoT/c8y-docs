---
title: Manage the installed software list of a device
description: Read, replace, extend, and shorten the list of software packages that the Advanced Software Management microservice records as installed on a device.
weight: 720
sector:
  - device_management
requires:
  - authentication
api:
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
---

The Advanced Software Management microservice records which software packages are installed on a device. For devices that support advanced software management, it keeps the list outside of the device managed object, so that the managed object stays small even for long lists. You manage the list with the REST endpoints of the microservice, see [Advanced Software Management](/device-integration/fragment-library/#advanced-software-management).

All requests go to one URL, `/service/advanced-software-mgmt/software?deviceId=<device_id>`, where `<device_id>` is the ID of the device:

* GET reads the list.
* POST replaces the complete list.
* PUT adds packages to the list.
* DELETE removes packages from the list.

You cannot change a single property of a stored package. To change a package, send it again with PUT.

These requests change the record in the platform only. They do not install or remove software on the device. To install software, send a `c8y_SoftwareUpdate` operation to the device, see [Changing installed software](/device-integration/fragment-library/#changing-installed-software).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To read the software list: ROLE_ADVANCED_SOFTWARE_READ, or the permission to read the device in the inventory
* To change the software list: ROLE_ADVANCED_SOFTWARE_ADMIN, or the permission to change the device in the inventory
* To read the device: ROLE_INVENTORY_READ

Your tenant is subscribed to the Advanced Software Management microservice `advanced-software-mgmt`.
{{< /c8y-admon-req >}}

Each package in the list has the following properties:

* `name`: The name of the package. Required.
* `version`: The version of the package. Required.
* `url`: The download URL of the package. Optional.
* `softwareType`: The software type, for example `apt`. Optional.

`name` and `version` together identify a package. Do not send an `id`. The microservice ignores it.

If a request returns HTTP 403 with the error "Microservice/Access Denied", your tenant is not subscribed to the microservice. Any other HTTP 403 means that your user lacks the role for the request. HTTP 404 means that the device does not exist.

### To check that the device supports advanced software management {#to-check-that-the-device-supports-advanced-software-management}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<device_id>
```

The platform returns HTTP 200 and the device. A device supports advanced software management if both of the following conditions apply:

* The array `c8y_SupportedOperations` contains `"c8y_SoftwareUpdate"`.
* The fragment `c8y_SupportedSoftwareTypes` lists the software types of the device.

If `c8y_SupportedSoftwareTypes` is missing, the microservice stores the list in the `c8y_SoftwareList` fragment of the device managed object instead. The requests below work the same way for both kinds of devices.

### To read the software list {#to-read-the-software-list}

Send a request to [query the software packages](/device-integration/fragment-library/#querying-the-software-packages):

```http
GET /service/advanced-software-mgmt/software?deviceId=<device_id>&pageSize=100&currentPage=1&withTotalPages=true
```

Without `pageSize`, the microservice returns 5 packages per page. To filter the list, add one or more of the parameters `name`, `version`, `url`, and `type`, for example `&type=apt`. The filters match exact values.

The microservice returns HTTP 200 and the following properties:

* `softwareList`: The packages, each with its `name`, `version`, `url`, and `softwareType`. A property without a value is left out.
* `statistics`: The `currentPage`, `pageSize`, and, with `withTotalPages=true`, `totalPages`.
* `next`: The URL of the next page. Follow it until `softwareList` is empty.

### To replace the software list {#to-replace-the-software-list}

Send a request to [set the software packages](/device-integration/fragment-library/#setting-software-packages), with a JSON array of all packages that the device has:

```http
POST /service/advanced-software-mgmt/software?deviceId=<device_id>
Content-Type: application/json

[
  {
    "name": "vim",
    "version": "8.2.0",
    "url": "https://example.com/vim-8.2.0.deb",
    "softwareType": "apt"
  },
  {
    "name": "curl",
    "version": "7.88.1",
    "softwareType": "apt"
  }
]
```

The microservice returns HTTP 200 without a body. The stored list now contains exactly the packages that you sent. It removes all packages that are not in the array. To clear the list, send an empty array, `[]`.

The microservice stores the packages sorted by name, then by version.

If the microservice returns HTTP 400, check the message:

* **"Missing software properties"**: A package has no `name` or no `version`.
* **"duplicates"**: Two packages in the array have the same `name` and `version`.

### To add packages to the software list {#to-add-packages-to-the-software-list}

Send a request to [add software packages](/device-integration/fragment-library/#adding-software-packages), with a JSON array of the packages to add:

```http
PUT /service/advanced-software-mgmt/software?deviceId=<device_id>
Content-Type: application/json

[
  {
    "name": "vim",
    "version": "9.0.0",
    "url": "https://example.com/vim-9.0.0.deb",
    "softwareType": "apt"
  }
]
```

The microservice returns HTTP 200 without a body. It adds each package with a new combination of `name` and `version`. If the list already contains a package with the same `name` and `version`, the microservice replaces it with the package that you sent. All other packages stay unchanged.

The microservice returns HTTP 400 for the same reasons as for the POST request.

### To remove packages from the software list {#to-remove-packages-from-the-software-list}

Send a request to [remove software](/device-integration/fragment-library/#removing-software), with a JSON array of the `name` and `version` of each package to remove:

```http
DELETE /service/advanced-software-mgmt/software?deviceId=<device_id>
Content-Type: application/json

[
  {
    "name": "vim",
    "version": "8.2.0"
  }
]
```

The microservice returns HTTP 200 without a body. It removes the listed packages, and ignores packages that are not in the list.

To check the result, read the software list again, see [To read the software list](#to-read-the-software-list).
