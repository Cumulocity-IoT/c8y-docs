---
weight: 20
title: Inventory
layout: redirect
---

### Managed objects {#managed-objects}

The inventory stores devices and other assets relevant to your IoT solution. We refer to them as *managed objects*.

Managed objects can be "smart objects" such as smart electricity meters, home automation gateways and GPS devices. They can be assets you would like to monitor, such as rooms in which sensors are installed, or cars containing GPS devices.

The following JSON code shows a small example of a managed object in the inventory, in this case a simple switch.

```json
{
    "id": "47635",
    "name": "Smart switch",
    "type": "ge_45609",
    "c8y_Relay": {
        "state" : "OPEN"
    }
}
```

An example for another asset stored in the inventory could be a room in which a switch is installed (compare the `id` property of the above switch with the `managedObject` in the child asset reference below).

```json
{
    "id": "59436",
    "type": "resortenergymgmt_Room",
    "name": "Sauna room",
    "childAssets": {
        "references" : [
            {
                "managedObject": {
                    "id": "47635"
                }
            }
        ]
    },
    "resortenergymgmt_RoomProperty": {
		"size": 56
    }
}
```

In general, each managed object consists of:

*  A unique identifier that references the object.
*  The name of the object.
*  The most specific type of the managed object.
*  A time stamp showing the last update.
*  Fragments with specific meanings, for example, `c8y_IsDevice`.
*  Any additional custom fragments.

### Fragments {#fragments}

Imagine, for example, that you want to describe electric meters from different vendors. Depending on the make of the meter, one may have a relay and one may be able to measure a single phase or three phases. These characteristics are identified by storing fragments for each of them:

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

For more information on fragments and how managed objects are structured, see [Fragment library](/device-integration/fragment-library/).

<a name="document-limits"></a>{{< c8y-admon-info >}}
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
{{< /c8y-admon-info >}}

#### Naming conventions of fragments {#naming-conventions-of-fragments}

Fragments use a naming convention to avoid conflicts between different parties supplying fragment information, similar to Java or other programming languages.

In the example above, `c8y_Position` is a combination of "c8y" (a shorthand for "Cumulocity"), an underscore and "Position". Together they form a set of standard fragments. Fragment definitions can be found in the [fragment library](/device-integration/fragment-library/).

{{< c8y-admon-important >}}
Names used for fragments must not contain whitespaces nor the special characters `. , * [ ] ( ) @ $ / '`.
{{< /c8y-admon-important >}}

Note that {{< product-c8y-iot >}} follows a document-oriented approach for storing data. All characteristics of an object can be inferred from the document with the object data itself. There is no explicit separate metadata model that must be configured and managed. However, applications can add own metadata and store values in the inventory additionally. For example, a vending application can maintain metadata about slot configurations of the diverse vending machine types in the inventory.

### Object identification {#object-identification}

Each managed object in the inventory has an own, unique and global identifier that is automatically generated by {{< product-c8y-iot >}} when the object is created.

This identifier will always stay with the object regardless of network restructures or different hardware parts.

![Identity service](/images/concepts-guide/identification.png)

To shield applications from these numbers of identifiers, {{< product-c8y-iot >}} includes an identity service that registers all identifiers for one asset that are used outside of {{< product-c8y-iot >}} and map these to a single global identifier that is used by applications.

This service is used by agents (to register external identifiers) and by business processes involving reorganisations and changes of devices (to modify maps of external identifiers to global identifiers).

As an example, assume that a smart meter would be faulty and a new meter with another meter number and asset tag must be installed in a household. The routine business process for replacing faulty hardware can now just update the asset tag and meter ID associated with a customer in the identity service. Afterwards, both previously collected and new meter readings are related to the correct customer.

More information can be found in [Identity](https://{{< domain-c8y >}}/api/core/#tag/Identity-API) in the {{< openapi >}}.

### Object hierarchies {#object-hierarchies}

The inventory model supports two default hierarchies of objects: A communication hierarchy ("childDevices") and an asset hierarchy ("childAssets").

The communication hierarchy tracks how devices are linked to the IoT platform from a communication point of view. Agents connect the sensor network to {{< product-c8y-iot >}}. They often communicate through gateway devices or modems with the sensor network. The gateways, in reverse, connect to devices in the sensor network, which contain sensors and controls. This typical communication hierarchy is shown in the picture below.

![Example communication hierarchy](/images/concepts-guide/commshierarchy.png)

The asset hierarchy structures the assets that are remotely supervised and controlled through the IoT devices.

An example asset hierarchy for building management could be buildings containing rooms. Buildings would be associated with gateways connecting the building to {{< product-c8y-iot >}}, while rooms would be associated with sensors and controls. This example hierarchy is shown in the picture below.

![Example asset hierarchy](/images/concepts-guide/assethierarchy.png)

#### Child objects in hierarchies {#child-objects-in-hierarchies}

The two hierarchies above are explicitly supported by the [inventory interface](https://{{< domain-c8y >}}/api/core/#tag/Inventory-API) and client libraries, that provide methods for adding and removing children in hierarchies. The hierarchies themselves are constructed by client applications. The communication hierarchy is constructed by agents, the asset hierarchy is added by applications on top.

Note that the object hierarchies do not necessarily need to form a tree, the same asset can be a child of multiple parent assets. This enables applications to create additional, user-defined groups of objects such as working sets or virtual networks. Applications can, in addition, use fragments to define arbitrary alternative hierarchies.

### Object lifecycle {#object-lifecycle}

The previously described identification and hierarchy mechanisms form a very flexible device lifecycle approach that can be adapted to most business processes. Initially, when a device is powered on for the first time, it is neither connected to the system nor linked to an asset. Linking a device to an agent in the communication hierarchy (possibly indirectly through a gateway) signals that the device is connected. Only connected devices can be remotely controlled. Linking a device to an asset using the asset hierarchy can be used to signal that the device has been physically installed.

Disconnecting and uninstalling a device does not necessarily indicate that the device was discarded or deactivated and should be deleted from the system. It can indicate instead that the device was returned to the warehouse and will be installed elsewhere later on. It depends on the particular business process whether data for the device should be kept or not. Physically deleting a device from the inventory implies that all data collected for that device is lost – this is probably desired only when completely cleaning up old data. To keep data for a device that has been discarded, identifier mappings can be removed from the identity service. Should a new device be installed in the same place as the old device, a new global identifier will be generated.

Addressing the device lifecycle properly is important when designing agents. An agent connecting to devices should not assume automatically that devices can be deleted from the inventory when they cannot be connected to. In the same way, an agent interfacing a CRM system should not assume that a device can be deleted when it has been removed from the CRM system.

### Further information {#further-information}

More detailed information for working with the inventory can be found in the [Inventory API](https://{{< domain-c8y >}}/api/core/#tag/Inventory-API) in the {{< openapi >}}.
