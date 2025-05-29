---
weight: 5
title: Introduction
layout: bundle
sector:
  - device_management
---

Device management is essential for building a robust and scalable foundation for any IoT solution, bridging the gap between your IoT devices and the (business) application layer.  

In order to operate IoT systems efficiently, devices need to be monitored and managed across their entire lifecycle from installation and setting up their connection up until their decommissioning and replacement. This process inherits significant complexity due to, for example, geographical distribution, the heterogeneity and constraints of used devices as well as the sheer number of devices being part of the deployment.   

In addition, device management plays an important role in ensuring compliance with the highest security standards, such as managing device certificates and providing over-the-air update mechanisms to prevent devices from becoming non-compliant or even compromised.

{{< product-c8y-iot >}}’s Device Management application provides a unified control pane from which all functionalities can be accessed that are required to monitor and operate devices, independent of the hardware architecture or protocol the devices are using. As this functionality is provided via an intuitive web UI, it can be used without requiring in-depth technical knowledge. By abstracting device specifics and allowing to address multiple devices at once, the effort of maintaining device fleets at scale can be significantly reduced:

![Lifecycle](/images/users-guide/DeviceManagement/devmgmt-lifecycle.png)

**Provision & organize**

Onboard new devices either by [registering](/device-management-application/registering-devices/) each device individually or via bulk registration, and organize them by using [groups](/device-management-application/grouping-devices/). These can either be based on individual selection of devices (static groups) or based on any property (smart groups). Additionally, the [Digital Twin Manager](/dtm/dtm-introduction/) application can be used to model complex hierarchies and add metadata in order to create holistic representations of your devices and assets.

**Configure & update**

Setup devices by defining device profiles that contain everything the device needs for being fully operational including [firmware](/device-management-application/managing-device-data/#managing-firmware), [software packages](/device-management-application/managing-device-data/#managing-software) as well as [configuration files](/device-management-application/managing-device-data/#managing-configurations). Single and bulk [operations](/device-management-application/monitoring-and-controlling-devices/#working-with-operations) allow for efficient update campaigns once a newer version of a rolled-out artifact is available to keep the fleet up to date. Device [credentials](/device-management-application/managing-device-data/#managing-device-credentials) and [certificates](/device-certificate-authentication/device-certificates/) can directly be managed within the UI to ensure secure operations.

**Monitor**

The [devices list](/device-management-application/viewing-all-devices/) contains all devices that are connected to the tenant. The list can be [customized](/device-management-application/viewing-all-devices/#configuring-columns) to show all relevant properties like the [connectivity status](/device-management-application/monitoring-and-controlling-devices/#connection-monitoring), and includes search and filter options to quickly identify the correct device(s). When selecting a device, an [info page](/device-management-application/viewing-device-details/) for the particular device is displayed which can be customized in order to hold all information that is relevant for the specific device. Depending on the operations supported by the device, additional tabs are available that allow you to interact with the device. To provide transparency across the entire device fleet, views are available to see all [events](/device-management-application/monitoring-and-controlling-devices/#to-view-events) and [alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) that recently occurred, the status of [operations](/device-management-application/monitoring-and-controlling-devices/#working-with-operations) that got triggered, and the current [location](/device-management-application/monitoring-and-controlling-devices/#locating-devices) of each device.


**Diagnose & troubleshoot**

In case a device is not behaving as expected, additional information can be retrieved in the form of [log files](/device-management-application/viewing-device-details/#logs). The relevant timeframe and log type can be further specified in the application. To resolve issues, the device can be restarted or [remotely accessed](/cloud-remote-access/cra-general-aspects/) to fix the problem without having to send out a service technician. Additionally, [shell commands](/device-management-application/viewing-device-details/#shell) can be sent via SMS as a fallback in case the internet connection is broken. In case the issues are related to the services running on top of the devices and not to the device itself, the software management functionality can be used to [monitor](/device-management-application/monitoring-device-services/), [update](/device-management-application/managing-device-data/#to-update-software-on-a-device) and [reinstall](/device-management-application/managing-device-data/#to-manage-software-on-a-device) any service.

**Decomission**

At one point in time, the device will reach its end of life. The digital representation of the device can either be permanently [deleted](/device-management-application/viewing-all-devices/#to-delete-devices) if not needed anymore or the device can be [replaced](/device-management-application/viewing-all-devices/#to-replace-a-device). The replacement wizard allows you to map the digital representation to another physical device, so that physical components can be replaced without losing the historical data of the asset that might still be operational.

Visit the [Device integration](/device-integration/device-integration-introduction/) section to learn more about the specifics on how to connect and integrate your devices into {{< product-c8y-iot >}}'s device management suite. With [thin-edge.io](https://thin-edge.github.io/thin-edge.io/) you can directly benefit from the aforementioned functionality as it comes with full support out-of-the-box.
