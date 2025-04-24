---
weight: 40
title: Registering Sigfox devices
layout: redirect
---


To register a Sigfox device in {{< product-c8y-iot >}} navigate to **Devices** > **Registration** in the Device Management application, click **Register device** at the top right and select **Single device registration** > **Sigfox** from the dropdown.

![Register devices](/images/device-protocols/sigfox/sigfox-registration.png)

{{< c8y-admon-info >}}
If Sigfox is not one of the available options, your tenant is not subscribed to the relevant applications, see information at the top.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
- The device type created in the Sigfox Cloud platform has the following naming convention<br> `c8y_{tenantId}_{device-protocol-name}_{contractId}`, for example: `c8y_myTenant_mySigfoxDeviceProtocol_aabbcc5b78c901d64eecf4faaa`
- If the constructed name exceeds 100 characters it will be truncated until it is less than 100 characters.
{{< /c8y-admon-info >}}

In the next window, fill in the required information:

- **ID:** Unique device ID. The value must be a hexadecimal number.
- **PAC:** Porting authorization code for your device. The value must be a hexadecimal number.
- **Connection**: Lists all configured Sigfox connections in the tenant. The following contract option is populated based on the selected Sigfox connection.
- **Contract:** Select your desired contract (all contracts are listed including active and expired).
- **Device protocol:** Select your desired device protocol from the drop-down list.
- **Product certificate key:** This key can be located in *https://partners.sigfox.com/*. Navigate to your device and copy the certificate key. If the checkbox is not selected and no product certificate key is specified, the device will be considered a prototype.


{{< c8y-admon-info >}}
The term "Device type" is used both by Sigfox and {{< product-c8y-iot >}}, but with different meaning. In Sigfox, a device type specifies how to route data from devices. In {{< product-c8y-iot >}}, a device type describes the data that is sent by devices of a particular type.
{{< /c8y-admon-info >}}

![Register devices1](/images/device-protocols/sigfox/sigfox-registration1.png)

Click **Register** to submit the device registration request and create the device.

You can verify that the device is really connected by checking that events are actually coming in. You can do so by clicking on a device and opening its **Events** tab. All events related to this device are listed here.

For more information on viewing and managing your connected devices, also refer to the [Device Management application](/device-management-application/).

In order to migrate the device from one LNS connection to another, the device must be re-registered.
Navigate to the **LPWAN** tab of the Device.
Click on the **Provider connection** dropdown.
A prompt will appear stating that in order to migrate the device from one LNS connection to another, you must re-register the device.
Click on the **Re-Register** button.

The user is directed to the device registration page where he can perform the re-registration following the steps above and selecting the desired LNS connection.
