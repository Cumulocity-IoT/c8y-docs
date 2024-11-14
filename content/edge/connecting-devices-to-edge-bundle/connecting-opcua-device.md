---
weight: 30
title: Connecting an OPC UA device
layout: redirect
---

{{< c8y-admon-important >}}
While configuring the OPC UA server, ensure that the server is reachable from the Edge appliance. If you are using a hostname, configure the DNS accordingly.
{{< /c8y-admon-important >}}

To connect an OPC UA device in the Edge appliance, follow the steps below.

### Preparation {#preparation}

**OPC UA Management service**

Check if the OPC UA management service is running in Edge (running on port 8083):  

```shell
sudo service opcua-mgmt-service status
```

If the agent is not running, start it with the following command:

```shell
sudo service opcua-mgmt-service start
```

**OPC UA Device Gateway**

Check if the OPC UA device gateway is running in Edge (running on port 1099):  

```shell
sudo service opcua-device-gateway status
```

If the agent is not running, start it with the following command:

```shell
sudo service opcua-device-gateway start
```

### Registering the device {#registering-the-device}

Next, you must register a device in the Device Management application with the name opcua-gateway.

<img src="/images/edge/edge-device-registration-example.png" name="Register device"/>

Follow the description in [Registering devices](/device-management-application/registering-devices/) to register a device.

In the Device Management application, click **All devices** in the navigator and find the OPC UA device in the device list.

For further information about managing and configuring OPC UA devices, see [OPC UA](/protocol-integration/opcua/).
