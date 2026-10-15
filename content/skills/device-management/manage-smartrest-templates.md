---
title: Manage SmartREST 2.0 template collections
description: Create a SmartREST 2.0 template collection with its X-ID, list and find collections, export a collection, and delete it.
weight: 430
requires:
  - authentication
api:
  - operation: postManagedObjectCollectionResource
    method: POST
    path: /inventory/managedObjects
    title: Create one or multiple managed objects
  - operation: postExternalIDCollectionResource
    method: POST
    path: /identity/globalIds/{id}/externalIds
    title: Create an external ID
  - operation: getManagedObjectCollectionResource
    method: GET
    path: /inventory/managedObjects
    title: Retrieve all managed objects
  - operation: getExternalIDResource
    method: GET
    path: /identity/externalIds/{type}/{externalId}
    title: Retrieve a specific external ID
  - operation: getManagedObjectResource
    method: GET
    path: /inventory/managedObjects/{id}
    title: Retrieve a specific managed object
  - operation: deleteManagedObjectResource
    method: DELETE
    path: /inventory/managedObjects/{id}
    title: Remove a specific managed object
---

A SmartREST 2.0 template collection is a set of request and response templates that devices use to communicate with {{< product-c8y-iot >}}. Devices refer to a collection by its unique ID, the X-ID. For the templates themselves, see [SmartREST 2.0](/smartrest/smartrest-two/#template-collections).

A template collection consists of the following parts:

* A managed object of the type `c8y_SmartRest2Template`. Its fragment `com_cumulocity_model_smartrest_csv_CsvSmartRestTemplate` contains the arrays `requestTemplates` and `responseTemplates`.
* An external ID of the type `c8y_SmartRest2DeviceIdentifier` on this managed object. Its value is the X-ID.

Each X-ID is unique in the tenant.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete template collections: ROLE_INVENTORY_ADMIN
* To create the X-ID: ROLE_IDENTITY_ADMIN
* To find a collection by its X-ID: ROLE_IDENTITY_READ
* To read template collections: ROLE_INVENTORY_READ
{{< /c8y-admon-req >}}

The examples use `<template_id>` for the ID of the managed object of the collection and `<x_id>` for its X-ID.

### To create a template collection {#to-create-a-template-collection}

1. Send a [Create one or multiple managed objects](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) request:

    ```http
    POST /inventory/managedObjects
    Content-Type: application/json
    Accept: application/json

    {
      "name": "My template collection",
      "type": "c8y_SmartRest2Template",
      "com_cumulocity_model_smartrest_csv_CsvSmartRestTemplate": {
        "requestTemplates": [],
        "responseTemplates": []
      }
    }
    ```

    The request creates a collection without templates. The platform returns HTTP 201 and the managed object with its `id`. Note the `id` as `<template_id>`.

2. Send a [Create an external ID](https://{{< domain-c8y >}}/api/core/#operation/postExternalIDCollectionResource) request to give the collection its X-ID:

    ```http
    POST /identity/globalIds/<template_id>/externalIds
    Content-Type: application/json
    Accept: application/json

    {
      "type": "c8y_SmartRest2DeviceIdentifier",
      "externalId": "<x_id>"
    }
    ```

    The platform returns HTTP 201 and the external ID with `"externalId": "<x_id>"`.

    If the platform returns HTTP 409, another collection already has this X-ID. Find it as described in [To find a template collection by its X-ID](#to-find-a-template-collection-by-its-x-id). Do not delete or move the existing X-ID. Choose another X-ID, or use the existing collection.

To add templates to the collection, use the Device Management application, see [To create a new SmartREST template](/device-management-application/smartrest-templates/#to-create-a-new-smartrest-template).

### To list all template collections {#to-list-all-template-collections}

Send a [Retrieve all managed objects](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectCollectionResource) request with the type of the collections:

```http
GET /inventory/managedObjects?type=c8y_SmartRest2Template&pageSize=1000
```

The platform returns HTTP 200. The `managedObjects` array contains the template collections with their `id` and `name`.

### To find a template collection by its X-ID {#to-find-a-template-collection-by-its-x-id}

Send a [Retrieve a specific external ID](https://{{< domain-c8y >}}/api/core/#operation/getExternalIDResource) request:

```http
GET /identity/externalIds/c8y_SmartRest2DeviceIdentifier/<x_id>
```

The platform returns HTTP 200. The ID of the collection is in `managedObject.id`.

If the platform returns HTTP 404, no collection has this X-ID.

### To export a template collection {#to-export-a-template-collection}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request:

```http
GET /inventory/managedObjects/<template_id>
```

The platform returns HTTP 200 and the collection. Keep only the following properties of the response:

* `name`
* `type`
* `com_cumulocity_model_smartrest_csv_CsvSmartRestTemplate`

The result has the format of the export and import in the Device Management application. You can import it there, see [To import an existing SmartREST template](/device-management-application/smartrest-templates/#to-import-an-existing-smartrest-template).

### To delete a template collection {#to-delete-a-template-collection}

{{< c8y-admon-caution >}}
After you delete a collection, devices can no longer use its X-ID. Delete only collections that no device uses.
{{< /c8y-admon-caution >}}

Send a [Remove a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/deleteManagedObjectResource) request:

```http
DELETE /inventory/managedObjects/<template_id>
```

The platform returns HTTP 204 and deletes the collection together with its X-ID. If the platform returns HTTP 404, the collection does not exist anymore.
