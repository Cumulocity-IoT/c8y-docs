---
weight: 30
title: Creating device protocols
layout: redirect
---


To process data from Sigfox devices, {{< product-c8y-iot >}} must understand the payload format of the devices. Mapping payload data to {{< product-c8y-iot >}} data can be done by creating a Sigfox device protocol.

During the [device registration](#registering-sigfox-devices), you can associate this device protocol. The received uplink callbacks for this device with a hexadecimal payload will then be mapped to the ones you have configured in your device protocol.

The device protocol assigned during Sigfox device registration can be changed from the **LPWAN** tab in the device details page.

![Sigfox LPWAN Tab](/images/device-protocols/sigfox/sigfox-lpwan-tab.png)

{{< c8y-admon-info >}}
Device protocol mapping only supports decoding for fixed byte positions based on the message type.
The length for the device payload parts, which is set in the **Number of bits** field, can be maximum 32 bits (4 bytes).
{{< /c8y-admon-info >}}

To create device protocols, select **Device protocols** in the **Device types** menu in the navigator of the Device Management application. You can either import an existing device protocol or create a new one.

### Importing a device protocol {#importing-a-device-protocol}

In the **Device protocols** page, click **Import**.

Select the desired predefined device type or upload it from a file. When ready, click **Import** again.

### Creating a new device protocol {#creating-a-new-device-protocol}

In the **Device protocols** page, click **New device protocol** and select **Sigfox** from the options list.

![New Sigfox protocol](/images/device-protocols/sigfox/sigfox-newprotocol.png)

Provide a name for the device protocol an and optional description, and click **Create**.

Under **Message types**, specify the message types. Sigfox devices can send messages of different types with different encodings per type. Depending on the device, the type can be determined by looking either at the FPort parameter of a message (Source: FPort) or at the subset of the message payload itself (Source: Payload).

In the **Source** field, select the way the message type is encoded:

- **Payload**: if the message type can be determined by looking at the subset of the message payload itself

In the following sample payload structure, the first byte indicates the message type source (as highlighted).

<img src="/images/device-protocols/sigfox/sigfox-payload-example1.png" alt="Example payload: message type source" style="max-width: 100%">

In the user interface, you can enter this type of message type source information as follows: In the **Start bit** field, indicate where the message type information starts in the payload.  In the **Number of bits** field, indicate how long this information is. For example, start bit = "0" and number of bits = "8".

![Sigfox protocol](/images/device-protocols/sigfox/sigfox-bits.png)

#### Configuring values {#configuring-values}

In the **Values** section, click **Add value** to create the value configuration.

In the following window, configure the relevant values as shown in this example.

**New value window part 1**
![Sigfox protocol add new value](/images/device-protocols/sigfox/sigfox-protocols-newvalue.png)

**New value window part 2**
![Sigfox protocol add new value](/images/device-protocols/sigfox/sigfox-protocols-newvalue2.png)

The value configuration maps the value in the payload of a message type to the {{< product-c8y-iot >}} data.

Under **Message type**, configure the **Message ID** according to your device message specification. The message ID is the numeric value identifying the message type. It will be matched with the message ID found in the source specified on the device protocol main page (that is, Payload or FPort). The message ID must be entered in decimal numbers (not hex).

In this sample payload structure the message ID is "1".

<img src="/images/device-protocols/sigfox/sigfox-payload-example2.png" alt="Example payload: message type source" style="max-width: 100%">

![Sigfox bits](/images/device-protocols/sigfox/sigfox-protocols-sigfoxid.png)

Under **General**, specify a name for the value and the category under which it will be displayed in the values list.

Under **Value selection**, specify from where the value should be extracted. In the **Start bit** field, indicate where the value information starts and in the **Number of bits** field, indicate the length of the information. The maximum value for the number of bits is 32 bits (4 bytes).

In this example, the "Channel 1 Type" information starts in byte 2 (that means, start bit = "16") and is 1 byte long (that means, number of bits = "8").

<img src="/images/device-protocols/sigfox/sigfox-payload-example3.png" alt="Example payload: value selection" style="max-width: 100%">

![Sigfox bits](/images/device-protocols/sigfox/sigfox-protocols-sigfoxbits.png)

The hexadecimal value is converted to a decimal number and afterwards a "value normalization" is applied.

Under **Value normalization**, specify how the raw value should be transformed before being stored in the platform and enter the appropriate values for:

- **Multiplier**: This value is multiplied with the value extracted from the **Value selection**. It can be decimal, negative or positive. By default it is set to 1.
- **Offset**: This value defines the offset that is added or subtracted. It can be decimal, negative or positive. By default it is set to 0.
- **Unit** (optional): A unit can be defined which is saved together with the value (for example temperature unit "C" for degree Celsius).

For detailed information on how to decode the payload, refer to the documentation of the device.

Under Options, select on of the following options, if required:

* **Signed** - if the value is a signed number.
* **Packed decimal** - if the value is BCD encoded.

Under **Functionalities**, specify how this device protocol should behave:

- **Send measurement**: creates a measurement with the decoded value.
- **Raise alarm**: creates an alarm if the value is not equal to zero.
- **Send event**: creates an event with the decoded value.
- **Update managed object**: updates a fragment in a managed object with the decoded value.

You can also have a nested structure with several values within a measurement, event or managed object fragment. In case of a measurement, all the properties of the same type will be merged to create a nested structure. In case of an event or a managed object all the properties with the same fragment are merged to create a nested structure. (Also refer to the [example](#nested-structure-example) of a nested structure for a "Position" device protocol below.)

Click **OK** to add the values to your device protocol.

![Value configurations of created device protocol](/images/device-protocols/sigfox/sigfox-protocol.png)

Click **Save** to create the device protocol.

**Example with single property**

The following images show an example for a message which sends a measurement when the battery level value changes.

**New value window part 1**
![Battery level changes example](/images/device-protocols/sigfox/sigfox-protocols-battery.png)

**New value window part 2**
![Battery level changes example](/images/device-protocols/sigfox/sigfox-protocols-battery2.png)


<a name="nested-structure-example"></a>**Example with nested structure**

The following images show an example of a nested structure for a device protocol, reporting the current position of a GPS device. The device protocol is named "Position" and contains values for longitude and latitude.

The message ID should be the same for all the values. Enter the rest of the parameters according to the instructions above. Enter "c8y_Position" in the **Managed object fragment** field and create a new value for each: longitude and latitude.

**New value window, Longitude**

![Value creation: Longitude-nested](/images/device-protocols/sigfox/sigfox-protocols-lng.png)

**New value window, Latitude**

![Value creation: Latitude-nested](/images/device-protocols/sigfox/sigfox-protocols-lat.png)

This will be the result:

![Value configuration in detail: nested structure](/images/device-protocols/sigfox/sigfox-protocols-gpsexample.png)

### Using custom decoding/encoding {#using-custom-decodingencoding}

The Sigfox agent also supports the decoding/encoding functionality by plugging in Custom microservice. Refer [LPWAN custom codec](/protocol-integration/lpwan-custom-codec) for further details.
