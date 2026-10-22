---
title: Manage device services
description: List the software services of a device, announce a service and update its status, and send a start, stop, or restart command to a service.
when: "the user wants to list the services of a device, report the status of a service, or start, stop, or restart a service"
weight: 107
requires:
  - authentication
api:
  - operation: getManagedObjectChildAdditionsResource
    method: GET
    path: /inventory/managedObjects/{id}/childAdditions
    title: Retrieve all child additions of a specific managed object
  - operation: postManagedObjectChildAdditionsResource
    method: POST
    path: /inventory/managedObjects/{id}/childAdditions
    title: Assign a managed object as child addition
  - operation: putManagedObjectResource
    method: PUT
    path: /inventory/managedObjects/{id}
    title: Update a specific managed object
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
---

A device can report the software services that run on it, for example a database or a web server. Each service is a managed object of the type `c8y_Service` and a child addition of the device. It has the following properties, which are all required:

* `name`: The name of the service.
* `type`: Always `c8y_Service`.
* `serviceType`: A string of your choice to organize services, for example the init system `systemd`.
* `status`: `up`, `down`, `unknown`, or any custom status.

A service can have its own measurements, alarms, and events. If the service supports commands, you can start, stop, or restart it with a `c8y_ServiceCommand` operation. Use this operation to control a service instead of a shell command. For details, see [Services](/device-integration/fragment-library/#services) in the fragment library.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list services: ROLE_INVENTORY_READ
* To announce services and update their status: ROLE_INVENTORY_ADMIN
* To send service commands: ROLE_DEVICE_CONTROL_ADMIN
* To follow service commands: ROLE_DEVICE_CONTROL_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the managed object ID of the device, `<service_id>` for the managed object ID of the service, and `<operation_id>` for the ID of a service command.

### To list the services of a device {#to-list-the-services-of-a-device}

Send a [Retrieve all child additions of a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectChildAdditionsResource) request with a query for the type `c8y_Service`:

```http
GET /inventory/managedObjects/<device_id>/childAdditions?query=$filter=(type eq 'c8y_Service')&pageSize=2000
```

URL-encode the `query` value. The platform returns HTTP 200 and the `references` array. Each entry contains a service in `managedObject`, with its `id`, `name`, `serviceType`, and `status`.

If the array is empty, the device has not announced any services, and the Device Management application does not show the **Services** tab. If the platform returns HTTP 404, the device does not exist.

### To announce a service {#to-announce-a-service}

Devices announce their services themselves, for example with the [SmartREST static template 102](/smartrest/mqtt-static-templates/#102). To announce a service through the REST API, send an [Assign a managed object as child addition](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectChildAdditionsResource) request with the service as a new managed object:

```http
POST /inventory/managedObjects/<device_id>/childAdditions
Content-Type: application/vnd.com.nsn.cumulocity.managedobject+json
Accept: application/json

{
  "name": "DatabaseService",
  "type": "c8y_Service",
  "serviceType": "systemd",
  "status": "up"
}
```

The platform returns HTTP 201. Note the ID of the service from `managedObject.id` in the response as `<service_id>`. If the response contains no ID, list the services and take the `id` of the service with the name `DatabaseService`.

If the platform returns HTTP 422, the request body is invalid. If it returns HTTP 404, the device does not exist.

### To update the status of a service {#to-update-the-status-of-a-service}

Send an [Update a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectResource) request with the new status:

```http
PUT /inventory/managedObjects/<service_id>
Content-Type: application/json
Accept: application/json

{ "status": "down" }
```

The platform changes only the properties in the request body. It returns HTTP 200 and the service with the new `status`. If the platform returns HTTP 404, the service does not exist.

### To check which commands a service supports {#to-check-which-commands-a-service-supports}

Send a [Retrieve a specific managed object](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource) request for the service:

```http
GET /inventory/managedObjects/<service_id>
```

Check the following properties in the response:

* The array `c8y_SupportedOperations` contains `"c8y_ServiceCommand"`. Otherwise, the service does not accept commands. Do not send a command.
* The array `c8y_SupportedServiceCommands` lists the commands of the service, for example `["START", "STOP", "SAVE_SNAPSHOT"]`. If this fragment is missing, the service supports `START`, `STOP`, and `RESTART`.

### To send a command to a service {#to-send-a-command-to-a-service}

The command is an operation for the managed object of the service, not for the device. Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request with `<service_id>` as the `deviceId`:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<service_id>",
  "description": "RESTART DatabaseService",
  "c8y_ServiceCommand": {
    "command": "RESTART",
    "serviceName": "DatabaseService",
    "serviceType": "systemd"
  }
}
```

The `command` must be one of the commands that the service supports. The device finds the service by the `deviceId`, the `serviceName`, and the `serviceType`, and executes the command.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`.

If the platform returns HTTP 422 with the message `Agent for device '<service_id>' does not exist in inventory!`, the device of the service is not an agent. The platform looks for the agent among the parents of the service, so the device must have the fragment `com_cumulocity_model_Agent`.

### To follow the service command {#to-follow-the-service-command}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request every 5 seconds until the `status` is SUCCESSFUL or FAILED, for example for at most 2 minutes. If the status is FAILED, the `failureReason` property describes why. If the operation stays PENDING, no agent picked it up. For details, see [To follow the status of the operation](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation).

In the Device Management application, you see the services of a device in its **Services** tab and send commands in the **Commands** tab of a service, see [Managing device services](/device-management-application/managing-device-services/).
