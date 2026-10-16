---
title: Manage OPC UA device types
description: Create an OPC UA device type that maps server nodes to measurements, events, and alarms, check which nodes it matches, enable, update, and delete it with the OPC UA management service.
weight: 640
requires:
  - authentication
api:
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
---

An OPC UA device type, called device protocol in the UI, maps nodes of an OPC UA server to measurements, events, and alarms in {{< product-c8y-iot >}}. When you enable a device type, the gateway looks for nodes in the address space that match its browse paths and constraints. For each matching node, it creates a child device of the server and sends the data of the mapped nodes to this device. See [Device protocols](/device-integration/opcua/#device-protocols).

You manage device types with the REST API of the OPC UA management service, see [Device type resources](/device-integration/opcua/#device-type-resources). The service does not support partial updates. When you update a device type, the body that you send replaces the stored device type completely.

Requests to the OPC UA management service go to `/service/opcua-mgmt-service`. Your tenant must be subscribed to the "opcua-mgmt-service" microservice. Otherwise, the requests return HTTP 403 with the error `Microservice/Access Denied`.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list and read device types: ROLE_OPCUA_SERVICE_READ
* To create, update, and delete device types: ROLE_OPCUA_SERVICE_ADMIN
* To check which nodes a device type matches: ROLE_DEVICE_CONTROL_ADMIN and ROLE_DEVICE_CONTROL_READ
* To read the events of the server: ROLE_EVENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_type_id>` for the ID of the device type, `<server_id>` for the managed object ID of an OPC UA server, and `<operation_id>` for the ID of an operation.

### To create a device type {#to-create-a-device-type}

Send a request to the OPC UA management service, see [Creating a new device type](/device-integration/opcua/#creating-a-new-device-type):

```http
POST /service/opcua-mgmt-service/device-types
Content-Type: application/json
Accept: application/json

{
  "name": "My device type",
  "enabled": false,
  "mappings": [
    {
      "browsePath": ["2:Dynamic", "2:Double"],
      "measurementCreation": {
        "type": "MyMeasurementType",
        "fragmentName": "MyMeasurement",
        "series": "MySeries",
        "unit": "T"
      }
    }
  ],
  "subscriptionType": {
    "type": "Subscription",
    "subscriptionParameters": {
      "samplingRate": 5000
    }
  }
}
```

The request has the following main properties:

* `name`: The name of the device type. Mandatory.
* `enabled`: If `true`, the gateway applies the device type to the connected servers. The default is `false`. Create the device type disabled, check it, and enable it afterwards.
* `mappings`: One entry per node to map. The `browsePath` is the path to the node, either exact or as a regular expression in `regex(...)`. Each browse path must be unique. Each mapping contains what to create from the value of the node:
  * `measurementCreation` with `type` and `unit`. Without `fragmentName` and `series`, the gateway generates them.
  * `eventCreation` with `type` and `text`. The text can contain the placeholder `${value}`.
  * `alarmCreation` with `type`, `text`, and `severity`, which is WARNING, MINOR, MAJOR, or CRITICAL.
  * `customAction` with an `endpoint` and a `bodyTemplate` for an HTTP POST request.
* `uaEventMappings`: Mappings from OPC UA events to {{< product-c8y-iot >}} events and alarms, each with `browsePath`, `eventTypeId`, and `attributes`.
* `subscriptionType`: How the gateway reads the data. Use `Subscription` with `subscriptionParameters.samplingRate`, `CyclicRead` with `cyclicReadParameters.rate`, or `None`. Rates are in milliseconds, with a minimum of 50. Without a subscription type, the gateway applies an enabled device type to no node.
* `applyConstraints`: Limits where the gateway applies the device type, for example to servers in `matchesServerIds` or to nodes whose browse path matches `browsePathMatchesRegex`.
* `referencedNamespaceTable`: The namespace table of the server. The service uses it to convert browse paths with a namespace index, such as `2:Dynamic`, to namespace URIs. This keeps the mappings stable if the namespace index changes.

For all properties and more examples, see [Creating a new device type](/device-integration/opcua/#creating-a-new-device-type).

The service returns HTTP 200 and the device type with its `id`. Note the `id` as `<device_type_id>`.

If the service returns HTTP 400 with the error "Validation error", the body is not valid. For example, the `name` is empty, a `samplingRate` is below 50, two mappings have the same `browsePath`, or a node ID in `applyConstraints` is not valid.

### To list and read device types {#to-list-and-read-device-types}

To list all device types, send a request to the OPC UA management service, see [Get all OPC UA device types](/device-integration/opcua/#get-all-opc-ua-device-types):

```http
GET /service/opcua-mgmt-service/device-types
```

The service returns HTTP 200 and an array of all OPC UA device types.

To read one device type, see [Get a single device type](/device-integration/opcua/#get-a-single-device-type):

```http
GET /service/opcua-mgmt-service/device-types/<device_type_id>
```

The service returns HTTP 200 and the device type. If it returns HTTP 404, the device type does not exist.

### To check which nodes a device type matches {#to-check-which-nodes-a-device-type-matches}

Before you enable a device type, check on a server which nodes it would match. This is a dry run: the gateway does not apply the device type.

1. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request for the server:

    ```http
    POST /devicecontrol/operations
    Content-Type: application/json
    Accept: application/json

    {
      "deviceId": "<server_id>",
      "description": "Dry run device type",
      "c8y_ua_command_DryRunDeviceTypeMatching": {
        "deviceTypeId": "<device_type_id>"
      }
    }
    ```

    The platform returns HTTP 201 and the operation with its `id`. Note the `id` as `<operation_id>`.

2. Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

    ```http
    GET /devicecontrol/operations/<operation_id>
    ```

    Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation).

When the operation is SUCCESSFUL, `c8y_Command.result` describes the nodes to which the gateway would apply the device type, and `c8y_Command.matchedNodes` lists them with their `nodeId` and the mapped target nodes.

The gateway executes two further operations for the server in the same way:

* `c8y_ua_command_TestDeviceTypeMatching` with `deviceTypeId` and `rootNodeId`: Tests the device type against one node. The result is `"matches": true`, or `"matches": false` with a `reason`.
* `c8y_ua_command_GetDeviceTypeApplicationState` with `deviceTypeId` and, optionally, `matchingRootNodes`: Returns a map from node ID to `true` or `false`, which shows whether the gateway applied the device type to the node.

See [Analyzing the set of nodes to which a device type can be applied](/device-integration/opcua/#analyzing-the-set-of-nodes-to-which-a-device-type-can-be-applied-dry-run) for details. If an operation stays PENDING, the gateway is offline. To cancel it, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).

### To enable or update a device type {#to-enable-or-update-a-device-type}

Send a request to the OPC UA management service with the complete device type, see [Updating a device type](/device-integration/opcua/#updating-a-device-type). The example enables the device type:

```http
PUT /service/opcua-mgmt-service/device-types/<device_type_id>
Content-Type: application/json
Accept: application/json

{
  "name": "My device type",
  "enabled": true,
  "mappings": [
    {
      "browsePath": ["2:Dynamic", "2:Double"],
      "measurementCreation": {
        "type": "MyMeasurementType",
        "fragmentName": "MyMeasurement",
        "series": "MySeries",
        "unit": "T"
      }
    }
  ],
  "subscriptionType": {
    "type": "Subscription",
    "subscriptionParameters": {
      "samplingRate": 5000
    }
  }
}
```

The body replaces the stored device type. The service removes every property that you do not send. Read the device type first and send it completely with your changes.

The service returns HTTP 200 and the updated device type. If it returns HTTP 204 without a body, it stored the update. Read the device type to check it. If it returns HTTP 404, the device type does not exist. If it returns HTTP 400, the body is not valid, as for creating a device type.

### To check that the gateway applied the device type {#to-check-that-the-gateway-applied-the-device-type}

When the gateway applies a device type to a node or removes it from a node, it creates an event for the server. See [Monitoring events for device protocol application](/device-integration/opcua/#monitoring-events-for-device-protocol-application).

Send a [Retrieve all events](https://{{< domain-c8y >}}/api/core/#operation/getEventCollectionResource) request for the server:

```http
GET /event/events?source=<server_id>&type=c8y_ua_DeviceTypeApplied
```

The platform returns HTTP 200. The `text` of each event in the `events` array names the device type, the root node to which the gateway applied it, and the server. When the gateway removes a device type from nodes, it creates events of type `c8y_ua_DeviceTypeUnapplied`.

### To delete a device type {#to-delete-a-device-type}

Send a request to the OPC UA management service, see [Deleting a device type](/device-integration/opcua/#deleting-a-device-type):

```http
DELETE /service/opcua-mgmt-service/device-types/<device_type_id>
```

The service returns HTTP 204. If it returns HTTP 404, the device type is already deleted.
