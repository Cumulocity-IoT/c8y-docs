---
weight: 30
title: Creating device protocols
layout: redirect
---


To process data from LoRa devices, {{< product-c8y-iot >}} needs to understand the payload format of the devices. Mapping a payload data to {{< product-c8y-iot >}} data can be done by creating a LoRa device protocol.

During the [device registration](#registering-lora-devices), you can associate this device protocol. The received uplink callbacks for this device with a hexadecimal payload will then be mapped to the ones you have configured in your device protocol.

The device protocol assigned during device registration can be changed from the **LPWAN** tab in the device details page.

![Actility LPWAN Tab](/images/device-protocols/lora-actility/lora-lpwan-tab.png)

{{< c8y-admon-info >}}
Device protocol mapping only supports decoding for fixed byte positions based on the message type.
The length for the device payload parts, which is set in the **Number of bits** field, can be maximum 32 bits (4 bytes).
{{< /c8y-admon-info >}}

In order to create a device protocol, navigate to the Device Management application and select **Device protocols** in the **Device types** menu in the navigator. You can either import an existing device protocol or create a new one or use the device protocols created by an LPWAN custom codec microservice.

### Importing a predefined device protocol {#importing-a-predefined-device-protocol}

In the **Device protocols** page, click **Import**.

Select the predefined device type, for example "LoRaWAN Demonstrator" or upload from a file. Click **Import**.

![Import device protocol](/images/device-protocols/lora-actility/lora-protocols-import.png)

Alternatively, you may also load the device protocol from a file and import it.

### Creating a new device protocol {#creating-a-new-device-protocol}

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

Under Options, select one of the following options, if required:

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

#### Example with single property {#example-with-single-property}

The following image shows an example for a message which sends a measurement when the battery level changes.

**New value window part 1**
![Battery level changes example](/images/device-protocols/lora-actility/lora-protocols-battery.png)

**New value window part 2**
<br><br>
![Battery level changes example](/images/device-protocols/lora-actility/lora-protocols-battery2.png)

#### Example with nested structure {#example-with-nested-structure}

The following image shows an example of a nested structure for a device protocol reporting the current position of a GPS device. The display category is named "Position" and contains values for longitude and latitude.

The message ID should be the same for all the values. Enter the rest of the parameters according to the instructions above. Enter "c8y_Position" in the **Managed object fragment** field and create a new value for each: longitude and latitude.

**New value window, Longitude**

![Value creation: Longitude-nested](/images/device-protocols/lora-actility/lora-protocols-lng.png)

**New value window, Latitude**

![Value creation: Latitude-nested](/images/device-protocols/lora-actility/lora-protocols-lat.png)

This will be the result:

![Value configuration in detail: nested structure](/images/device-protocols/lora-actility/lora-protocols-gpsexample.png)

### Using custom decoding/encoding {#using-custom-decodingencoding}

The Actility agent also supports the decoding/encoding functionality by plugging in the custom microservice. Refer to [LPWAN custom codec](/protocol-integration/lpwan-custom-codec) for further details.
