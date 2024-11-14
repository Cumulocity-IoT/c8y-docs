---
weight: 20
title: Connecting a Modbus device
layout: redirect
---

Modbus is a serial communications protocol originally published by Modicon and used to establish primary-replica/client-server communication between devices.

Before you connect a Modbus device, ensure that the agent is running.

### How to check/change the agent state {#how-to-checkchange-the-agent-state}

Use the following command to check if the agent is running in Edge (running on port  6670):  

```shell
systemctl status cumulocity-agent
```

If the agent is not running, start it with the following command:

```shell
systemctl start cumulocity-agent
```

The Modbus agent is pre-registered.
In the Device Management application, click **All devices** in the navigator and find the Modbus agent (called "linux-agent") in the device list.

<img src="/images/edge/edge-modbus-device.png" name="Device list" style="width:100%;"/>

### How to connect Modbus devices {#how-to-connect-modbus-devices}

For more information about connecting and managing Modbus devices, see [Cloud Fieldbus](/protocol-integration/cloud-fieldbus/).
