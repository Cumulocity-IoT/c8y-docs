---
weight: 40
title: LWM2M device protocols
layout: redirect
---

To process data from LWM2M devices, {{< product-c8y-iot >}} uses device protocols.
Device protocols are accessible through the **Devices Types** menu in the Device Management application. For details on the general usage, see [Managing device types](/device-management-application/managing-device-types).

### Creating LWM2M device protocols {#creating-lwm2m-device-protocols}

Once you have registered a device, you can manage LWM2M device protocols. Each piece of information available by the LWM2M client is a resource. The resources are further logically organized into objects. The LWM2M client can have any number of resources, each of which belongs to an object. In the device protocols you can observe your resources. Furthermore, you can choose whether to create measurements, events or alarms out of those resources.

To add a new LWM2M device protocol follow these steps:

1. In the Device Management application, move to the **Device protocol** page.
2. Click **Add device protocol** in the top menu bar.
3. In the upcoming dialog select **LWM2M** as device protocol type.
4. Next, upload an appropriate DDF or XML file. DDF or XML files describe the data provided by your device. They are typically provided by the manufacturer or by standards bodies such as IPSO. There are also 3 "special" device protocols (DDF files) for standard OMA objects: 6 (location tracking), 5 (firmware update) and 3 (device information). If these files are not uploaded, then neither location tracking nor firmware updates will work. By default, the LWM2M agent adds mappings to these objects and knows how to "handle" their information without any additional configuration. The XML schema used by LWM2M can be found at [http://www.openmobilealliance.org/tech/profiles/LWM2M.xsd](http://www.openmobilealliance.org/tech/profiles/LWM2M.xsd). <br>
If the DDF files for the default mappings are uploaded in the {{< management-tenant >}}, all subscribed user tenants will inherit this behavior.
In the next dialog, you can see the name and description of the protocol. Click **Complete** to create the new device protocol.

5. The device protocol opens in a new page that contains the object ID and description and the list of resources that belongs to this object. In this page additional functionalities to a resource can be added.

![Protocol example](/images/device-protocols/lwm2m/lwm2m-protocol-example.png)

{{< c8y-admon-info >}}
LWM2M protocol resources cannot be edited.
{{< /c8y-admon-info >}}

### Adding additional functionalities to a resource {#adding-additional-functionalities-to-a-resource}

To access resource functionalities proceed to the device protocol page and click one of the resource instances. See below for the functionalities that you may enable:

#### Send measurement {#send-measurement}

Turn on **Send measurement** to specify a measurement.

- Enter the type of the measurement. For example, "c8y_AccelerationMeasurement".
- Series are any fragments in measurements that contain a "value" property. For example, in the series field you can enter: "c8y_AccelerationMeasurement.acceleration".
- The "Unit" field specifies the unit of the given measurement. For example, "m/s" for velocity.

#### Create alarm {#create-alarm}

Turn on **Create alarm** if you want to create an alarm out of the resource. Specify the following parameters (all mandatory):

- Severity: CRITICAL, MAJOR, MINOR, WARNING
- Type
- Status: ACTIVE, ACKNOWLEDGED, CLEARED
- Text

#### Send Event {#send-event}

Turn on **Send event** to send an event each time you receive a resource value. Specify the following parameters:

- Enter the type of the event. For example, "com_cumulocity_model_DoorSensorEvent".
- Enter the text which will be sent. For example, "Door sensor was triggered".

#### Custom Actions {#custom-actions}

Turn on **Custom Actions** to map LWM2M data into {{< product-c8y-iot >}} using custom data processing actions. For specialized integration use cases, it is required to perform customized data processing on LWM2M data. One example are LWM2M resources of the OPAQUE data type that contain proprietary, binary data, CBOR, XML or alike.

We distinguish here between predefined custom actions and decoder microservices.

##### Predefined custom actions {#predefined-custom-actions}

There are several predefined custom actions which can be selected to apply actions to the relevant resources.

Actions that are relevant for a device object (object ID /3):
- device:updateManufacturer
  - Adds manufacturer information to the name of the device in the following format &ldquo;LWM2M &lt;manufacturer&gt; &lt;registration endpoint&gt;&rdquo;
- device:updateModelNumber
  - Stores to the device managed object with the `c8y_Hardware` fragment &ldquo;model&rdquo; property.
- device:updateSerialNumber
  - Stores to the device managed object with the `c8y_Hardware` fragment &ldquo;serialNumber&rdquo; property.
- device:updateFirmwareVersion
  - Stores to the device managed object with the `c8y_Hardware` fragment &ldquo;revision&rdquo; property.

Actions that are relevant for connectivity monitoring (object ID /4):
- connectivity:updateCellId
  - Stores to the device managed object with the `c8y_Mobile` fragment &ldquo;cellId&rdquo; property.
- connectiviy:updateSmnc
  - Stores to the device managed object with the `c8y_Mobile` fragment &ldquo;mnc&rdquo; property.
- connectivity:updateSmcc
  - Stores to the device managed object with the `c8y_Mobile` fragment &ldquo;mcc&rdquo; property.
- connectivity:updateRssi
  - Stores the value as device measurement with the `c8y_SignalStrength` type and fragment and &ldquo;rssi&rdquo; property.
  - In the same measurement, stores resource path information in &ldquo;resourcePath&rdquo; fragment and also in &ldquo;objectResourcePath_&lt;resource path&gt;&rdquo; fragment name.
  - In the same measurement, stores device name information in &ldquo;device!Name&rdquo; fragment.
  - In the same measurement, stores device mobile information in &ldquo;device!c8y_Mobile&rdquo; fragment.

Below is an example where the “connectivity:updateRssi” custom action is selected for the Connectivity monitoring (/4) radio signal strength in order to create the signal measurement for the device.

![Custom action example](/images/device-protocols/lwm2m/lwm2m-custom-action-connectivity-signal.png)

##### Decoder microservices

{{< product-c8y-iot >}} LWM2M allows the set of custom actions to be extended using decoder microservices. A decoder microservice is an ordinary {{< product-c8y-iot >}} microservice that implements a simple decoder interface. The LWM2M agent calls this microservice for decoding data in a customer-specific way. We provide an according example how to write such a decoder microservice in our public [GitHub repository](https://github.com/SoftwareAG/cumulocity-examples).


The LWM2M agent serializes different LWM2M data types to binary data depending on the type of the corresponding resource:

<table>
<tr>
<th>LWM2M resource type</th>
<th>Length (bytes)</th>
<th>Byte Order</th>
<th width="30%">Comment</th>
</tr>

<tr>
<td>OPAQUE</td>
<td>dynamic</td>
<td>unchanged</td>
<td>OPAQUE data is used to transmit raw binary blobs between a LWM2M device and a LWM2M server. The LWM2M agent simply forwards this data to the decoder microservice. The length and the order of the bytes remain unchanged.</td>
</tr>

<tr>
<td>INTEGER</td>
<td>8</td>
<td>Big Endian</td>
<td></td>
</tr>

<tr>
<td>FLOAT</td>
<td>8</td>
<td>Big Endian</td>
<td></td>
</tr>

<tr>
<td>STRING</td>
<td>dynamic</td>
<td></td>
<td>The string is serialized into a series of bytes, starting from the first character in the string. The first byte corresponds to its first character. Likewise, the last byte corresponds to the last character of the string. </td>
</tr>

<tr>
<td>CORE LINK</td>
<td>dynamic</td>
<td></td>
<td>The core links are first converted into a string representation of multiple links, separated by comma. Example: <code>&lt;/43/0&gt;,&lt;/33/1&gt;</code>. This string is then serialized to a series of bytes (see above). </td>
</tr>

<tr>
<td>TIME</td>
<td>8</td>
<td>Big Endian</td>
<td>Time data is represented as a 8-byte integer value (see above). The value here corresponds to the number of milliseconds since January 1, 1970, 00:00:00 GMT. </td>
</tr>

<tr>
<td>BOOLEAN</td>
<td>1</td>
<td></td>
<td>Boolean data is represented by a single byte (0 = false, 1 = true).</td>
</tr>

<tr>
<td>OBJLNK</td>
<td>dynamic</td>
<td></td>
<td>The OBJLNK is converted to a string first. The binary payload corresponds to the bytes of the string, starting with the first character.</td>
</tr>

</table>


#### Ignore empty values {#ignore-empty-values}

If the **Ignore empty values** option is selected and a device sends empty data, the agent does not perform any action that is configured. If this option is not selected and a device sends empty data, the agent performs the mapped action (default behavior).


#### Auto observe {#auto-observe}

If **Auto-Observe** is turned on for a resource, the LWM2M server observes a specific resource for changes.

![Auto-observe example](/images/device-protocols/lwm2m/lwm2m-autoobserve.png)

{{< c8y-admon-info >}}
At least one functionality must be set to enable "Auto observe".
{{< /c8y-admon-info >}}

### Alarms on device protocol mapping failures {#alarms-on-device-protocol-mapping-failures}

There are two types of alarms raised related to device protocol mapping failures:

- Alarm for no mapping known: This alarm is raised when value is read or observed but no mapping for this resource is found.
This can be resolved by importing device protocol for this resource.

- Alarm due to non-numeric/non-Boolean value received for measurement mapping: This alarm is raised when the resource has a measurement mapping set up but measurement cannot be created because received value is a non-numeric/non-Boolean value.
