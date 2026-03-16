---
weight: 190
title: Device parameter
layout: bundle
sector:
  - device_management
---

The **Device parameter** tab allows users to modify granular, atomic state variables on a connected device without transmitting an entire monolithic configuration file. The data structures are expressed as fragments that manage discrete parameters, such as Modbus register numbers, filtering times, or polling intervals.

This functionality is automatically enabled for all devices whose communicated parameters match asset property definitions configured in the Digital Twin Manager application.

### Parameter status {#parameter-status}

Devices are responsible for communicating their current parameter status to the platform. To establish an auditable, time-series-based ledger of parameter shifts, devices must emit an event whenever a local parameter changes. The platform automatically intercepts events of this specific type and asynchronously mirrors the parameters directly into the device's managed object representation in the inventory.

```http
POST /event/events
```
```json
{
   "source": {
       "id": "12345"
   },
   "type": "c8y_ParameterUpdate",
   "text": "Relay status updated",
   "time": "2021-10-07T12:00:00.000Z",
   "c8y_RelayStatus": {
       "left": true,
       "right": false
   }
}
```
|Name|Data type|Mandatory|Description|
|----|----|----|----|
|type|string|Yes|The event type must be strictly defined as ```c8y_ParameterUpdate``` to trigger the platform's internal state-mirroring engine.|
|text|string|Yes|A human-readable description of the event, for example, "Relay status updated".|
|time|string|Yes|The ISO-8601 formatted timestamp of the event occurrence.|
|[Custom Fragments]|object|No|The actual parameters that were updated, structured as individual fragments or nested objects reflecting the device's data model, for example, ```c8y_RelayStatus```.|

#### SmartREST example {#smartrest-example-status}

{{< product-c8y-iot >}} provides the static SmartREST template 408 to create device parameter update events. This template enforces the event type as ```c8y_ParameterUpdate``` and features a change detection functionality. This means events are created only if the reported state differs from the currently known state in the inventory.

`408,,,,c8y_RelayStatus.left,BOOLEAN,true,c8y_RelayStatus.right,BOOLEAN,false`

### Parameter update {#parameter-update}

When a user or microservice initiates a remote parameter modification, the platform creates an operation containing the ```c8y_ParameterUpdate``` fragment marker. This operation directs the device agent to apply specific key-value modifications to its local memory.

To enable updating parameters remotely, devices must include the ```c8y_ParameterUpdate``` in their ```c8y_SupportedOperations```. Additionally each respective parameter must be modeled as asset property definitions in the Digital Twin Manager application with the context "Operation".
```json
{
   "deviceId": "12345",
   "c8y_RelayStatus": {
       "left": false,
       "right": true
   },
   "c8y_ParameterUpdate": {},
   "c8y_ParameterUpdate_c8y_RelayStatus": {}
}
```
|Name|Data type|Mandatory|Description|
|----|----|----|----|
|[Custom Fragment]|object|Yes|The actual configuration fragment containing the updated key-value parameters, for example, ```c8y_RelayStatus```.|
|c8y_ParameterUpdate|object|Yes|An empty marker fragment identifying the targeted parameter modification request.|
|c8y_ParameterUpdate_<fragment>|object|Yes|An empty marker fragment identifying the specific configuration fragment being updated, for example, ```c8y_ParameterUpdate_c8y_RelayStatus```.|

When the device receives the ```c8y_ParameterUpdate``` operation, it is expected to perform the following actions:

1. Set the operation status to EXECUTING.
2. Apply the specific parameter configurations to the physical hardware or internal software layer.
3. Update the parameter status in the platform by sending a parameter update event.
4. Set the operation status to SUCCESSFUL or FAILED if the configuration cannot be applied.

#### SmartREST example {#smartrest-example-update}

{{< product-c8y-iot >}} provides the 532 static response template to receive parameter update operations. This template is designed to accommodate a variable number of parameters using a repeating 3-set sequence of name (representing the fragment path), type, and value:

1. Receive the ```c8y_ParameterUpdate``` operation via the 532 static response template <br>
   `532,DeviceSerial,c8y_RelayStatus.left,b,false,c8y_RelayStatus.right,b,true`
2. Set the operation status to EXECUTING <br>
   `501,c8y_ParameterUpdate`
3. Apply the specific parameter configurations to the physical hardware or internal software layer.
4. Report the new status. Use the 408 template to report the new status to the cloud. <br>
   `408,,,true,c8y_RelayStatus.left,BOOLEAN,false,c8y_RelayStatus.right,BOOLEAN,true`
5. Set the operation status to SUCCESSFUL <br>
   `503,c8y_ParameterUpdate`



