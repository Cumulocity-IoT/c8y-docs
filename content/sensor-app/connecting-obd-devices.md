---
weight: 65
title: Connecting new OBD devices to the Sensor App
layout: bundle
sector:
  - getting_started
---

Connections to OBD devices work in a slightly different way than normal Bluetooth sensors. They must be connected to the phone directly before the device can be added to the Sensor App.

In case of WiFi based OBD devices, the procedure is as follows:

* Plug the OBD dongle into the vehicle's diagnostic port. Ensure that the power LED is illuminated.
* On the phone, navigate to the WiFi settings in the Settings application.
* Search for new networks, and join the "WiFi_OBDII" network (or other name as specified in the device's documentation), to pair directly with the dongle.
* If a password is required to do this, refer to your device's documentation.
* Once the device is connected, return to the {{< sensor-app >}}, and click the plus ("+") button at the bottom right of the screen.
* The OBD device should then become available in the list of available devices and can be added as any other Bluetooth sensor.

For Bluetooth-based OBD devices, the device must be paired with the phone before the {{< sensor-app >}} will recognize it:

* Plug the OBD dongle into the vehicle's diagnostic port. Ensure that the power LED is illuminated.
* On the phone, navigate to the WiFi settings in the Settings application.
* Scan for new Bluetooth devices and connect to the device named "ODBII" (or other name as specified in the device's documentation).
* The pairing process will ask for a PIN, consult your device's documentation to find this value.
* Once the device is connected, return to the {{< sensor-app >}}, and click the plus ("+") button in the bottom right of the screen.
* The OBD device should then become available in the list of available devices and can be added as any other Bluetooth sensor.
