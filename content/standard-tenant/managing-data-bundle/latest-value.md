---
weight: 30
title: Latest measurement values
layout: redirect
sector:
  - platform_administration
---

This section describes how to create a configuration for automated persistence of measurement values under the `c8y_LatestMeasurements` fragment.

### How to enable it

Use the tenant options to create a category named `measurement.series.latestvalue` with a PUT request to a [tenant options category](https://{{< domain-c8y >}}/api/core/#operation/putCategoryOptionResource).
Example:
```
PUT /tenant/options/measurement.series.latestvalue
{
  "c8y_Humidity.H":"", // to enable single series c8y_Humidity.H
  "c8y_Temperature.*":"" // to enable series under fragment c8y_Temperature
  // or "*":"" to enable all
}
```
where the key is a filter of measurement series that must be persistent and its value must always be an empty string (left for a future use case).  

{{< c8y-admon-important >}}
Property names used for fragment and series must not contain whitespaces nor the special characters ``` $ & + , / : ; = ? @ " < > # % { } | \ ^ ~ [ ] ` ```. This is necessary to ensure the new tenant option is processed correctly and saved successfully.
{{< /c8y-admon-important >}}

### How it works

If a measurement is created with a series that matches the configuration the device managed object
is updated with the last series sent to the platform.
Example:

If you send
```
POST /measurement/measurements
{
  "source":"5413"
  "time":"2024-02-01T10:00:00Z"
  "c8y_Temperature":{
     "T": {
        "value": 15,
        "unit":"C"
     }
  }
  "c8y_Speed":{
    "S": {
      "value": 15,
      "unit":"m/s"
    }
  }
}
```
then, considering the example configuration, only `c8y_Temperature.T` is stored as part of the device, while `c8y_Speed.S` is ignored.
This means, that the measurement is stored like before, only the state update is skipped.
To read the latest values on device level you must use the Inventory API and explicitly specify the `withLatestValues` parameter. For more information refer to the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource).
To get a single device:
```
GET /inventory/managedObjects/5413?withLatestValues=true
{
   ...
   "c8y_LatestMeasurements":{
        "c8y_Temperature":{
           "T":{
             "value":15,
             "time":"2024-02-01T10:00:00Z",
             "unit":"C"
           }
        }
   }
}
```
To get a list of devices matching the expected criteria,
for example, get all devices which have a reported temperature higher than 10 degrees:

```
GET /inventory/managedObjects?withLatestValues=true&query=$filter=c8y_LatestMeasurements.c8y_Temperature.T.value+gt+10
{
  managedObjects: [
    {
        ...
        "c8y_LatestMeasurements":{
            "c8y_Temperature":{
                "T":{
                    "value":15,
                    "time":"2024-02-01T10:00:00Z",
                    "unit":"C"
                }
            }
        }
    }
  ]
}
```

In scenarios where measurements are delayed in arriving (due to network latency or other factors), the system may incorrectly display them as the latest measurement, even though they are technically out of order.  
To address this, the toggle `strongConsistency` is provided. When this value is set, the out-of-order measurements will not be shown as the latest data for the device, regardless of when they were actually received. Instead, only measurements that arrive in the correct order will be treated as the latest, ensuring that the most accurate, timely data is always presented.  

The toggle can be set individually for each measurement fragment to allow fine-grained control over which measurement fragments are affected:
```
PUT /tenant/options/measurement.series.latestvalue
{
    "c8y_Humidity.H": "",
    "c8y_Temperature.*": "strongConsistency"
}
```
or it can be set globally, which will apply the setting to all measurement fragments from the device:
```
PUT /tenant/options/measurement.series.latestvalue
{
    "c8y_Humidity.H": "",
    "c8y_Temperature.*": "",
    "*": "strongConsistency"
}
```
It’s important to note that setting `strongConsistency` may slightly slow down the measurement injection process, as the system now needs to check the arrival time of each measurement to determine if it is delayed. This ensures that outdated or late data does not interfere with the integrity of the latest measurement display.

### Previous measurements values {#previous-measurement-values}

#### How to configure it {#how-to-configure-previous-measurement-values}

This functionality enables the storage and querying of measurement values that have the second most recent arrival time. Retrieving not only the most recent value but also the one before is often necessary — for example, to calculate trends or detect changes over time.
By default, this feature is enabled globally, but it can be configured at the tenant level via an API request.  
To manage automated persistence of previous measurement values on tenant level use the tenant options to create a new category named `measurement.series.previousvalue.enabled` with a PUT request to a [tenant options category](https://{{< domain-c8y >}}/api/core/#operation/putCategoryOptionResource).
Example:
```
POST /tenant/options/

 {
    "category": "configuration",
    "key": "measurement.series.previousvalue.enabled",
    "value": "true" //or "false" if the functionality needs to be disabled for a specific tenant
} 

```

#### How it works {#how-previous-measurement-values-work}

To retrieve previous values at the device level, you must use the Inventory API and explicitly include the `withLatestValues` parameter. For more information refer to the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource).
The measurements returned belong to a series that matches the configuration of the latest values, allowing you to access both the most recent and previous measurements within the same series:

```
GET /inventory/managedObjects/5413?withLatestValues=true
{
   ...
   "c8y_LatestMeasurements":{
        "c8y_Temperature":{
           "T":{
             "value":15,
             "time":"2024-02-01T10:00:00Z",
             "unit":"C"
           }
        }
   },
    "c8y_PreviousMeasurements": {
        "c8y_Temperature": {
            "T": {
                "value": 30,
                "time": "2024-02-01T09:00:00Z",
                "unit": "C"
            }
        }
    }
}
```

### Implications & precondition

This feature introduces an additional operation upon measurement creation.
This results in performance degradation, depending on the number of series
stored per measurement, reaching from 5% for single series in each measurement to
more than 20% in case of 50 series per measurement. Such drawback applies if the text index is disabled. In other cases,
the performance degradation can be much higher, up to more than 100%. Therefore
disabling the text index is considered as a precondition.

### Limitations

**Security**

The latest measurement values are part of the managed object and they follow the managed object inventory role permissions instead of respecting the inventory roles for measurements.

**Data model**

The latest measurements do not store the measurement type. This information
can be obtained using the [Measurements API](https://{{< domain-c8y >}}/api/core/#tag/Measurement-API).

**Last value**

The value stored in the device managed object is the last value sent to the platform.
If measurements are delivered to the platform in a different order than their creation time,
then the latest values may be affected — unless the `strongConsistency` toggle is enabled.

