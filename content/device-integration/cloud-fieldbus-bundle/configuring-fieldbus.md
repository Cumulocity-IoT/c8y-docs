---
weight: 40
title: Configuring fieldbus device protocols
layout: redirect
---

New fieldbus device protocols can be created in the **Device protocols** page which is opened from the **Device types** menu in the navigator.

1. Click **Add device protocol** in the top menu bar.
2. Select the protocol of your device from the list.
3. Enter a name for your device and an optional description.
4. Click **Create** to create the protocol.

The device protocol will be added to the device protocol list.

![Device protocol list](/images/device-protocols/cloud-fieldbus/fieldbus-deviceprotocols-modbus.png)

Next, you can configure the device protocol, following the descriptions for the respective protocol type below.

If you edit a device protocol that is currently in use, you may need to
* restart the terminals that use the device protocol,
* reconfigure dashboards and widgets that use the device protocol.

### Configuring Modbus device protocols {#configuring-modbus-device-protocols}

#### To add a coil definition (discrete outputs) {#to-add-a-coil-definition-discrete-outputs}

Click **Add Coil** in the **Coils (discrete output)** section, to add a coil definition.

1. Enter the name of the coil as being displayed in the user interface.
2. Optionally, enter the display category to structure your data in widgets.
3. In the **Value selection** section, enter the number of the coil in the Modbus device.
4. In the **Functionalities** section, you may select the following actions:
	* **Show status** - To show the current value in the UI, for example, in the "Fieldbus device" widget. In this case, you can enter the text that the UI should show for unset and set coils.
	* **Update status** - To enable to update the current value from the UI, for example, in the "Fieldbus device" widget.
	* **Raise alarm** - To raise an alarm when the coil is set in the device. In this case, you can specify the type of the alarm that is raised, its text and its severity. Note that there can only be one alarm active of a particular type for a particular device.
	* **Send event** - To send an event each time the value changes. If selected, you may specify the type of event and the text in the event.
5. Click **Save** to save your configuration.

![Add coil](/images/device-protocols/cloud-fieldbus/fieldbus-deviceprotocols-newcoil.png)

#### To add a discrete inputs definition {#to-add-a-discrete-inputs-definition}

The same settings can be specified for discrete inputs. However, it is not possible to update the status of a discrete input.

#### To add a register definition {#to-add-a-register-definition}

Click **Add holding register** under **Holding registers** or **Add input register** under **Input registers** to add a register definition.

1. In the **General** section, specify a name for the register and a display category to structure your data in widgets.
2. In the **Value selection** section, enter the number of the register in the Modbus device. You can indicate a subset of bits to be used from a register by providing a start bit and a number of bits. This allows you to split a physical Modbus register into a set of "logical registers". It is important to note that in {{< product-c8y-iot >}} registers are numbered as per the standard Modbus specification, that is they start from 1. This differs with some device manufacturers which count registers starting from 0.
3. In the **Normalization** section, specify how the raw value should be transformed before storing it in the platform. To scale the integer value read from the Modbus device, you can enter a **Multiplier**, a **Divisor** and a number of decimal places in the **Right Shift** field. The register value is first multiplied by the multiplier, then divided by the divisor and then shifted by the number of decimal places. Note, that the terminal may use integer arithmetic to calculate values sent to {{< product-c8y-iot >}}. For example, if you use a divisor of one and one decimal place, a value of 231 read from the terminal will be sent as 23.1 to {{< product-c8y-iot >}}. If you use a divisor of ten and no decimal places, the terminal may send 23 to {{< product-c8y-iot >}} (depending on its implementation). In the **Unit** field, indicate the unit of the data, for example, "C" for temperature values.
4. In the Options section, select the following options:
	* **Signed** - If the register value should be interpreted as signed number.
	* **Enumeration type** - If the register value should be interpreted as 	enumeration of discrete values. If **Enumeration type** is selected, you can 	click **Add value** to add mappings from a discrete value to a text to be 	shown for this value in the widget. Click **Remove value** to remove the 	mapping.
	* **Little endian** - If the register value should be interpreted in little-endian format based on 8-bit values.
