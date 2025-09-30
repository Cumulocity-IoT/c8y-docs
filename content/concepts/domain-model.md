---
weight: 20
title: Cumulocity's domain model
layout: bundle
sector:
  - getting_started
---

The following image shows the relevant aspects of devices and assets in the Internet of Things:

![Domain model](/images/concepts-guide/model.png)

* The **inventory** stores all master data related to devices, their configuration and their connections. It also contains all related assets (like vehicles, machines, buildings) and their structure.

* **Measurements** contain numerical data produced by sensors (like temperature readings) or calculated data based on information from devices (service availability of a device).

* **Events** contain other real-time information from the sensor network, such as the triggering of a door sensor. Events can also be **alarms**.The user or operator of the system must take action to resolve the alarm (like a power outage). In addition, security-related events are shown as **audit logs**.

* **Operations** relate to data that is sent to devices for execution or processing, such as switching a relay in a power meter or sending a credit to a vending machine.

One of the great innovations in {{< product-c8y-iot >}} is its standardized representation of common devices and sensors as well as concepts for flexibly extending and modifying this representation. By default, {{< product-c8y-iot >}} comes with detailed visualizations of sensors, smart meters, trackers and other devices. It has many options to fit in local customizations.

As a result, Internet of Things applications can be written independently from connected devices and underlying sensor networks, customized for specific cases in different web configurations or different devices from manufacturers.

### Fragments {#fragments}

The key concept that allows for flexibly extending and modifying all objects in the {{< product-c8y-iot >}} domain model is called fragment.

To understand the fragment concept, imagine, for example, that you want to describe electric meters from different vendors. Depending on the make of the meter, one may have a relay and one may be able to measure a single phase or three phases. These characteristics are identified by storing fragments for each of them:

```json
{
    "id": "47035",
    "type": "elstermetering_AS220",
    "lastUpdated": "2010-11-13T18:28:36.000Z",
    "c8y_Position": {
        "alt": 67,
        "lng": 6.15173,
        "lat": 51.211977
    },
    "c8y_ThreePhaseElectricitySensor": {},
    "c8y_Relay": {
        "state": "CLOSED"
    }
}
```

In this example, a fragment `c8y_ThreePhaseElectricitySensor` identifies a three phase electric meter. In addition, the device includes a relay, which can be used to turn the power supply on and off.

Using this approach, the modeling devices can make a difference between modeling elementary sensors and controls as fragments, and modeling the entire device as a combination of sensors, controls and possibly proprietary aspects of the device.

The approach also enables developing generic application components. For example, as soon as a managed object has a position fragment (`c8y_Position`), it can be placed on a map. As soon as it has a relay (`c8y_Relay`), it can be switched on and off using the respective device control command as described below.

For more information about various Device Management functionalities and their associated fragments, see also [Fragment library](/device-integration/fragment-library/).

While designing the data models, consider the following:
1. There is no size or length constraint for a single fragment, but there is a limitation for the overall JSON document size, which may not exceed 16MiB for a single managed object entry within the inventory collection. We recommend you to keep it below 1 MiB.
2. When designing asset hierarchies, use small groups with less than 1000 subassets. Each subitem in the asset hierarchy creates a reference record in the parent item. Therefore keep in mind the first recommendation regarding the JSON document size.
3. When you include arrays of elements within fragments, keep the length of such collections below 1k elements.
4. Each consecutive fragment added to the managed object at root level imposes a certain delay on querying such an item. If the performance of a query matters, it is recommended to nest custom fragments with information within a chosen single fragment effectively limiting the root fragments number. For example:
```json
{
    "id": "47035",
    "type": "elstermetering_AS220",
    "lastUpdated": "2010-11-13T18:28:36.000Z",
    "c8y_ThreePhaseElectricitySensor": {},
    "c8y_DeviceMetrics": {
        "c8y_ConnectionMetrics": {
            "failures": 0,
            "successful": 1403,
            "total": 1403
        },
        "c8y_Alarms": {
            "requested": 100,
            "successful": 100
        },
        "c8y_Measurements": {
            "requested": 1303,
            "successful": 1303
        }
    },
    "c8y_DeviceMetricsConfiguration": {
        "deviceRepresentationUpdateIntervalCron": "0 22 * * *",
        "monitorApi": [
            "measurements",
            "alarms"
        ]
    }
}
```

#### Naming conventions of fragments {#naming-conventions-of-fragments}

Fragments use a naming convention to avoid conflicts between different parties supplying fragment information, similar to Java or other programming languages.

In the example above, `c8y_Position` is a combination of "c8y" (a shorthand for "Cumulocity"), an underscore and "Position".

{{< c8y-admon-important >}}
Names used for fragments must not contain whitespaces nor the special characters `. , * [ ] ( ) @ $ / '`.
{{< /c8y-admon-important >}}

Note that {{< product-c8y-iot >}} follows a document-oriented approach for storing data. All characteristics of an object can be inferred from the document with the object data itself. There is no explicit separate metadata model that must be configured and managed. However, applications can add own metadata and store values in the inventory additionally. For example, a vending application can maintain metadata about slot configurations of the diverse vending machine types in the inventory.


The following sections are a walk-through of these concepts and will describe the ideas behind it and give you examples which use {{< product-c8y-iot >}}'s REST APIs as format. To use them with different programming languages, refer to the specified samples in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core).
