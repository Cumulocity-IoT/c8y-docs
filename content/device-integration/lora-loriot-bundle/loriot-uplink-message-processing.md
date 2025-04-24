---
weight: 70
title: Uplink message processing
layout: redirect
---

On the receipt of an uplink message, the {{< product-c8y-iot >}} platform creates the following measurements and events, and updates the corresponding device managed object.

- **Unprocessed data** - an event of type <code>c8y_LoriotUplinkRequest</code> is created with the unprocessed data.
- **Position** - the <code>c8y_Position</code> fragment of the device managed object is updated to capture the latitude, longitude, altitude and accuracy information of the device. Also, an event is created with the position information.
- **Spreading factor** - the <code>c8y_SpreadingFactor</code> fragment of the device managed object is updated to capture the spreading factor of the device.
- **Signal strength** - a measurement is created with RSSI and SNR values of the device signal strength.
