---
weight: 80
title: Device information
layout: bundle
sector:
  - device_management
---

The **Device information** tab is a predefined dashboard with several widgets that combine default device information. The status widget, for example, will get its information from the ```c8y_Availability``` fragment, which holds information about the device's status and when it was last available. For details see [Availability](/device-management-application/monitoring-and-controlling-devices/#availability).

### Device marker {#device-marker}

 A device is marked in the inventory with a ```c8y_IsDevice``` fragment in its own managed object. Only devices with this fragment appear in the all **All devices** list in the Device Management application.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_IsDevice": {}
}
```

{{< c8y-admon-info >}}
Devices created through SmartREST 2.0 will automatically contain this fragment.
{{< /c8y-admon-info >}}

### Agent marker {#agent-marker}

In order to receive any operation a device must declare the agent marker fragment in its own managed object. This will enable the platform to send operations to this device to for all child devices in its child hierarchy that don’t carry this fragment themselves.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "com_cumulocity_model_Agent": {}
}
```

{{< c8y-admon-info >}}
Devices created through SmartREST 2.0 will automatically contain this fragment.
{{< /c8y-admon-info >}}

### Device restart {#device-restart}

Devices capable of restarting remotely can announce this capability by adding the ```c8y_Restart``` operation to the device's own ```c8y_SupportedOperations``` fragment. Then the **Device details** page will enable a **Restart** button within its context menu.

#### Restart operation {#restart-operation}

Upon clicking the **Restart** button in the Device Management application an operation as follows is sent:

```json
{
  "c8y_Restart": {}
}
```

|Field|Data type|Mandatory|Details|
|----|----|----|----|
|c8y_Restart|object|Yes|Restart marker fragment, that designates this operation as a restart operation|

The device is expected to perform the following actions:
1. Set the operation status to EXECUTING
2. Perform the requested restart
3. Set the operation status to SUCCESSFUL

**SmartREST example**

{{< product-c8y-iot >}} provides the 510 static response template:

1. Device receives command via 510 static response template <br>
  `510,DeviceSerial`
2. Device sets operation status to EXECUTING <br>
  `501,c8y_Restart`
3. Device confirms successful execution by setting operation status to SUCCESSFUL <br>
  `503,c8y_Restart`


### Hardware information {#hardware-information}

Devices may announce their underlying hardware information to {{< product-c8y-iot >}} using the ```c8y_Hardware``` fragment in the device’s own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Hardware": {
       "serialNumber": "1234567890",
       "model": "myModel",
       "revision": "1.2.3"
   }
}
```

|Field|Data type|Mandatory|Details|
|----|----|----|----|
|serialNumber|string|No|The hardware serial number of the device|
|model|string|No|A text identifier of the hardware model|
|revision|string|No|A text identifier of the hardware revision|

**SmartREST example**

Upload hardware information using the 110 static template. Usually this can be done once during agent application startup:

`110,1234567890,myModel,1.2.3`

### Agent information {#agent-information}

All devices should provide information about the agent they are running, that is the software that integrates them with {{< product-c8y-iot >}}.

```http
PUT /inventory/managedObjects/<deviceId>
```

```json
{
   "c8y_Agent": {
       "name": "thin-edge.io",
       "version": "0.6",
       "url": "https://thin-edge.io/",
       "maintainer": "Software AG"
   }
}
```

| Field      | Data type | Mandatory | Details                 |
|------------|-----------|-----------|-------------------------|
| name       | string    | Yes       | Name of the agent       |
| version    | string    | Yes       | Version of the agent    |
| url        | string    | No        | The agent URL           |
| maintainer | string    | Yes       | Maintainer of the agent |

**SmartREST example**

Upload agent details using the [122](/smartrest/mqtt-static-templates/#122) static template:

`122,thin-edge.io,0.6,https://thin-edge.io/,Software AG`

Do this once at agent initialization.
