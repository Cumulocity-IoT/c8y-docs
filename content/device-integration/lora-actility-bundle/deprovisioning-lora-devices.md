---
weight: 50
title: Deprovisioning LoRa devices
layout: redirect
---

You can deprovision a LoRa device in the ThingPark platform. This means that the device will no longer be connected to the network. Its history data will still be available in {{< product-c8y-iot >}}, but the device will be deleted in ThingPark.

To deprovision a device, navigate to the respective device in the Device Management application under **All devices**. Click **More** in the top right and select **Deprovision device**.

![Deprovision device](/images/device-protocols/lora-actility/lora-devices-deprovision.png)

After confirming the deprovisioning, the device will be deprovisioned in ThingPark.

To provision the device again, the device should be deleted and re-registered using LoRa device registration.
