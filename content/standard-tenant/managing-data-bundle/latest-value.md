---
weight: 30
title: Latest measurement values
layout: redirect
sector:
  - platform_administration
---
{{< c8y-admon-preview >}}
This section describes how to create a configuration for automated persistence of measurement values under the `c8y_LatestMeasurements` fragment.

### How to enable it

Use the tenant options to create a category named `measurement.series.latestvalue` with a PUT request to a [tenant options category](https://{{< domain-c8y >}}/api/core/#operation/putCategoryOptionResource).
Example:
```
PUT /tenant/options/measurement.series.latestvalue
{
  "c8y_Humidity.H":"", // to enable single series c8y_Humidity.H
  "c8y_Temperature.*":"", // to enable series under fragment c8y_Temperature
  // or "*":"" to enable all
}
```
where the key is a filter of measurement series that must be persistent and its value must always be an empty string (left for a future use case).

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
then,  considering the example configuration, only `c8y_Temperature.T` is stored as part of the device, while `c8y_Speed.S` is ignored.
This means, that the measurement is stored like before, only the state update is skipped.
To read the latest values on device level you must use the Inventory API and explicitly specify the `withLatestValues` parameter. For more information refer to the [{{< openapi >}}](https://www.{{< domain-c8y >}}/api/core/#operation/getManagedObjectResource).
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
can be obtained using the [Measurements API](https://www.{{< domain-c8y >}}/api/core/#tag/Measurement-API).

**Last value**

The value stored in the device managed object is the last value sent to the platform.
If the order of measurement delivery to the platform is different from the measurement creation time
then the latest values will also be affected.

{{< /c8y-admon-preview >}}
