---
weight: 20
title: Actility LoRa
layout: redirect
---

### Introduction {#actility-introduction}

{{< product-c8y-iot >}} can interface with LoRa devices through Actility's ThingPark Wireless, Enterprise or Community edition. You can:

* Provision and deprovision LoRa devices easily using the {{< product-c8y-iot >}} Device Management application. No interaction in the ThingPark user interface is required.
* Decode upstream payload packets using a web-based user interface.
* Debug and postprocess raw device data through {{< product-c8y-iot >}} events.
* Send downstream data to the device using {{< product-c8y-iot >}} operations.
* Make use of existing {{< product-c8y-iot >}} features with LoRa devices, for example, connectivity monitoring, device management, data visualization with dashboards, real-time analytics and more.

The following illustration gives an overview of the {{< product-c8y-iot >}} Actility LoRa integration.

![{{< product-c8y-iot >}} Actility LoRa integration](/images/device-protocols/lora-actility/lora-cumulocity-integration.png)

{{< c8y-admon-info >}}
Your subscription must include this feature. If you do not see the functionality described in this document please contact [product support](/additional-resources/contacting-support/).
{{< /c8y-admon-info >}}

### Configuring multiple ThingPark account connections {#configuring-multiple-thingpark-account-connections}

Before using LoRa devices with {{< product-c8y-iot >}}, you must configure your ThingPark account details in the Administration application.

#### To add a new connection {#actility-to-add-a-new-connection}

Click the **Connectivity** tab in the **Settings** menu to create, edit, delete or update multiple Actility connections.

If you select **Connectivity** for the first time, you are asked to create a connection. Click **Add Connection**.

Enter the following information:

| Setting name | Notes |
|--------------|--------|
| Name | The name of the Actility connection being created. |
| Description | The description of the Actility connection being created. |
| Actility ThingPark URL | Base URL of the corresponding Actility DX API being used. |
| Profile ID | Your ThingPark account profile identifier. |
| Application server ID | Application server ID for TLS security between ThingPark platform and agent. Optional field. Leave empty to disable security. If enabled, the agent generates a token for all uplink and down-link messages. |
| Application server key | Application server private key for TLS security between the ThingPark platform and agent for uplink and downlink communications. Value should be in hex and 16 bytes. Optional field. Leave empty to disable security. If enabled, the agent generates a token for all uplink and down-link messages. |
| Admin API version | Version that the ThingPark admin API uses. By-default set to "latest". |
| Core API version | Version that the ThingPark core API uses. By-default set to "latest". |
| Username | Your ThingPark account username. |
| Password | Your ThingPark account password. |
| Connection type | The ThingPark account type that is being used (Enterprise or Wireless). |

##### Environment-specific information {#environment-specific-information}

The following settings vary depending on your ThingPark environment:

**ThingPark community:**
- URL: https://community.thingpark.io/thingpark/dx/
- Profile ID: community-api
- Application server ID and key: Leave empty (HTTPS used internally)
- Connection type: Choose Enterprise

**Other environments (Enterprise/Wireless):**
- URL: Contact ThingPark support
- Profile ID: Contact ThingPark support
- Application server ID and key:  Look up in your application server profile in ThingPark or contact ThingPark support
- Connection type: Choose based on your environment (Enterprise or Wireless)

{{< c8y-admon-important >}}
Do not use the same ThingPark login (username and password) for other tenants.
The profile ID, username and password are used to retrieve an access token to send further requests to the ThingPark platform. It is possible to renew the access token by replacing the account credentials for a particular connection.
{{< /c8y-admon-important >}}

![Setting provider credentials](/images/device-protocols/lora-actility/lora-admin-settings.png)

Click **Save**. If you have entered the correct information, you see the message "Connection created".

To add another connection, click **Add Connection** and follow the steps above.

#### To update a connection {#actility-to-update-a-connection}

Select the connection to be updated, make your edits, and save the connection.

If there are devices associated with the connection, an error message will appear, stating "Can not update the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Update connection information](/images/device-protocols/lora-actility/lora-admin-settings-update.png)

#### To delete a connection {#actility-to-delete-a-connection}

