---
weight: 40
title: Registering the gateway as a Cumulocity device
layout: redirect
---

1. Click **Registration** in the **Devices** menu of the navigator.

2. Click **Register device** at the right of the top bar and from the dropdown menu select **Single registration** > **General**.

3. Enter the Device ID (in our example it is "Gateway_Device") and then click **Next**.

![Device Registration](/images/device-protocols/opcua/opcua-device-registration-gateway.png)

4. Click **Accept** to complete the registration.

![Device Registration Acceptance](/images/device-protocols/opcua/opcua-device-registration.png)

{{< c8y-admon-info >}}
If you run the OPC UA Gateway in thin-edge.io mode, manual registration is not needed. thin-edge.io automatically registers the OPC UA Gateway at {{< product-c8y-iot >}} as a sub-device of its device.
{{< /c8y-admon-info >}}
