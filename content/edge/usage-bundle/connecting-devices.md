---
weight: 20
title: Connecting devices
layout: redirect
---

Cumulocity uses REST and MQTT as protocols for external communication. Both protocols may be used to interface devices with Cumulocity. For details refer to   the sections on [Device integration using REST](/guides/device-sdk/rest) and [Device integration using MQTT](/guides/device-sdk/mqtt) in the Device SDK guide.

Additionally, Cumulocity IoT Edge offers Cloud Fieldbus functionality to collect data from fieldbus devices and remotely manage them. To do so, various protocols are provided, e.g. Modbus and OPC/UA. For details on how to integrate devices using Modbus and OPC/UA, refer to Optional Services > [Cloud Fieldbus](/guides/users-guide/optional-services#cloud-fieldbus) in the User guide.

>**Info**: Currently, only the Modbus and OPC/UA protocols are supported.
   
### Connecting a Modbus device

Modbus is a serial communications protocol originally published by Modicon and used to establish master-slave/client-server communication between devices.

Before you connect a Modbus device 

* Check if the agent is running.
* Register the Modbus agent. This only has to be done once as a preparation step and is not required for every Modbus device.
* Next, you must register the device in the Device Management application with the device ID: “linux-agent".
   
#### How to check/change the agent state

Use the following command to check if the agent is running in Cumulocity IoT Edge (running on port  6670):  

```shell
[admin@server ~]$ systemctl status cumulocity-agent
```

If the agent is not running, start it with the following command:

```shell
[admin@server ~]$ systemctl start cumulocity-agent
```

The Modbus agent is pre-registered in the post-installation phase.
In the Device Management application, click **All devices** in the navigator and find the Modbus agent (called "linux-agent") in the device list.

<img src="/guides/images/edge/edge-modbus-device.png" name="Device list" style="width:100%;"/> 

#### How to connect Modbus devices

For further information on connecting and managing Modbus devices, refer to Optional services > [Cloud Fieldbus](/guides/users-guide/optional-services#cloud-fieldbus) in the User guide.

### Example: Connecting an OPCUA device    
   
To connect an OPC/UA device in Edge, follow the steps below.

**Important**: The OPC UA agent is in beta state and not supported. 

#### Preparation
   
Check if the OPC/UA agent is running in Cumulocity IoT Edge (running on port  6670):  

```shell
[admin@server ~]$ sudo service opcua-mgmt-service status
```

If the agent is not running, start it with the following command:

```shell
[admin@server ~]$ sudo service opcua-mgmt-service start
```

#### Registering the device

Next, you need to register a device in the Device Management application with the name opcua-gateway

<img src="/guides/images/edge/edge-device-registration-example.png" name="Register device"/> 

Follow the description in Device Management > [Connecting devices](/guides/users-guide/device-management#connecting-devices) in the User guide to register a device.

In the Device Management application, click **All devices** in the navigator and find the OPCUA device in the device list.

For further information about managing and configuring OPCUA devices, see [OPC UA](/guides/users-guide/optional-services/#opc-ua) section in the User guide.