Select the connection to be deleted and click **Delete**.

If there are devices associated with the connection, an error message will appear, stating "Can not delete the LNS Connection with `<name of LNS Connection>` as it's associated with `<number of devices>`. Click the link to download the file with the details of the associated devices: `/service/<agent-context-path>/lns-connection/<lns-connection-name>/device`".

![Delete connection](/images/device-protocols/lora-actility/lora-admin-settings-delete.png)

### Creating device protocols {#actility-creating-device-protocols}

To process data from LoRa devices, {{< product-c8y-iot >}} needs to understand the payload format of the devices. Mapping a payload data to {{< product-c8y-iot >}} data can be done by creating a LoRa device protocol.

During the [device registration](#registering-lora-devices), you can associate this device protocol. The received uplink callbacks for this device with a hexadecimal payload will then be mapped to the ones you have configured in your device protocol.

The device protocol assigned during device registration can be changed from the **LPWAN** tab in the device details page.

![Actility LPWAN Tab](/images/device-protocols/lora-actility/lora-lpwan-tab.png)

{{< c8y-admon-info >}}
Device protocol mapping only supports decoding for fixed byte positions based on the message type.
The length for the device payload parts, which is set in the **Number of bits** field, can be maximum 32 bits (4 bytes).
{{< /c8y-admon-info >}}

In order to create a device protocol, navigate to the Device Management application and select **Device protocols** in the **Device types** menu in the navigator. You can either import an existing device protocol or create a new one or use the device protocols created by an LPWAN custom codec microservice.

#### Importing a predefined device protocol {#actility-importing-a-predefined-device-protocol}

In the **Device protocols** page, click **Import**.

Select the predefined device type, for example "LoRaWAN Demonstrator" or upload from a file. Click **Import**.

![Import device protocol](/images/device-protocols/lora-actility/lora-protocols-import.png)

Alternatively, you may also load the device protocol from a file and import it.

#### Creating a new device protocol {#actility-creating-a-new-device-protocol}

In the **Device protocols** page, click **New device protocol** in the top menu bar. The following window will open:

![Create new LoRa protocol](/images/device-protocols/lora-actility/lora-protocols-new.png)

Select **LoRa** as the device protocol type, provide a name for it and click **Create**.

Under **Message types**, specify the message types. LoRa devices can send messages of different types with different encodings per type.

Select the way the message type is encoded in the **Source** dropdown box:

- **FPort**: if the message type can be determined by looking at the FPort parameter of a message.
- **Payload**: if the message type can be determined by looking at the subset of the message payload itself.

In the following example payload structure, the first byte indicates the message type source (as highlighted).

<img src="/images/device-protocols/lora-actility/lora-payload-example1.png" alt="Example payload: message type source" style="max-width: 100%">

In the user interface you can enter this type of message type source information as follows: In the **Start bit** field, indicate where the message type information starts in the payload and in the **Number of bits** field, indicate how long this information is, for example start bit = "0" and number of bits = "8".

![LoRa protocol payload](/images/device-protocols/lora-actility/lora-protocols-payload.png)

Click **Add value** to create the value configuration.

![LoRa protocol add value](/images/device-protocols/lora-actility/lora-protocols-addvalue.png)

In the upcoming window, configure the relevant values as shown in this example.

**New value window part 1**
![LoRa protocol add new value](/images/device-protocols/lora-actility/lora-protocols-newvalue.png)

**New value window part 2**
![LoRa protocol add new value](/images/device-protocols/lora-actility/lora-protocols-newvalue2.png)

The value configuration maps the value in the payload of a message type to the {{< product-c8y-iot >}} data.

Under **Message type**, configure the **Message ID** according to your device message specification and map it to the {{< product-c8y-iot >}} data. The message ID is the numeric value identifying the message type. It will be matched with the message ID found in the source specified on the device protocol main page (that is, Payload or FPort). The message ID must be entered in decimal numbers (not hex).

In this example payload structure the message ID is "1".

<img src="/images/device-protocols/lora-actility/lora-payload-example2.png" alt="Example payload: message type source" style="max-width: 100%">

![LoRa bits](/images/device-protocols/lora-actility/lora-protocols-loraid.png)

Under **General**, specify a name for the value and the category under which it will be displayed in the values list. The associated name for this value will be displayed under the **Display category** given.

Under **Value selection**, define from where the value should be extracted. In order to do so, indicate where the value information starts in the **Start bit** field and how long this information is in the **Number of bits** field. The maximum value for the number of bits is 32 bits (4 bytes).

In this example the "Channel 1 Type" information starts in byte 2 (that means, start bit = "16") and is 1 byte long (that means, number of bits = "8").

<img src="/images/device-protocols/lora-actility/lora-payload-example3.png" alt="Example payload: value selection" style="max-width: 100%">

![LoRa bits](/images/device-protocols/lora-actility/lora-protocols-lorabits.png)

The hexadecimal value is converted to a decimal number and afterwards a "value normalisation" is applied.

Under **Value normalisation** define how the raw value should be transformed before being stored in the platform and enter the appropriate values for:

- **Multiplier**: This value is multiplied with the value extracted from the **Value selection**. It can be decimal, negative and positive. By default it is set to 1.
- **Offset**: This value defines the offset that is added or subtracted. It can be decimal, negative and positive. By default it is set to 0.
- **Unit** (optional): A unit can be defined which is saved together with the value (for example temperature unit "C" for degree Celsius).

For detailed information on how to decode the payload, refer to the documentation of the device.

{{< c8y-admon-info >}}
"Little endian" support to decode the payload has been added.
{{< /c8y-admon-info >}}

Under **Options**, select one of the following options, if required:

* **Signed** - if the value is a signed number.
* **Packed decimal** - if the value is BCD encoded.

Under **Functionalities**, specify how this device protocol should behave:

- **Send measurement**: Creates a measurement with the decoded value.
- **Raise alarm**: Creates an alarm if the value is not equal to zero.
- **Send event**: Creates an event with the decoded value.
- **Update managed object**: Updates a fragment in a managed object with the decoded value.

You can also have a nested structure with several values within a measurement, event or managed object fragment. In case of a measurement all the properties of the same type will be merged to create a nested structure. In case of an event or a managed object all the properties with the same fragment are merged to create a nested structure. Also refer to the [example](#example-with-nested-structure) of a nested structure for a "Position" device protocol below.

Click **OK** to add the values to your device protocol.

![Value configurations of created device protocol](/images/device-protocols/lora-actility/lora-protocols-loraprotocol.png)

After clicking **Save**, your device protocol is created with the values you defined.

##### Example with single property {#actility-example-with-single-property}

The following image shows an example for a message which sends a measurement when the battery level changes.

**New value window part 1**
![Battery level changes example](/images/device-protocols/lora-actility/lora-protocols-battery.png)

**New value window part 2**
<br><br>
![Battery level changes example](/images/device-protocols/lora-actility/lora-protocols-battery2.png)

##### Example with nested structure {#actility-example-with-nested-structure}

The following image shows an example of a nested structure for a device protocol reporting the current position of a GPS device. The display category is named "Position" and contains values for longitude and latitude.

The message ID should be the same for all the values. Enter the rest of the parameters according to the instructions above. Enter "c8y_Position" in the **Managed object fragment** field and create a new value for each: longitude and latitude.

**New value window, Longitude**

![Value creation: Longitude-nested](/images/device-protocols/lora-actility/lora-protocols-lng.png)

**New value window, Latitude**

![Value creation: Latitude-nested](/images/device-protocols/lora-actility/lora-protocols-lat.png)

This will be the result:

![Value configuration in detail: nested structure](/images/device-protocols/lora-actility/lora-protocols-gpsexample.png)

#### Using custom decoding/encoding {#actility-using-custom-decodingencoding}

The Actility agent also supports the decoding/encoding functionality by plugging in the custom microservice. Refer to [LPWAN custom protocols](/lpwan-custom-protocols/) for further details.

### Registering Actility LoRa devices {#registering-actility-lora-devices}

To register a LoRa device in {{< product-c8y-iot >}} navigate to **Devices** > **Registration** in the Device Management application. Click **Register device** at the top right, and select **Single device registration** > **Actility LoRa** from the dropdown.

![Register devices](/images/device-protocols/lora-actility/lora-selection.png)

{{< product-c8y-iot >}} fully supports the LoRa device provisioning with Over-the-Air Activation (OTAA) which is the preferred and most secure way to connect with the LoRa network.
If Activation by Personalization (ABP) is required to be used, refer to [LoRa device registration with ABP](#lora-device-registration-with-activation-by-personalization-abp).

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

1. Navigate to the **LPWAN** tab of the device.
2. Click the **Provider connection** dropdown.
A prompt will appear stating that in order to migrate the device from one LNS connection to another, you must re-register the device.
3. Click **Re-Register**.

You are directed to the device registration page where you can perform the re-registration by following the steps above and selecting the desired LNS connection.


#### LoRa device registration process {#lora-device-registration-process}

<img src="/images/device-protocols/lora-actility/lora-device-registration-process.png" style="max-width: 60%">

A device is created based on the above workflow.

First it is checked, if the device already exists. If no device exists with the same device EUI in the ThingPark account, the device is first provisioned on the ThingPark platform and then created on the {{< product-c8y-iot >}} platform with a link to the device in the ThingPark platform. If the device exists in the ThingPark account, a validation will be applied to compare these devices based on application EUI (for OTAA activation) and device profile. If the validation is successful, the device is created only in {{< product-c8y-iot >}} with a link to the device in the ThingPark platform. If the validation fails, a failure message is shown and the device is not created in {{< product-c8y-iot >}}.

#### LoRa device registration with Activation by Personalization (ABP) {#lora-device-registration-with-activation-by-personalization-abp}

Activating the device by personalization is not recommended and not fully supported in {{< product-c8y-iot >}} LoRa device registration.

However, if you would like to create a device with this activation type in {{< product-c8y-iot >}} and use the LoRa features - such as sending operations to a device, deprovisioning a device and setting LoRa device protocol type with custom device protocol configuration - you must first provision the device in the ThingPark platform. Moreover you must create "AS Routing Profile" for {{< product-c8y-iot >}} using the destination `http://actility-server.{{< domain-c8y >}}` as a "Third Party AS (HTTP)" and assign it to your devices manually. Afterwards, you can register this device using LoRa device registration. In this case, the **Application key** field in the LoRa device registration is invalid.

#### Limitations for LoRa devices created with general device registration {#limitations-for-lora-devices-created-with-general-device-registration}

The general device registration for LoRa devices is no longer supported.

Existing LoRa devices that have been created in {{< product-c8y-iot >}} with the general device registration process have limitations. For those devices, it is not possible to send operations to the device, deprovision the device and set the LoRa device protocol type with custom device protocol configuration.

It is recommended to delete and re-register these devices using LoRa device registration to fully use the LoRa feature.

### Deprovisioning LoRa devices {#deprovisioning-lora-devices}

You can deprovision a LoRa device in the ThingPark platform. This means that the device is no longer connected to the network. Its history data is still available in {{< product-c8y-iot >}}, but the device is deleted in ThingPark.

To deprovision a device, navigate to the respective device in the Device Management application under **All devices**. Click **More** in the top right and select **Deprovision device**.

![Deprovision device](/images/device-protocols/lora-actility/lora-devices-deprovision.png)

After confirming the deprovisioning, the device will be deprovisioned in ThingPark.

To provision the device again, the device must be deleted and re-registered using LoRa device registration.

### Sending operations {#actility-sending-operations}

If a LoRa device supports receiving hexadecimal commands, you can send them using shell operations. Note that these commands are not serial monitor commands.

In order to send an operation, navigate to the device you want to send an operation to in the Device Management application under **All devices** and switch to the **Shell** tab.

In the following screenshot you can find some examples of a device protocol's predefined commands and their format.

![Predefined shell commands](/images/device-protocols/lora-actility/lora-devices-predefinedshell.png)

Enter the shell command or view/edit the predefined command in the **Command** field.

If you enter the command without defining a port, it will be sent to the default target port (that is, port 1) of the device. If you enter the command and define a port (format "command:port"), it will be sent to the specified target port instead of the default port.

![Port configuration](/images/device-protocols/lora-actility/lora-devices-port.png)

Click **Execute**. The operation is sent to the device. The timing depends on Actility ThingPark.

The status of the operation is set to SUCCESSFUL when the operation has successfully been sent to the ThingPark platform. The status of the operation is set to FAILED when a problem occurred with the validation of the command or after the operation has been sent to the Thingpark platform.

### ThingPark API availability monitoring {#thingpark-api-availability-monitoring}

The ThingPark API is monitored, and if it is not reachable, an alarm is created to notify all subscribed tenants using this feature. The alarm is cleared right after the ThingPark API is reachable again.

<img src="/images/device-protocols/lora-actility/lora-thingpark-api-monitor-alarm.png" alt="ThingPark API monitoring alarm" style="max-width: 100%">

### Uplink message processing {#actility-uplink-message-processing}

On receiving an uplink message, the {{< product-c8y-iot >}} platform creates the following measurements and events, and updates the corresponding device managed object.

- **Unprocessed data** - An event of type <code>c8y_ActilityUplinkRequest</code> (this type is based on the `event.uplink.type` set in the configuration file) is created with the unprocessed data.
- **Position** - The <code>c8y_Position</code> fragment of the device managed object is updated to capture the latitude, longitude, altitude and accuracy information of the device. Also, an event is created with the position information.
- **Spreading factor** - The <code>c8y_SpreadingFactor</code> fragment of the device managed object is updated to capture the spreading factor of the device.
- **Signal strength** - A measurement is created with RSSI and SNR values of the device signal strength.

### Troubleshooting {#actility-troubleshooting}

#### Device registration {#actility-device-registration}

**Access to device denied**

This warning message shows up when there already exists a provisioned device in ThingPark with the same device EUI used for device registration and the validation comparing those devices based on application EUI (for OTAA activation) and device profile has failed.

To resolve this, provide the correct application EUI from the [Connectivity](#configuring-credentials) application and device profile and try again.

**No LoRa provider settings found**

This warning message shows up when there are no credentials set up for the ThingPark account. To resolve this click **Settings** to navigate to the Administration application where the connections are configured.

<img src="/images/device-protocols/lora-actility/lora-registration-no-credentials.png" alt="Device registration failure without credentials" style="max-width: 100%">
<br>

To resolve this, refer to [Configuring multiple ThingPark account connections](#configuring-credentials).

**Getting device profiles from provider failed**

This warning message shows up when the tenant's access token to Thingpark becomes invalid. Invalidation of the token might happen when the same ThingPark credentials are used for another tenant.

This issue can be solved by reconfiguring the Actility ThingPark credentials to renew the access token. Refer to [Configuring multiple ThingPark account connections](#configuring-credentials) for reconfiguration of the credentials.

**No device protocols configured**

This warning message shows up when no LoRa device protocol exists to be used for device registration. To resolve this, click  **Device protocols** to navigate to the **Device protocols** page where the protocols are configured.

<img src="/images/device-protocols/lora-actility/lora-registration-no-devicetype.png" alt="No device protocol given for LoRa" style="max-width: 100%"/>

To resolve this, configure at least one device protocol in the [Device database](/device-management-application/managing-device-types).

**No connectivity plans with free slots available**

This warning message shows up when the connectivity plan in Actility ThingPark has reached the limit for the device count.

To resolve this, either contact ThingPark on the device quota limits for your connectivity plans or remove unused devices from ThingPark and retry registering the device in {{< product-c8y-iot >}}.

#### Connectivity {#actility-connectivity}

**Authorization to the LoRa platform failed**

This warning message shows up if a provided profile ID, username or password is invalid.

To resolve this, provide correct credentials and try again.

**Authentication to the Actility platform failed. Check if the base URL is correct**

To resolve this, provide a correct URL and try again.

**Authentication to the Actility platform failed with status code '400'. Check if the profile ID is correct**

To resolve this, provide a correct profile ID and try again.

**Authentication to the Actility platform failed with status code '401'. Check if the credentials are correct**

To resolve this, provide a correct username and password and try again.
