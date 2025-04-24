---
weight: 60
title: Sending operations
layout: redirect
---


If a LoRa device supports receiving hexadecimal commands, you can send them using shell operations. Notice that these commands are not serial monitor commands.
In order to send an operation, navigate to the device you want to send an operation to in the Device Management application under **All devices**. Switch to the **Shell** tab.

In the following screenshot you can find some examples of a device protocol's predefined commands and their format.

![Predefined shell commands](/images/device-protocols/lora-actility/lora-devices-predefinedshell.png)

Enter the shell command or view/edit the predefined command in the **Command** field.

If you enter the command without defining a port, it will be sent to the default target port (that is, port 1) of the device. If you enter the command and define a port (format "command:port"), it will be sent to the specified target port instead of the default port.

![Port configuration](/images/device-protocols/lora-actility/lora-devices-port.png)

Click **Execute**. The operation will be sent to the device. The timing depends on Actility ThingPark.

The status of the operation is set to SUCCESSFUL when the operation has successfully been sent to the ThingPark platform. The status of the operation is set to FAILED when a problem occurred with the validation of the command or after the operation has been sent to the Thingpark platform.