5. In the **Functionalities** section, you may select the following actions:
	* **Show status** - To show the current value in the UI, for example, in the "Fieldbus device" widget.
	* **Update status** - To enable to update the current value from the UI, for example, in the "Fieldbus device" widget. If **Update status** is selected, two additional fields **Minimum** and **Maximum** appear. Using these fields, you can constrain numerical values entered in the widget.
	* **Send measurement** - To collect the values of the register regularly according to the transmit interval (see [above](#connecting-fieldbus)). In this case, add a measurement type and a series to be used. For each measurement type, a chart is created in the **Measurements** tab. For each series, a graph is created in the chart. The unit is used for labelling the measurement in the chart and in the "Fieldbus device" widget.
	* **Raise alarm** - To raise an alarm when the register is not zero in the device measurement. In this case, you can specify the type of the alarm raised, its text and its severity. Note, that there can only be one alarm active of a particular type for a particular device.
	* **Send event** - To send an event each time the value of the register changes. If selected, you may specify the type of event and the text in the event.
6. Click **Save** to save the register.

![Add register](/images/device-protocols/cloud-fieldbus/fieldbus-deviceprotocols-newregister.png)

In the **Options** section, select the checkbox **Use server time** to create the time stamps for data on the server instead of on the terminal. If you must support buffering of data on the terminal, leave this checkbox clear.

Finally, click **Save** to save the device protocol.

### Configuring CAN bus device protocols {#configuring-can-bus-device-protocols}

CAN bus device protocols can be configured in a very similar way as Modbus device protocols. For more information, see [Configuring Modbus device protocols](#configuring-modbus-device-protocols) above. The differences are:

* Holding registers are used to describe the different pieces of data inside CAN messages.
* Enter the CAN message ID of the specific message the data should be extracted from. Use a hexadecimal number for the message ID.
* Conversion of values is extended by an offset parameter (for example, any positive or negative number). This is added or subtracted from the register value, depending on its sign. The offset calculation is done after applying multiplier and divisor, and before performing decimal shifting.

### Configuring Profibus device protocols {#configuring-profibus-device-protocols}

Profibus device protocols can be configured in the following way:

1. In the **Registers** section, click **Add register** to add one or more register definitions as described exemplarily for Modbus devices in [To add a register definition](#to-add-a-register-definition) above.
1. In the **Options** section, select the checkbox **Use server time** to create the time stamps for data on the server instead of on the terminal. If you must support buffering of data on the terminal, leave this checkbox clear.
1. Finally, click **Save** to save your settings.


### Configuring CANopen device protocols {#configuring-canopen-device-protocols}

CANopen device protocols can be configured in the following way:

In the **CANopen device type** field, specify the device type as a hex number.

In the **Variables** section, you determine the CANopen variables. Variables inside the "Object Dictionary"(OD) of the CANopen device can later be accessed by adding the variables to the device type definition.

Click **Add variable** to configure a new variable.

![New variable](/images/device-protocols/cloud-fieldbus/fieldbus-new-variable.png)

#### To configure a variable {#to-configure-a-variable}

1. In the **General** section, specify a name for the variable and a display category. Display categories are used to group variables into sections in the visualization.
2. In the **Value selection** section, specify from where the value should be extracted:
	* **Index** - Index of the variable in the OD of the device.
	* **Sub-index** - Sub-index of the variable in the OD of the device.
	* **Data type** - Type of the variable (for example Boolean, unsigned).
	* **Access type** - Access type, for example, read-only, write-only.
3. Depending on the selected access type, the following functionalities may be specified:
	* **Show status** - To enable to show the current value in the UI, for example, in the "Fieldbus device" widget.
	* **Update status** - To enable to update the current value from the UI, for example, in the "Fieldbus device" widget. If selected, two additional fields **Minimum** and **Maximum** are displayed. Using these fields, you can constrain numerical values entered in the widget.
	* **Send measurement** - To create a measurement whenever the value is changed. If selected, you may specify a **Measurement type** and **Measurement series**.
	* **Raise alarm** - To raise an alarm if a given mask matches with the value of the variable ((value & mask) == mask). Additionally, you may specify the type of the alarm raised, its text and its severity.
	* **Send event** - To send an event each time the value of the register changes. If selected, you may specify the type of event and the text in the event.
4. In the **Normalization** section, specify a unit to define how the raw value should be transformed before storing it in the platform.
5. Click **Save** to save the variable.

The variable will be listed in the **Variables** section of the device protocol. All variables are grouped by the given display category, that means, variables with the same category are grouped together.

![category view](/images/device-protocols/cloud-fieldbus/fieldbus-category.png)

After completing your configuration, click **Save** to save the device protocol configuration.

#### Importing a CANopen device protocol {#importing-a-canopen-device-protocol}

See [Exporting and importing device protocols](#exporting-importing-protocols) for general information on how to import a device protocol.

After importing the EDS file, all variables defined in the file are listed in the **Variables** section of the CANopen device protocol.

The user can then enrich the imported variable configurations manually, for example by adding the missing display category.

#### Configuring CANopen device data {#configuring-canopen-device-data}

To configure CANopen device data navigate to the desired device and switch to the **CANopen** tab.

In the **CANopen communication** section, the following parameters can be configured:

- **Baud rate:** This field must match with the used baud rate in the CANopen network.
- **Polling rate:** The rate at which the agent sends requests to the CANopen devices.
- **Transmit rate:** The transfer rate, that is, the rate at which the terminal sends regular measurements to {{< product-c8y-iot >}}.

In the **CANopen** section, up to 127 CANopen devices can be added to the gateway as child devices by providing the following parameters:

- **Name:** The name of the device shown in the UI.
- **Device type:** The device type of the CANopen device. The user can select from a list of all CANopen device types which are stored in the device database.
- **Node ID:** The CANopen node ID of the device. It is used for addressing the device inside the CANopen network.

{{< c8y-admon-info >}}
The device type and node ID must match with the real CANopen device, otherwise setting up the communication is not possible or wrong values will be transmitted.
{{< /c8y-admon-info >}}
