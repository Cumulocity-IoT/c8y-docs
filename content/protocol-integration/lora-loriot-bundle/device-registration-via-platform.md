---
weight: 25
title: Device registration via Cumulocity IoT
layout: redirect
---

### Creation of Loriot LNS Connection in {{< product-c8y-iot >}} {#creation-of-loriot-lns-connection-in-platform}

Before using LoRa devices with {{< product-c8y-iot >}}, you must configure the {{< product-c8y-iot >}} Loriot agent endpoint details in the Administration application. Click the **Connectivity** tab in the **Settings** menu to create, edit, delete or update multiple Loriot connections.

#### To add a new connection {#to-add-a-new-connection}

When you select **Connectivity** for the first time, you are asked to create a connection. Click **Add Connection**.

Enter the following information:

- **Name** - the name of the Loriot connection being created
- **Base URL** - the URL associated with the Loriot provider account
- **Username** - your Loriot account username
- **Password** - your Loriot account password

Click **Save**. If the information you have entered is correct, the message "Connection created" appears.

To add another connection, click **Add Connection** and follow the steps above.

{{< c8y-admon-info >}}
Always keep the **Gateway Information** option enabled because the Loriot agent only processes "gw" (gateway information) messages.
{{< /c8y-admon-info >}}

![Enable gateway information option](/images/device-protocols/lora-loriot/loriot-gateway-option-enabled.png)

#### To update a connection {#to-update-a-connection}

Select the connection to be updated, make your edits, and save the connection.


If there are devices associated with the connection, an error message appears, stating "Can not update the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Update connection information](/images/device-protocols/lora-loriot/loriot-admin-settings-update.png)

#### To delete a connection {#to-delete-a-connection}

Select the connection to be deleted and click **Delete**.

If there are devices associated with the connection, an error message appears, stating "Can not delete the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Delete connection](/images/device-protocols/lora-loriot/loriot-admin-settings-delete.png)

### Loriot device registration {#loriot-device-registration}

To register a Loriot device in {{< product-c8y-iot >}} navigate to **Devices** > **Registration** in the Device Management application, click **Register device** at the top right and select **Single device registration** > **LORIOT LoRa** from the dropdown.

![Register devices](/images/device-protocols/lora-loriot/loriot-selection.png)

{{< c8y-admon-info >}}
If Loriot is not one of the available options, your tenant is not subscribed to the relevant applications, see information at the top.
{{< /c8y-admon-info >}}

In the next window, fill in the required information:

- **Title** - title of the device to be registered.
- **Device EUI** - this is the unique identifier for the device. It is a 16 character (8 byte) long hexadecimal number. You can find it on the device itself.
- **Application EUI** - this is a global application ID in the IEEE EUI64 address space that uniquely identifies the application provider of the device. It is a 16 character (8 byte) long hexadecimal number.
- **Application key** - this is an AES-128 application key specific for the device that is assigned to the device by the application owner and is responsible to encrypt. The application key is a 32 character (16 byte) long hexadecimal number.
- **Connection** - lists all configured Loriot connections in the tenant. The **Application name** option (see below) is populated based on the selected Loriot connection.
- **Application name** - select the appropriate application name under which the device must be registered in the Loriot provider.
- **Device protocol** - select the appropriate device protocol from the dropdown list. For more information on how to create a device protocol refer to [Creating device protocols](#loriot-creating-device-protocols).

![Register devices](/images/device-protocols/lora-loriot/loriot-registration.png)

Click **Register** to submit the device registration request and create the device.

You can verify that the device is connected by incoming events. Click on a device and open its **Events** tab. All events related to this device are listed.

For more information on viewing and managing your connected devices, also refer to the [Device Management application](/device-management-application/).

In order to migrate the device from one LNS connection to another, the device must be re-registered:

1. Navigate to the **LPWAN** tab of the Device.
2. Click the **Provider connection** dropdown.
3. A prompt will appear stating that in order to migrate the device from one LNS connection to another, you must re-register the device. Click the **Re-Register** button.
4. You are directed to the device registration page where you can perform the re-registration following the steps above and selecting the desired LNS connection.
