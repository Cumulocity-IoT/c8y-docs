---
weight: 10
title: Asset hierarchy
layout: bundle
sector:
  - app_enablement
helpcontent:
  - label: managing-assets
    title: Managing assets
    content: "Under **Subassets** all assets assigned to a particular group are listed. Subassets can either be other groups or devices.


    Click **Assign devices** at the top right to assign devices to the group. You can also easily restructure groups or assign devices to groups by dragging and dropping groups or devices in the navigator."

---

Assets represent business objects in general like buildings, machines, production units or cars.

Assets are organized in hierarchies. For example, an energy monitoring application might have the following asset hierarchy:

![Cockpit asset hierarchy](/images/users-guide/cockpit/cockpit-groups-image1.png)

The asset hierarchy is composed of two types of objects:

* **Groups**: Objects which group single devices or other groups. Groups can either be created in the Cockpit application or in the Device Management application.

* **Custom assets**: Objects defined by an asset model and created in the [Digital twin manager](/dtm/dtm-introduction/) application.

* **Devices**: Devices which are linked into the asset hierarchy. Before you can use devices in the Cockpit application, they must be connected to {{< product-c8y-iot >}}. This is done in the Device Management application. For details on connecting devices refer to [Registering devices](/device-management-application/registering-devices/).

In this example, the group objects represent a building asset. The device objects represent the room asset. The group names and hierarchy can be defined individually by the user. The hierarchy can have multiple levels, like region level, city level, street level, building level, floor level and room level. Any device can be part of multiple and different hierarchies, like part of regional hierarchy and part of customer hierarchy.

To position a device in the asset hierarchy, you must "assign" the device to the respective group (see below).

{{< c8y-admon-info >}}
Single devices are not managed in the Cockpit application. They are managed in the Device Management application.
{{< /c8y-admon-info >}}

{{< c8y-admon-related >}}
- [Getting started > Technical concepts > {{< product-c8y-iot >}}'s domain model](/concepts/domain-model/) for details on {{< product-c8y-iot >}}'s domain model.
- [Device management & connectivity > Device Management application](/device-management-application/) for details on working with devices in {{< product-c8y-iot >}}.
- Refer to the [{{< product-c8y-iot >}} Codex](https://styleguide.cumulocity.com/apps/codex/#/) for more information on developing applications in the {{< product-c8y-iot >}} environment. Moreover find various related tutorials in the [{{< sag-dev-community >}}]({{< link-sag-tech-forum >}}).
{{< /c8y-admon-related >}}

### Asset hierarchy versus device hierarchy {#asset-hierarchy-versus-device-hierarchy}

{{< product-c8y-iot >}} supports two types of hierarchies: a device hierarchy and an
asset hierarchy.


The device hierarchy tracks how devices are linked to {{< product-c8y-iot >}} from a communications point of view. The asset hierarchy structures the assets that are being remotely supervised and controlled through the IoT devices. For details, refer to [{{< product-c8y-iot >}}'s domain model](/concepts/domain-model/).


In the Cockpit application, you construct your asset hierarchy by creating group objects and by linking devices into the hierarchy. The asset hierarchy depends on the IoT devices used. There are many types of IoT devices, but these two types are very common:

* **Smart devices** are self-contained devices that include sensors, actuators and a communication module. They are typically connected to a single asset. Smart devices are trackers, weather stations or general "smart" sensors with a built-in communication module.

* **Gateway devices** establish the communication from other devices to {{< product-c8y-iot >}} but do not include sensors or actuators. Typical gateway devices include Zigbee, Modbus, M-Bus or KNX gateways.

The following section explains how to work with smart devices and gateway devices in the Cockpit application.

The first example shows how smart devices are linked into the asset hierarchy:

![Linked smart devices](/images/users-guide/cockpit/cockpit-groups-image2.png)

Smart devices are represented as top-level devices in the Device Management application. In the Cockpit application, you can organize smart devices into groups, as the arrows indicate in the above diagram.

The second example shows how gateway devices can be used in the Cockpit application.

![Linked gateway devices](/images/users-guide/cockpit/cockpit-groups-image3.png)

Gateway devices are as well represented as top level devices in the Device Management application. Their attached devices (like for example Modbus or KNX devices) are shown as child devices. These child devices can be organized in the asset hierarchy in the Cockpit application as shown above.

As you can see from the example, devices can have completely different hierarchies in the Device Management application and in the Cockpit application:
While inside the Device Management application all child devices are below the gateway device, the same child devices are organized in two different buildings in the Cockpit.

### Cockpit assets versus business assets {#cockpit-assets-versus-business-assets}

The mapping of objects in the Cockpit asset hierarchy is a virtual hierarchy.

If you manage trucks within the {{< product-c8y-iot >}} platform, then each truck is represented via its individual tracking device communicating with {{< product-c8y-iot >}}.

For building management, it is most common that a group of sensors inside a building represents the building as a group communicating with the {{< product-c8y-iot >}} platform.

If you need more properties and better visualization of business assets, we recommend you to use the [Digital twin manager](/dtm/dtm-introduction/) application. A custom asset created via the Digital twin manager application is also shown in the Cockpit application. It uses the chosen icon and additionally shows all properties in a list next to the subassets. These properties can be edited if the user has WRITE permission for the permission type "Inventory".
