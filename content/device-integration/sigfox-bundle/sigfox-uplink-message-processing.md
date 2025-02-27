---
weight: 70
title: Uplink message processing
layout: redirect
---

On the receipt of an uplink message, the {{< product-c8y-iot >}} platform creates the following measurements and events, and updates the corresponding device managed object.

- **Unprocessed data** - An event of type <code>com_sigfox_UnprocessedDataEvent</code> is created with the unprocessed data.
- **Position** - The <code>c8y_Position</code> fragment of the device managed object is updated to capture the latitude, longitude, altitude and accuracy information of the device.
- **Signal strength** - A measurement is created with RSSI and SNR values of the device signal strength.
