---
title: Introduction
layout: bundle
sector:
  - data_analytics
weight: 10
aliases:
  - /streaming-analytics/overview-analytics/
---
Devices and sensors can be connected to {{< product-c8y-iot >}}. See [Interfacing devices](/concepts/interfacing-devices/) and [Device integration using MQTT](/device-integration/mqtt/).

Sensors result in `Measurement` or `Event` objects in {{< product-c8y-iot >}}, and devices can receive `Operation` objects created within the {{< product-c8y-iot >}} platform. All of these objects \(`Measurement`, `Event`, `Operation`\) will be associated with a single device in the {{< product-c8y-iot >}} platform. A device may have multiple types of measurement associated with it, and the types of measurements each device supports may be the same as other devices or different to other devices. Once devices are connected to {{< product-c8y-iot >}}, information about these devices is stored in the {{< product-c8y-iot >}} inventory. These are visible in the Device Management application, which can also be used to view `Measurement`, `Event` or `Operation` objects associated with that device. See [Device management & connectivity](/section/device_management/) for more information.

Using the Streaming Analytics application, you can add your own logic to your IoT solution for immediate processing of incoming data from devices or other data sources. These user-defined operations can, for example, alert applications of new incoming data, create new operations based on the received data (such as sending an alarm when a threshold for a sensor is exceeded), or trigger operations on devices.

Typical real-time analytics use cases include:

* Remote control: Turn a device off if its temperature rises over 40 degrees.
* Validation: Discard negative meter readings or meter readings that are lower than the previous.
* Derived data: Calculate the volume of sales transactions per vending machine per day.
* Aggregation: Sum up the sales of vending machines for a customer per day.
* Notifications: Send me an email if there is a power outage in one of my machines.
* Compression: Store location updates of all cars only once every five minutes (but still send real-time data for the car that I am looking at to the user interface).

The {{< product-c8y-iot >}} platform includes an Apama correlator component, which is managed by the {{< product-c8y-iot >}} platform \(this is not manually started or stopped\) and is preconfigured to communicate to {{< product-c8y-iot >}}. This correlator hosts the Analytics Builder runtime, and also executes any operation logic added using EPL apps.
The operation logic is based on Apama's Event Processing Language (Apama EPL).

The Streaming Analytics application can be used with both {{< product-c8y-iot >}} Core \(cloud\) and {{< product-c8y-iot >}} Edge \(local installation\).
