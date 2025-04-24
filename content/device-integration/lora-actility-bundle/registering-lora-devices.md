---
weight: 40
title: Registering LoRa devices
layout: redirect
---


To register a LoRa device in {{< product-c8y-iot >}} navigate to **Devices** > **Registration** in the Device Management application, click **Register device** at the top right and select **Single device registration** > **Actility LoRa** from the dropdown.

![Register devices](/images/device-protocols/lora-actility/lora-selection.png)

{{< product-c8y-iot >}} fully supports the LoRa device provisioning with Over-the-Air Activation (OTAA) which is the preferred and most secure way to connect with the LoRa network.
If Activation by Personalization (ABP) is required to be used, refer to the [LoRa device registration with ABP](#lora-device-registration-with-activation-by-personalization-abp) section.

In the next window fill in the required information:
- **Connection**: Lists all configured Actility connections in the tenant. The following device profile and connectivity plan option is populated based on the selected Actility connection.
- **Device profile**: Select the Actility Thingpark device profile from the dropdown list that matches the device that you are registering.

    The Actility ThingPark device profile allows to manage multi-RF profiles, ensures different LoRaWAN class compatibility (A, B or C) and allows application payload decoding for easy third-party application integration.
- **Device protocol**: Select the appropriate device protocol from the dropdown list. For more information on how to create a device protocol refer to [Creating device protocols](#lora-creating-device-protocols).
- **Device EUI**: This is the unique identifier for the device. It is a 16 character (8 byte) long hexadecimal number. You can find it on the device itself.
- **Application EUI**: This is a global application ID in the IEEE EUI64 address space that uniquely identifies the application provider of the device. It is a 16 character (8 byte) long hexadecimal number. There can be only one application EUI for a tenant but multiple tenants can have the same application EUI.
- **Application key**: This is an AES-128 application key specific for the device that is assigned to the device by the application owner and is responsible to encrypt. The application key is a 32 character (16 byte) long hexadecimal number.
JOIN communication. You can find this key on the device itself.
- **Connectivity plan**: Select the appropriate connectivity plan from the dropdown list.

![Register devices](/images/device-protocols/lora-actility/lora-registration.png)

Click **Register** to submit the device registration request and create the device.

You can verify that the device is really connected by checking that events are actually coming in. You can do so by clicking on a device and opening the **Events** tab. All events related to this device are listed here.

The provision status is shown under **Device data** in the **Info** tab of the device.

![Device data](/images/device-protocols/lora-actility/lora-devices-devicedata.png)

For more information on viewing and managing your connected devices, also refer to the [Device Management application](/device-management-application).

In order to migrate the device from one LNS Connection to another, the device must be re-registered.
Navigate to the **LPWAN** tab of the Device.
Click on the **Provider connection** dropdown.
A prompt will appear stating that in order to migrate the device from one LNS connection to another, you must re-register the device.
Click on the **Re-Register** button.

The user is directed to the device registration page where he can perform the re-registration by following the steps above and selecting the desired LNS connection.


### LoRa device registration process {#lora-device-registration-process}

<img src="/images/device-protocols/lora-actility/lora-device-registration-process.png" style="max-width: 60%">

A device is created based on the above workflow.

First it is checked, if the device already exists. If no device exists with the same device EUI in the ThingPark account, the device is first provisioned on the ThingPark platform and then created on the {{< product-c8y-iot >}} platform with a link to the device in the ThingPark platform. If the device exists in the ThingPark account, a validation will be applied to compare these devices based on application EUI (for OTAA activation) and device profile. If the validation is successful, the device is created only in {{< product-c8y-iot >}} with a link to the device in the ThingPark platform. If the validation fails, a failure message is shown and the device is not created in {{< product-c8y-iot >}}.

### LoRa device registration with Activation by Personalization (ABP) {#lora-device-registration-with-activation-by-personalization-abp}

Activating the device by personalization is not recommended and not fully supported in {{< product-c8y-iot >}} LoRa device registration.

However, if you would like to create a device with this activation type in {{< product-c8y-iot >}} and use the LoRa features - such as sending operations to a device, deprovisioning a device and setting LoRa device protocol type with custom device protocol configuration - you must first provision the device in the ThingPark platform. Moreover you must create "AS Routing Profile" for {{< product-c8y-iot >}} using the destination `http://actility-server.{{< domain-c8y >}}` as a "Third Party AS (HTTP)" and assign it to your devices manually. Afterwards, you can register this device using LoRa device registration. In this case, the **Application key** field in the LoRa device registration is invalid.

### Limitations for LoRa devices created with general device registration {#limitations-for-lora-devices-created-with-general-device-registration}

The general device registration for LoRa devices is no longer supported.

Existing LoRa devices that have been created in {{< product-c8y-iot >}} with the general device registration process have limitations. For those devices, it is not possible to send operations to the device, deprovision the device and set the LoRa device protocol type with custom device protocol configuration.

It is recommended to delete and re-register these devices using LoRa device registration to fully use the LoRa feature.
