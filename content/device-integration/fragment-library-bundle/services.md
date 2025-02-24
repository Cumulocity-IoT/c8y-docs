---
weight: 180
title: Services
layout: bundle
sector:
  - device_management
---

The {{< product-c8y-iot >}} UI allows you to monitor software services running on a device. The services are represented
in {{< product-c8y-iot >}} domain model as the device managed object child additions with `c8y_Service` type.

The **Device details** page shows a **Services** tab for devices that have at least one software service. A service can
have measurements, alarms and events assigned.

Query, update, add and remove services using {{< product-c8y-iot >}} REST API for manipulating managed objects.

### REST API examples

#### Announcing a service to the platform {#announcing-a-service-to-the-platform}

Using the Inventory REST API:

```http
POST /inventory/managedObjects/<deviceId>/childAdditions

Content-Type: "application/vnd.com.nsn.cumulocity.managedObject+json"
```

```json
{
  "name": "DatabaseService",
  "type": "c8y_Service",
  "serviceType": "systemd",
  "status": "up"
}
```

| Field       | Mandatory | Details |
| ----        | ----      | ----    |
|name         | Yes       | Name of the service |
|type         | Yes       | Type of the managed object, must always be 'c8y_Service'|
|serviceType  | Yes       | An arbitrary string for organizing services|
|status       | Yes       | 'up', 'down', 'unknown' or any custom service status|

Using [SmartREST static template 102](/smartrest/mqtt-static-templates/#102) sent to topic `s/us/<serviceId>`:

The second parameter, the unique ID, does not reference the internal numeric ID but a string-based external ID which is defined by the device instead of the platform.
We recommend you to prefix the unique ID with a device-specific prefix to avoid clashes with other devices running the same service:

`102,myDatabaseDevice,systemd,DatabaseService,up`

#### Updating the status of a service {#updating-the-status-of-a-service}

Using Inventory REST API:

```http
PUT /inventory/managedObjects/<serviceId>

Content-Type: "application/vnd.com.nsn.cumulocity.managedObject+json"
```

```json
{
  "status": "down"
}
```

| Field | Mandatory | Details |
| ----  | ----      | ----    |
|status | Yes       | 'up', 'down', 'unknown' or any arbitrary string specifying the service status|

Or using [SmartREST static template 104](/smartrest/mqtt-static-templates/#104) sent to topic `s/us/<serviceId>`:

`104,down`

#### Sending service data {#sending-service-data}

Measurement REST API:

```http
POST /measurement/measurements

Content-Type: "application/vnd.com.nsn.cumulocity.measurement+json"
```

```json
{
  "source": {
    "id": "<serviceManagedObjectId>"
  },
  "time": "2020-03-19T12:03:27.845Z",
  "type": "c8y_Memory",
  "c8y_Memory": {
    "allocated": {
      "unit": "MB",
      "value": 100
    }
  }
}
```


Or using [SmartREST static template 200](/smartrest/mqtt-static-templates/#200) sent to topic `s/us/<serviceId>`:

`200,c8y_Memory,allocated,100,MB`

Similarly to measurements, alarms and events associated with the service can also be sent.

### Service commands {#service-commands}

A service can announce its capability to receive commands by adding the ```c8y_ServiceCommand``` operation in its ```c8y_SupportedOperations```.
This allows the service to execute predefined or custom commands sent from the platform.

#### Available service commands

The list of commands a service supports is defined in the `c8y_SupportedServiceCommands` fragment. If this fragment is not present,
the system assumes a default set of commands: `START`, `STOP`, and `RESTART`.

```json
{
  "c8y_SupportedServiceCommands": [
    "START",
    "STOP",
    "SAVE_SNAPSHOT"
  ]
}
```

| Name                          | Type   | Mandatory | Description |
|--------------------------------|--------|-----------|-------------|
| `c8y_SupportedOperations`    | Array  | Yes       | Must include `c8y_ServiceCommand` to enable command support. |
| `c8y_SupportedServiceCommands` | Array  | No        | List of available commands for the service. If not provided, defaults to `START`, `STOP`, `RESTART`. |

#### Executing service commands

When a command is sent, the following operation structure is created:

```json
{
  "deviceId": "<serviceManagedObjectId>",
  "c8y_ServiceCommand": {
    "command": "START",
    "serviceName": "Nginx Web Server",
    "serviceType": "systemd"
  }
}
```

The operation is then processed by the device, executing the command and updating its status accordingly.
