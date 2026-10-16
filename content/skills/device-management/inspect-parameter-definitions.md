---
title: Inspect the definition of a device parameter
description: Find the Digital Twin Manager property definition of a device parameter and read its contexts to see whether the platform stores the parameter on the device, shows it in the Parameters tab, and lets users edit it.
weight: 700
requires:
  - authentication
api:
  - operation: getPropertyDefinitions
    method: GET
    path: /service/dtm/definitions/properties
    title: Retrieve all Property Definitions
    spec: dtm
  - operation: getPropertyDefinition
    method: GET
    path: /service/dtm/definitions/properties/{identifier}
    title: Retrieve a Property Definition by identifier
    spec: dtm
---

A device parameter is a fragment on the device managed object, for example `"reportingInterval": 60`. The device parameters feature uses the property definitions of the Digital Twin Manager (DTM) to decide how it treats each parameter. The `identifier` of a property definition equals the fragment name of the parameter.

The `contexts` array of a property definition lists the domain entities that the definition applies to. For device parameters, the contexts have the following effects:

* **Asset**: The device-parameter microservice writes the values that the device reports to the device managed object.
* **Event**: The **Parameters** tab of the device shows the parameter.
* **Operation**: Users can edit the parameter in the **Parameters** tab. Editing creates a `c8y_ParameterUpdate` operation for the device.
* **Measurement**: The **Parameters** tab does not show the parameter.
* **Alarm** and **Audit**: No effect on device parameters.

A parameter that users can only inspect has the contexts asset and event. A parameter that users can also edit has the contexts asset, event, and operation. See [Modeling device parameters](/device-management-application/managing-device-parameters/#modeling-device-parameters).

If no property definition exists for a parameter, or if its definition has no contexts, the device-parameter microservice still writes the reported values to the device managed object.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* Your tenant is subscribed to the Digital Twin Manager microservice `dtm`.
* To create, update, and delete property definitions in the DTM application, you need CREATE or ADMIN permission for the permission type "Inventory".
{{< /c8y-admon-req >}}

The examples use `<property_name>` for the fragment name of the parameter, for example `reportingInterval`.

### To list property definitions {#to-list-property-definitions}

Send a [Retrieve all Property Definitions](https://{{< domain-c8y >}}/api/dtm/#operation/getPropertyDefinitions) request:

```http
GET /service/dtm/definitions/properties?pageSize=100&currentPage=1
```

You can filter the list with the following query parameters:

* `identifiers`, `titles`, and `tags`: Comma-separated lists of values. The platform combines the values within a filter with OR, and the filters with AND.
* `applicableTo`: Returns only the definitions that apply to one context, for example `applicableTo=operation`.

The platform returns HTTP 200 and the following properties:

* `definitions`: The property definitions, each with its `identifier`, `jsonSchema`, `contexts`, `tags`, `creationTime`, and `lastUpdated`.
* `statistics`: The `currentPage`, `pageSize`, `totalPages`, and `totalElements` of the result.

If `totalPages` is greater than `currentPage`, request the next page with `currentPage` increased by one.

If the platform returns HTTP 403 with the message "Microservice dtm is not subscribed by tenant ...", the tenant is not subscribed to the DTM microservice. If the message is "Access Denied. Management tenant is not permitted.", you sent the request to the {{< management-tenant >}}. Send it to a subtenant instead.

### To find the definition of a parameter {#to-find-the-definition-of-a-parameter}

Send a [Retrieve all Property Definitions](https://{{< domain-c8y >}}/api/dtm/#operation/getPropertyDefinitions) request with the name of the parameter in the `identifiers` filter:

```http
GET /service/dtm/definitions/properties?identifiers=<property_name>
```

The platform returns HTTP 200. Check the response:

* The `definitions` array contains the definition: Read its `contexts` array and compare it with the effects described above.
* The `definitions` array is empty: No definition exists for the parameter. The device-parameter microservice writes the reported values to the device managed object anyway.

### To check whether a definition applies to a context {#to-check-whether-a-definition-applies-to-a-context}

To check one context only, for example whether users can edit the parameter, send a [Retrieve a Property Definition by identifier](https://{{< domain-c8y >}}/api/dtm/#operation/getPropertyDefinition) request with the context in the `applicableTo` query parameter:

```http
GET /service/dtm/definitions/properties/<property_name>?applicableTo=operation
```

The `applicableTo` parameter accepts `measurement`, `event`, `alarm`, `audit`, `operation`, `asset`, and `tenant_option`.

* **HTTP 200**: The response contains the definition, and the definition applies to the context.
* **HTTP 404**: No definition with this identifier applies to the context.
* **HTTP 400**: The identifier is invalid. An identifier starts with a letter or a digit, and contains no whitespace.

Always send `applicableTo` with this request. Without it, the platform only returns a definition that applies to no context, and returns HTTP 404 for all other definitions.

To change the contexts of a definition, edit the property definition in the DTM application, see [Property definitions](/dtm/asset-types/#asset-properties).
