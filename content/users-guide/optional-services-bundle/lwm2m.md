---
weight: 65
title: LightweightM2M
layout: redirect
---

Lightweight M2M (LWM2M) is a traffic and resource-optimized protocol to remotely manage IoT devices. The protocol is standardized by the Open Mobile Alliance. For more information, see [http://openmobilealliance.org/iot/lightweight-m2m-lwm2m](http://openmobilealliance.org/iot/lightweight-m2m-lwm2m).

You can connect any device supporting LWM2M to Cumulocity IoT without programming. Instead, you configure how LWM2M devices are mapped to Cumulocity IoT using device protocols.

![Device protocols](/images/users-guide/lwm2m/lwm2m-deviceprotocol.png)


### <a name="register"></a>Registering LWM2M devices

To connect LWM2M devices, you need to upload a CSV file with registration data. This data is required to enable LWM2M communication. The CSV holds all information for factory bootstrap and client-initiated bootstrap. In the factory bootstrap mode, the LWM2M client has been configured with the necessary bootstrap information prior to the deployment of the device. The client initiated bootstrap mode requires a LWM2M bootstrap-server account pre-loaded in the LWM2M client. Below, you can see two CSV examples:

![CSV example 1](/images/users-guide/lwm2m/lwm2m-csv1.png)

In the first CSV example you can see the following fields:

<table>
<col style="width:19%">
<col style="width:81%">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">ID</td>
<td style="text-align:left">Unique ID of the device. For example, the ID could be an IMEI, serial number, etc.</td>
</tr>
<tr>
<td style="text-align:left">IDTYPE</td>
<td style="text-align:left">The type of the device.</td>
</tr>
<tr>
<td style="text-align:left">CREDENTIALS</td>
<td style="text-align:left">The content of this field is not used by LWM2M.</td>
</tr>
<tr>
<td style="text-align:left">NAME</td>
<td style="text-align:left">The name of the device. In this case the name of the device is the same as the device ID.</td>
</tr>
<tr>
<td style="text-align:left">TYPE</td>
<td style="text-align:left">This field needs to have the value "c8y_lwm2m”.</td>
</tr>
<tr>
<td style="text-align:left">SHELL</td>
<td style="text-align:left">To enable “Shell”, the value of this field must be “1”. If you want to disable “Shell” the value must be “0”. For more info about the shell commands, see <a href="#shell_commands" class="no-ajaxy">Shell commands</a>.</td>
</tr>
<tr>
<td style="text-align:left">com_cumulocity_model_Agent</td>
<td style="text-align:left">This field needs to have the value "1".</td>
</tr>
<tr>
<td style="text-align:left">endpoint id</td>
<td style="text-align:left">Indicates the LWM2M client’s “Endpoint ID” in order to allow the LwM2M bootstrap to provision the bootstrap information for the LWM2M client.</td>
</tr>
<tr>
<td style="text-align:left">lwm2m server url</td>
<td style="text-align:left">The URL the server is using for bootstrap. The LWM2M bootstrap server is used to provision the LWM2M client with the information required to contact the LWM2M servers. If you are using the Cumulocity IoT service the hostname of the LWM2M server is "lwm2m.cumulocity.com". The bootstrap server port is "5683" and the LWM2M port is "5783". Note, that these values can be different for other services.</td>
</tr>
<tr>
<td style="text-align:left">securityMode</td>
<td style="text-align:left">In this example the value of the security mode is “NO_SEC” which means that there is no security. It is highly recommended to always protect the LWM2M protocol. However, there are scenarios in which the LWM2M protocol is deployed in environments where the lower layer security mechanisms are provided. Currently Cumulocity IoT supports only “NO_SEC” and “PSK”. With “PSK”, the client and server have a common secret symmetric cryptography. In the next example you will see how the CSV file should look when the security mode value is “NO_SEC”.</td>
</tr>
</tbody>
</table>

The table below reflects the full set of possible fields that can be added:

<table>
<col style="width:20%">
<col style="width:10%">
<col style="width:55%">
<col style="width:15%">
<thead>
<tr>
<th style="text-align: left">Field</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">endpoint id</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The name of the LWM2M endpoint.</td>
<td style="text-align: left">Yes</td>
</tr>
<tr>
<td style="text-align: left">lwm2m server url</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The URL of the LWM2M server to be sent to the devices during bootstrap. If you are using the Cumulocity IoT service the hostname of the LWM2M server is "lwm2m.cumulocity.com". The bootstrap server port is "5683" and the LWM2M port is "5783". Note, that these values can be different for other services.</td>
<td style="text-align: left">Yes, for LWM2M bootstrap</td>
</tr>
<tr>
<td style="text-align: left">securityMode</td>
<td style="text-align: left">String, &ldquo;NO_SEC&rdquo; or &ldquo;PSK</td>
<td style="text-align: left; height: 40px;">The LWM2M security mode to be used. Possible values are PSK and NO_SEC.</td>
<td style="text-align: left">Yes</td>
</tr>
<tr>
<td style="text-align: left">serverPublicKey</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The public key of the server.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">generateBootstrapServerConfig</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">Toggles if Cumulocity IoT generates a server config for the LWM2M bootstrap server and writes that back during bootstrap. Default is false.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">securityInstanceOffset</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The first instance to be used during bootstrap to which entries are written. Default is "0". If set e.g. to "3", the first instance will be three.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr">
<td style="text-align: left">bootstrapShortServerId</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The short server ID to be used for the bootstrap server. Default is "0".</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">lwm2mShortServerId</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The short server ID to be used for LWM2M server. Default is "1".</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 13px;">registrationLifetime</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The registration lifetime that is sent to the device during bootstrap. Overrides global agent configuration.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left">defaultMinimumPeriod</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The default minimum period to configure during bootstrap. See LWM2M Spec for explanation.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 13px;">defaultMaximumPeriod</td>
<td style="text-align: left">Integer</td>
<td style="text-align: left">The default max period to configure during bootstrap. See LWM2M Spec for explanation.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr style="height: 26px;">
<td style="text-align: left">bindingMode</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The LWM2M binding mode to be reported to the device. Supported are &ldquo;UQ&rdquo; (default, queuing) and &ldquo;U&rdquo; (unqueued). Note, that Cumulocity IoT will always queue operations.</td>
<td style="text-align: left">Optional</td>
</tr>
<tr>
<td style="text-align: left; height: 40px;">notificationIfDisabled (true/false)</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">See LWM2M spec. Default: Not configured.</td>
<td style="text-align: left">Optional, defaults to Leshan default behavior.</td>
</tr>
<tr style="height: 40px;">
<td style="text-align: left">disableTimeout (true/false)</td>
<td style="text-align: left">Boolean</td>
<td style="text-align: left">See LWM2M spec. Default: Not configured.</td>
<td style="text-align: left">Optional, defaults to Leshan default behavior.</td>
</tr>
</tbody>
</table>

![CSV example 2.1](/images/users-guide/lwm2m/lwm2m-psk-example.png)

In this CSV example, the security mode value is “PSK”. With "PSK" enabled, additional mandatory fields must be filled. All fields, available to "PSK", can be observed in the table below:

<table>
<col style="width:20%">
<col style="width:10%">
<col style="width:55%">
<col style="width:15%">
<thead>
<tr>
<th style="text-align: left">Field</th>
<th style="text-align: left">Type</th>
<th style="text-align: left">Description</th>
<th style="text-align: left">Mandatory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">lwm2m psk_key</td>
<td style="text-align: left">String</td>
<td style="text-align: left">For security mode PSK: The key used by the device for LWM2M in PSK mode. Will be delivered to the device during bootstrap.</td>
<td style="text-align: left; height: 26px;">Mandatory for PSK. Should not be set for NO_SEC.</td>
</tr>
<tr>
<td style="text-align: left">lwm2m psk_id</td>
<td style="text-align: left">String</td>
<td style="text-align: left">For security mode PSK: The ID used by the device for LWM2M in PSK mode. Will be delivered to the device during bootstrap. Mostly the same as the endpoint name.</td>
<td style="text-align: left">Mandatory for PSK. Should not be set for NO_SEC.</td>
</tr>
<tr>
<td style="text-align: left">bootstrap psk_id</td>
<td style="text-align: left">String</td>
<td style="text-align: left">For security mode PSK: The ID used by the device for bootstrapping in PSK mode.</td>
<td style="text-align: left">Yes for PSK</td>
</tr>
<tr>
<td style="text-align: left">bootstrap psk_key</td>
<td style="text-align: left">String</td>
<td style="text-align: left">For security mode PSK: The key used by the device for bootstrapping in PSK mode.</td>
<td style="text-align: left">Yes for PSK</td>
</tr>
<tr>
<td style="text-align: left">external-c8y_BootstrapPskId</td>
<td style="text-align: left">String</td>
<td style="text-align: left">The ID being used to find a device during bootstrap.</td>
<td style="text-align: left">Optional</td>
</tr>
</tbody>
</table>

> **Info**: Firmware updates are also supported. For more information, see [Device Management > Managing device data](/users-guide/device-management/#software-repo) in the User guide.

After creation, the bootstrap parameters can be viewed and changed in the **LWM2M bootstrap parameters** tab in the **Device details** page, see [LWM2M bootstrap parameters](#lwm2m-bootstrap).

### <a name="device_protocols"></a>LWM2M device protocols

To process data from LWM2M devices, Cumulocity IoT uses device protocols.
Device protocols are accessible through the **Devices Types** menu in the Device Management application. For details on the general usage, see [Device Management > Managing device types](/users-guide/device-management/#managing-device-types).

#### <a name="creating_device_protocols"></a>Creating LWM2M device protocols

Once you have registered a device with the proper CSV file, you can manage LWM2M device protocols. Each piece of information available by the LWM2M client is a resource. The resources are further logically organized into objects. The LWM2M client can have any number of resources, each of which belongs to an object. In the device protocols you can observe your resources. Furthermore, you can choose whether to create measurements, events or alarms out of those resources.

To add a new LWM2M device protocol follow these steps:

1. In the Device Management application, move to the **Device protocol** page.
2. Click **Add device protocol** in the top menu bar.
3. In the upcoming dialog select **LWM2M** as device protocol type. <br><br>

![Add new protocol](/images/users-guide/lwm2m/lwm2m-newprotocol.png)

4. Next, upload an appropriate DDF or XML file. DDF or XML files describe the data provided by your device. They are typically provided by the manufacturer or by standards bodies such as IPSO. There are also 3 "special" device protocols (DDF files) for standard OMA objects: 6 (location tracking), 5 (firmware update) and 3 (device information). If these files are not uploaded, then neither location tracking nor firmware updates will work. By default, the LWM2M agent adds mappings to these objects and knows how to "handle" their information without any additional configuration. The XML schema used by LWM2M can be found here. <br>
If the DDF files for the default mappings are uploaded in the management tenant, all subscribed user tenants will inherit this behavior. <br><br>

![Upload DDF file](/images/users-guide/lwm2m/lwm2m-uploadDDF.png)

5. In the next dialog, you can see the name and description of the protocol. Click **Continue** to create the new device protocol. <br><br>

![Upload DDF file](/images/users-guide/lwm2m/lwm2m-uploadprotocol.png)

The device protocol will open in a new page.

![Example protocol](/images/users-guide/lwm2m/lwm2m-protocol-example.png)

In the device protocol page, you will see the description at the top left and the ID, the creation date and date of the last update at the top right.

Below, a list of resources configured for the device will be listed (which is empty when creating a new protocol), showing the ID, name and potentially configured functionalities for each resource.

> **Info**: LWM2M protocol resources cannot be edited.

Example: In the following screenshot you can see an example device protocol. This object should be used with a temperature sensor to report a temperature measurement. It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is “degrees Celsius”.

![Example protocol2](/images/users-guide/lwm2m/lwm2m-temperature-example.png)

#### <a name="resources"></a>Adding additional functionalities to a resource

The functionalities that you may enable are the following:

![Resource functionalities](/images/users-guide/lwm2m/lwm2m-functionalities.png)

**Send measurement**

Turn on **Send measurement** to specify a measurement.

- Enter the type of the measurement. For example, “c8y_AccelerationMeasurement”.
- Series are any fragments in measurements that contain a “value” property. For example, in the series field you can enter: “c8y_AccelerationMeasurement.acceleration”
- The “Unit” field specifies the unit of the given measurement. For example, “m/s” for velocity.

**Create alarm**

Turn on **Create alarm** if you want to create an alarm out of the resource. Specify the following parameters (all mandatory):

- Severity - one of CRITICAL, MAJOR, MINOR, WARNING
- Type
- Status - one of ACTIVE, ACKNOWLEDGED, CLEARED
- Text

**Send Event**

Turn on **Send event** to send an event each time you receive a resource value. Specify the following parameters:

- Enter the type of the event. For example, "com_cumulocity_model_DoorSensorEvent".
- Enter the text which will be sent. For example, "Door sensor was triggered".

**Custom Actions**

Turn on **Custom Actions** to map LWM2M data into Cumulocity IoT using custom data processing actions. For specialized integration use cases, it is required to perform customized data processing on LWM2M data. One example are LWM2M resources of the OPAQUE data type that contain proprietary, binary data, CBOR, XML or alike.

![Custom actions](/images/users-guide/lwm2m/lwm2m-customactions.png)

Cumulocity IoT LWM2M allows the set of custom actions to be extended using decoder microservices. A decoder microservice is an ordinary Cumulocity IoT microservice that implements a simple decoder interface. The LWM2M agent calls this microservice for decoding data in a customer-specific way. We are providing an according example how to write such a decoder microservice in our public [Bitbucket repository](https://bitbucket.org/m2m/cumulocity-examples/src/develop/).

**Auto observe**

If **Auto-Observe** is turned on for a resource, the LWM2M server observes a specific resource for changes.

> **Info**: At least one functionality must be set to enable "Auto observe".

![Resource](/images/users-guide/lwm2m/lwm2m-autoobserve.png)

### LWM2M device details

>**Info**: In the Device management application, you can view all details of a device. The following details are specific to LWM2M devices. For information on general details refer to [Device details](/users-guide/device-management#device-details) in the Device management section.

#### <a name="objects"></a> Objects

In the **Objects** tab of a LWM2M device, you can view all objects, resources and instances of the device. Additionally, you can create new operations, see all currently pending operations and view the history of all previous operations.

![Objects view](/images/users-guide/lwm2m/lwm2m-objects.png)

> **Info**: In order to see resources in the **Objects** tab, the resources first have to be added in the **Device Protocols** page.

The following operations may be available in each instance:

- Read Object: Reads all instances for the selected object and lists all available resources for each instance.
<br><br>
![Read Objects](/images/users-guide/lwm2m/lwm2m-devices-readobject.png)
<br><br>
- Read Instance: Reads the current instance of the given object and lists all available resources.
<br><br>
![Read Instance](/images/users-guide/lwm2m/lwm2m-devices-readinstance.png)
<br><br>
- Create Instance: Creates a new instance for the selected object.
- Delete Instance: Deletes the selected instance.

> **Info:**  Some instances do not have all of the listed operations.

Some object cards show additional operations which can be performed. These operations become available after reading the object/instance, for example, device **Update**. In order to perform the operation, click **Execute**.

![Execute operation](/images/users-guide/lwm2m/lwm2m-devices-execute.png)

More information can be acquired for each resource by hovering over the tooltip icon.

![Tooltip](/images/users-guide/lwm2m/lwm2m-devices-tooltip.png)

Additional information on recent operations can be viewed by clicking the operations button located on the right side of an instance card. The button is only visible if any operation has been performed. The number of unread operations can be seen on the top right of the button. In the example below there is only one.

![Recent operations](/images/users-guide/lwm2m/lwm2m-devices-operations.png)
![Recent operations 2](/images/users-guide/lwm2m/lwm2m-devices-operations2.png)

To view the history of all operations, simply click **View history**. Note, that you will be redirected to the **Control** tab.

![View History control tab](/images/users-guide/lwm2m/lwm2m-devices-control.png)

**Audit Configuration**

In the **Audit configuration** page you can audit the current device by comparing it to a selected reference device. It is also possible to sync properties to the values of the referenced device.

Click **Audit configuration** in the right of the top menu bar to navigate to the **Audit configuration** page.

![Audit configuration](/images/users-guide/lwm2m/lwm2m-devices-audit.png)

To sync properties, select the desired reference device from the dropdown list. Check the properties that you wish to sync and click **Sync selected properties**.

> **Info**: The numbers in the green circles represent the number of properties in the instance which have the same value in both devices. Respectively, the numbers in the red circles represent the number of properties which have different values compared to the values of the referenced device. If an instance is expanded, you can select only specific properties which can be synced.

![Sync properties](/images/users-guide/lwm2m/lwm2m-devices-sync.png)

#### <a name="lwm2m-bootstrap"></a> LWM2M bootstrap parameters

In the **LWM2M bootstrap parameters** tab, bootstrap parameters of the current device can be viewed and changed. To modify a parameter, enter the desired value in a field of your choice and click **Save.**

![Bootstrap customization](/images/users-guide/lwm2m/lwm2m-devices-bootstrap.png)

> **Important:** Currently only the "NO_SEC" and "PSK" security modes are supported.

For further information on the fields in the **LWM2M bootstrap parameters** tab, see [Registering LWM2M devices](#register).


### <a name="shell_commands"></a> Handling LWM2M shell commands

In the **Shell** tab of a device, LWM2M shell commands can be performed. Each command has a different functionality. Find all available placeholders (e.g. “objectID”, “instanceID”) and commands with their respective descriptions below:

|Placeholder|Description|
|:----------|:----------|
|objectID|The ID of the object.|
|instanceID|The ID of the instance. Some objects can have multiple instances. For example, “3300” is a temperature sensor object. Each device can have up to 10 sensors. In this case the instance ID would be 3300/1...10 depending on the sensor that you would like to focus.|
|resourceID|The ID of the desired resource. The resources describe the characteristics of each object. All instances of a given object have the same resources, but the value of the resources may be different.|
|Firmware version|The current version of the firmware.|
|Firmware url|The URL from which the new version of the firmware will be downloaded.|

In the next table you will see all available commands and a brief description of their functionality.

|Command|Description|
|:------|:----------|
|read /<objectID>/<instanceID>/<resourceID>|Reads a resource path|
|observe /<objectID>/<instanceID>/<resourceID>|Enables the observe functionality|
|execute /<objectID>/<instanceID>/<resourceID>|Executes a resource on the device|
|cancelobservation /<objectID>/<instanceID>/<resourceID>|Cancels the observation functionality from the desired resource|
|delete /<objectID>/<instanceID>[/<resourceID>]|Deletes a given object/instance/resource|
|discover /<objectID>/<instanceID>/<resourceID>|Shows all resources of the given object|
|create /<objectID> [JSON]|Creates a new object. The JSON argument is optional|
|writeattr /<objectID>/<instanceID>/<resourceID> {pmin=<sec>}{&pmax=<sec>}{&greater=<num>}{&less=<num>}{&step=<num>}{&cancel}|Writes additional attributes to the object. Typically used for conditional observes|
|fwupdate /<Firmware name>/<firmware version>/<firmware_ur>/l|Updates the firmware of the agent|

### <a name="validation_rules"></a> Adding validation rules to resources

Validation rules are used to verify that the data a user enters in a resource meets the constraints you specify before the user can save the resource.

Validation rules can only be added to resources which have “write” permissions. Resources which can have validation rules are marked by the following icon:

![Validation rule icon](/images/users-guide/lwm2m/lwm2m-protocols-rules.png)

When hovering over the icon, you can see whether there are defined validation rules.

Add a new validation rule by clicking on the desired resource and then click **Add validation rule**.

![Add validation rule](/images/users-guide/LWM2M/lwm2m-protocols-addrule.png)

Validation rules can have the following types:

- **Date:** Simply enter a date and choose your desired rule.
- **Number:** Only values of “Integer” or “Float” type are allowed depending on the resource.
- **ObjectLink:** Reference to another object using the format “/Object/Instance/Resource”.
- **Regex:** Add a string which describes the validation pattern. For example, “.*dd” means that the string must end with “dd”.
- **String:** Enter a string value which can be either “True” or “False".

After selecting a type, the following rules can be chosen:

- Greater than
- Lower than
- Equals
- Equals not
- Greater or equals than
- Lower or equals than

> **Info:** Not all rules are available to each type.

To delete a rule, simply click on the delete icon:

![Remove lwm2m rule](/images/users-guide/lwm2m/lwm2m-protocols-removerule.png)

Click **Save** to save your settings.

#### Complex rulesets

In order to enable more complex conditions,  multiple validation rules can be defined for a resource:

- Multiple rules can be defined in a validation rule group. A user input is only valid if each of the rules in the validation rule group is satisfied (logical AND).
- It is possible to declare multiple validation rule groups. If multiple validation rule groups are declared, user input is valid if any of the validation rule groups is satisfied (logical OR).

The screenshot above provides an example for the use of validation rule groups: User input is valid if the given string does not match “test” (equals not). It is also valid if it ends with “asd” and it matches the contents of the LWM2M resource /3/0/15.

Complex rulesets are based on Boolean Disjunctive Normal Form, which allows arbitrary complex rules to be defined.
