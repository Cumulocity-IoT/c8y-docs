---
weight: 80
title: Troubleshooting
layout: redirect
---

### Device registration {#device-registration}

#### No LoRa device registered in {{< product-c8y-iot >}} after configuring the Loriot agent endpoint in the LORIOT Network Server account {#no-lora-device-registered-in-platform-after-configuring-the-loriot-agent-endpoint-in-the-loriot-network-server-account}

Check whether the user configured in LORIOT Network Server has assigned the Loriot admin role since the Loriot agent verifies if the user has appropriate permissions.

Make sure that the **Gateway Information** is enabled in LORIOT Network Server since the Loriot agent only processes "gw" messages.

#### Device type error warning {#device-type-error-warning}

The warning message "Device type error" shows up in the log if no device protocol has been assigned to the device.
To assign a device protocol refer to the section [Assign the Loriot LoRa device protocol](#assigning-loriot-device-protocol).
