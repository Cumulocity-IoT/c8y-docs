---
weight: 50
title: Connectivity
layout: bundle
sector:
  - device_management
---

The **Connectivity** tab integrates with a 3rd party SIM management platform to provide SIM management functionality within the {{< product-c8y-iot >}} Device Management application. The tab appears for a device when all of the following criteria are met:

1. Connectivity microservice is subscribed and configured
2. The device managed object contains the ```c8y_Mobile``` fragment with the MSISDN or ICCID property set
3. The SIM referenced by the device is managed by the SIM management provider configured for the tenant

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Mobile": {
       "msisdn": "380561234567",
       "iccid": "89100423481F445593U"
   }
}
```

|Name|Type|Mandatory|Description|
|----|----|----|----|
|msisdn|string|No|MSISDN of the installed SIM|
|iccid|string|No|ICCID of the installed SIM|


Depending on the configured connectivity provider either MSISDN or ICCID may be used to identify the SIM present in the device. We recommend you to always include both into the `c8y_Mobile` fragment. There are many more mobile connection related properties that may also be attached to the `c8y_Mobile` fragment, but only MSISDN or ICCID are relevant for connectivity management.

**SmartREST example**

The 111 static template is provided for devices to communicate their mobile information:

`111,1234567890,8930000000000000459,54353`
