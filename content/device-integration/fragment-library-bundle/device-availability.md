---
weight: 70
title: Device availability
layout: bundle
sector:
  - device_management
---

The **Device availability** tab shows the device's availability and connection status. To achieve this the device must communicate its required interval using the ```c8y_RequiredAvailability``` fragment in the device's own managed object. This action activates availability and connection monitoring for the device.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_RequiredAvailability": {
       "responseInterval": 15
   }
}
```

<table>
<colgroup>
<col width="20%">
<col width="10%">
<col width="10%">
<col width="60%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>responseInterval</td>
<td>integer</td>
<td>No</td>
<td>Expected response interval of the device in minutes. If it is &lt;= 0 the device is considered in maintenance mode.</td>
</tr>
</tbody>
</table>


Usually devices should set their required interval only once during its first connection to the platform with a default value. Later changes can be left to platform users.

**SmartREST example**

The static template 117 is provided to set the required availability for SmartREST connected devices. This template can be sent in a fire-and-forget approach during device startup because it doesn't override already existing required availability configuration:

`117,15`

### Availability monitoring {#availability-monitoring}

The response interval set in the ```c8y_RequiredAvailability``` fragment is used as interval in which the platform expects to receive data from the device. If no data is received in this interval the device will be marked as offline and an alarm of type ```c8y_UnavailabilityAlarm``` will be raised automatically. This alarm will also be cleared automatically when the device sends data again. No further action from the device is necessary.

The availability information computed by {{< product-c8y-iot >}} is stored in the fragments `c8y_Availability` and `c8y_Connection` of the device.

    "c8y_Availability": { "lastMessage": "2022-05-21...", "status": "AVAILABLE" },
    "c8y_Connection": {"status":"CONNECTED"}

|Name|Type|Description|
|:---|:---|:----------|
|lastMessage|Date|The date and time when the device sent the last message to {{< product-c8y-iot >}}.|
|status|String|The current status, one of AVAILABLE, UNAVAILABLE, MAINTENANCE.|


The following requests are considered a device's heartbeat and will mark the device as available and update the last message timestamp of a device,as long as the `X-Cumulocity-Application-Key` header is not set:

 * Creation of an event, measurement or alarm (for given device as source)
 * Updates to the device itself (with a given ID), in the form of empty PUT requests or requests with an ID only, that is `{}` or `{"id": ... }`

{{< c8y-admon-info >}}
Keep in mind that after updating the last message it may take some minutes until the new status has been saved in a database.
{{< /c8y-admon-info >}}

### Connection monitoring {#connection-monitoring}

{{< product-c8y-iot >}} also provides connection monitoring for devices. When the device establishes a connection where it is able to receive operations the platform considers this device as connected. This applies to HTTP longpolling connection or a MQTT session equally.

A monitored device has one of the following statuses for `c8y_Connection`:

| Status (string) | Description                                                                            |
|:----------------|:---------------------------------------------------------------------------------------|
| CONNECTED       | A device push connection is established.                                               |
| DISCONNECTED    | `responseInterval` is larger than 0 and the device is neither AVAILABLE nor CONNECTED. |
| MAINTENANCE     | `responseInterval` is smaller or equal to 0; the device is under maintenance.          |

{{< c8y-admon-info >}}
If a device is not connected via device push, but a message was sent within the required response interval, `c8y_Availability` can still have the status AVAILABLE, even if `c8y_Connection` does not have the status CONNECTED.
{{< /c8y-admon-info >}}
