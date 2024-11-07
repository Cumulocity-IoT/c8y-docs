---
weight: 10
title: Introduction
layout: bundle
sector:
  - getting_started
aliases:
  - /sensor-app/overview/
  - /sensor-app/introduction/
---

The {{< sensor-app >}} is a free smartphone application available for iOS and Android smartphones. It is the successor of the previous Cloud Sensor App.

The app is designed to collect measurements from your smartphone, nearby Bluetooth device sensors, and vehicle On-board Debug (OBD) sensors, and send them to the {{< product-c8y-iot >}} platform. It has a straightforward registration workflow to get you up and running quickly.

If you are using the {{< product-c8y-iot >}} free trial, the app ideally helps you to quickly get familiar with the platform as it provides an easy way to connect devices and sensors. Capturing data from Bluetooth devices with {{< product-c8y-iot >}} moreover saves a lot of implementation effort.

Besides sending data to the platform, the {{< sensor-app >}} can also send commands to the smartphone directly from the phone dashboard. Commands currently available in the dashboard include alert messages and vibration.

Supported smartphone sensors include:

*   Accelerometer and motion sensor
*   Gyroscope
*   Barometer
*   Magnetometer and compass
*   GPS location
*   Microphone and voice
*   WiFi strength (selected Android devices only)

{{< c8y-admon-info >}}
The app only works with sensors supported by your smartphone's hardware which provide official APIs. Depending on platform support, additional sensors may be added in future versions.
{{< /c8y-admon-info >}}

The latest list of supported Bluetooth devices is provided in the app. A button to take you to this page can be found when scanning for new devices. Currently the app supports the following devices:

*   Texas Instruments Sensor Tag
*   Acaia Lunar Scale
*   Cinco Scale
*   CirrusSense Pressure Sensor
*   Blebricks

More devices will be supported in the future and made available in the app.

{{< c8y-admon-info >}}
The Barista.io demo demonstrates the use of connected weight and pressure sensors to brew the perfect coffee. The demo sends measurements from up to 4 connected Bluetooth devices to {{< product-c8y-iot >}} in real time.
{{< /c8y-admon-info >}}

Reading vehicle sensors comes with the use of an additional OBD dongle, which exposes the vehicles sensors to the phone via WiFi or Bluetooth (Note: iOS is WiFi only). There are two supported diagnostic connectors, both based on the ELM327 microcontroller:

*	Kungfuren OBD2 Diagnostic Device Bluetooth 4.0 Adapter
*	Kungfuren OBD2 Reader WiFi Adapter
