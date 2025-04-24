---
weight: 20
title: Connecting fieldbus devices
layout: redirect
---


For the following instructions, it is assumed that you have a Cloud Fieldbus terminal available and it is registered as a device in your {{< product-c8y-iot >}} tenant. To register a terminal with {{< product-c8y-iot >}}, follow the instructions provided with the terminal.

### Connecting Modbus/RTU devices {#connecting-modbusrtu-devices}

To connect a Modbus/RTU device, follow these steps:

1. Physically connect the Modbus/RTU device through a RS-485 or RS-232 cable to the terminal.
2. Assign the device a unique Modbus address according to the instructions provided with the Modbus device (for example by setting a jumper on the device).
3. Check the serial communication settings of the device according to the instructions provided with the Modbus device (that is, baud rates and communication protocol). These must match with all devices on the bus.
4. In the Device Management application, click **All devices** in the **Devices** menu in the navigator. In the device list, select the terminal and switch to the **Modbus** tab.
5. Change the communication settings shown in the **Serial communication** section to match the settings on the bus, if needed.
6. Change the transmit rate and the polling rate according to your requirements. The transmit rate is the frequency where measurements are sent to {{< product-c8y-iot >}}. The polling rate is the frequency at which the Modbus devices are polled for changes.
7. Click **Save** to save your settings.

![Add Modbus device](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-rtu.png)

#### To add child devices {#to-add-child-devices}

1. To start the communication between the terminal and the Modbus/RTU device, click **Add RTU device**.
2. Enter a name for the device and select the device protocol from the dropdown field. See [Configuring fieldbus device protocols](#configuring-fieldbus) for information on how to add a new device protocol. Set the Modbus address of the connected device.
3. Click **Add**. {{< product-c8y-iot >}} will now send a notification to the Modbus terminal that a new device is ready to be managed. This may take a few seconds.

After completion, a new child device has been added to the terminal and can now be managed. You can click on the name of the device in the list to navigate to the device. If you have not yet added Modbus devices to the terminal, you may have to reload your browser window to make the **Child Devices** tab visible.

### Connecting Modbus/TCP devices {#connecting-modbustcp-devices}

To connect a Modbus/TCP device, follow these steps:

1. Make sure that the Modbus/TCP device is connected to the terminal, that is, directly through an Ethernet cable or through a switch. If you are using a Modbus gateway, configure the gateway in a way it can communicate with the Modbus devices behind the gateway.
2. Check the network settings of the device using the instructions provided with the device.
3. In the Device Management application, click **All devices** in the **Devices** menu in the navigator. In the device list, select the terminal and switch to the **Network** tab. Verify that the LAN settings of the terminal match the settings of the device so that TCP communication can be established.
4. Switch to the **Modbus** tab.
5. Change the transmit rate and the polling rate according to your requirements. The transmit rate is the frequency at which measurements are sent to {{< product-c8y-iot >}}. The polling rate is the frequency at which the Modbus devices are polled for changes.
6. Click **Save** to save your settings.

![Add Modbus device](/images/device-protocols/cloud-fieldbus/fieldbus-modbus-tcp.png)

#### To add child devices {#to-add-child-devices}

1. To start the communication between the terminal and the Modbus/TCP device, click **Add TCP device**.
2. Enter a name for the device and select the device protocol from the dropdown field. See [Configuring fieldbus device types](#configuring-fieldbus) for information on how to add a new device protocol. Set the Modbus address and the IP address of the connected device.
3. Click **Add**.

{{< product-c8y-iot >}} will now send a notification to the Modbus terminal that a new device is ready to be managed. This may take a few seconds.

{{< c8y-admon-info >}}
It is assumed that all Modbus/TCP communication uses the standard Modbus/TCP port 502. On the NTC-6200 and NTC 220 series, the port to be used can be configured through the variable "service.cumulocity.modbus.port" via the device shell or the local web user interface of the device.
{{< /c8y-admon-info >}}

### Connecting CAN devices {#connecting-can-devices}

To connect a CAN device, follow these steps:

1. Physically connect the CAN device to the terminal.
2. Check the serial communication baud rate of the device according to the instructions provided with the device. These must match all devices on the bus.
3. In the Device Management application, click **All devices** in the **Devices** menu in the navigator. In the device list, select the terminal and switch to the **CAN Bus** tab.
4. Change the baud rate setting shown in the section **CAN Bus communication** to match the settings on the bus, if needed.
5. Change the transmit rate according to your requirements. The transmit rate is the frequency where measurements are sent to {{< product-c8y-iot >}}.
6. Click **Save** to save your settings.

![Add CAN device](/images/device-protocols/cloud-fieldbus/fieldbus-new-can-device.png)

#### To add child devices {#to-add-child-devices}

1. To start the communication between the terminal and the CAN device, click **Add CAN device**.
2. Enter a name for the device and select a device protocol from the dropdown field. See [Configuring fieldbus device types](#configuring-fieldbus) for information on how to add a new device protocol.
3. Click **Add**.

{{< product-c8y-iot >}} will now send a notification to the fieldbus terminal that a new device is ready to be managed. This may take a few seconds.

After completion, a new child device has been added to the terminal and can now be managed. You can click on the name of the device in the list to navigate to the device. If you have not yet added fieldbus devices to the terminal, you may have to reload your browser window to make the **Child devices** tab visible.

### Connecting Profibus devices {#connecting-profibus-devices}

Connecting Profibus devices slightly differs from the regular plug & play approach of other Cloud Fieldbus protocols. The gateway acts as a device on the Profibus so it can easily be integrated into an existing infrastructure. This means that Profibus data must be actively sent to the gateway though. Typically, this is done by programming a PLC to actively send information to the gateway via its configured Profibus device address.

To connect a Profibus device, follow these steps:

1. Physically wire the Profibus device to the terminal.
2. In the Device Management application, click **All devices** in the **Devices** menu in the navigator. In the device list, select the terminal and switch to the **Profibus** tab.
3. The baud rate is automatically detected by the gateway and it is displayed here.
4. Change the transmit rate according to your requirements. The transmit rate is the interval at which measurements are sent to {{< product-c8y-iot >}}.
5. Set the device address of the terminal.
6. Configure your Profibus controller to communicate to that device address. To do so, refer to the gateway manual (see for example Smart box at the [{{< product-c8y-iot >}} {{< device-portal >}}]({{< link-device-portal >}})).
7. Click **Save** to update the gateway with the new settings.

<img src="/images/device-protocols/cloud-fieldbus/fieldbus-new-profibus.png" alt="Add device" style="max-width: 100%">
<br>

#### To add child devices {#to-add-child-devices}

1. To start the communication between the gateway and the Profibus device, click **Add Profibus device**.
2. Enter a name for the new device.
3. Select the device protocol from the dropdown field. See [Configuring fieldbus device types](#configuring-fieldbus) for information on how to add a new device protocol.
4. Click **Add** to confirm and notify the gateway.

Now a child device will be created containing the data configured in the selected device protocol.

{{< product-c8y-iot >}} will notify the gateway to send data for the newly created child device.
