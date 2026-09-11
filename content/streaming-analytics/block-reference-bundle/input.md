---
weight: 24
title: Input
layout: redirect
---

This category contains the following blocks:

<table>
<colgroup>
<col style="width: 30%; text-align: start;">
<col style="width: 70%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Block Name</th>
<th scope="col">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#alarm-input">Alarm Input</a></td>
<td><span>Receives <tt>Alarm</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#event-input">Event Input</a></td>
<td><span>Receives <tt>Event</tt> objects from a device, asset, or devices in a group and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#managed-object-input">Managed Object Input</a></td>
<td><span>Receives <tt>ManagedObject</tt> objects from a device, asset, devices in a group, or all input sources.</span>
</td>
</tr>
<tr>
<td><a href="#measurement-input">Measurement Input</a></td>
<td><span>Receives <tt>Measurement</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#operation-input">Operation Input</a></td>
<td><span>Receives <tt>Operation</tt> objects from a device, asset, devices in a group, or all input sources.</span>
</td>
</tr>
<tr>
<td><a href="#position-input">Position Input</a></td>
<td><span>Receives <tt>Event</tt> objects from a device, asset, devices in a group, or all input sources and extracts the <tt>c8y_Position</tt> fragment into a <tt>Value</tt> object.</span>
</td>
</tr>
</tbody>
</table>

### Alarm Input

`apama.analyticskit.blocks.cumulocity.AlarmInput`

<p>Receives <tt>Alarm</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</p>
<p>If the Alarm Status parameter is Active, then the alarms are reordered based on the timestamp (and dropped if they are too old), unless the Ignore Timestamp parameter is set. Otherwise, data is processed as it is received.
<p></p>
The parameters that define the input stream of the block are "Input Source" and "Alarm Type". If this block is configured with the same "Input Source" and "Alarm Type" parameters as an Alarm Output block in another model, then a connection between the models is formed, as each block refers to the same stream of <tt>Alarm</tt> objects.
<p></p>
Note: When running in simulation mode, because only the creation time of the alarm is stored, the alarm status must be Active.</p>


#### Parameters {#alarm-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the alarm has been received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Alarm Type</th>
<td><span>The alarm type the block is listening for.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Severity</th>
<td><span>The severity of the alarm. If not specified, the block listens for all alarm severities.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Critical</li>
<li>Major</li>
<li>Minor</li>
<li>Warning</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Alarm Status</th>
<td><span>The status of the alarm. If not specified, the block listens for alarms with any status.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Active</li>
<li>Acknowledged</li>
<li>Cleared</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Notification Mode</th>
<td><span>Filters <tt>Alarm</tt> events such that only new alarms, updated alarms, or all alarms are processed. The default is that all alarms are processed.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>All</li>
<li>Updates only</li>
<li>New alarms only</li></ul>
</span>
</td>
<td><span>Default: All</span></td>
</tr>
<tr>
<th scope="row">Ignore Timestamp</th>
<td><span>If selected, the timestamp of the incoming alarm is ignored. Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property, for example <tt>"Speed is #{Speed.value} #{Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders not starting with "source." are considered and any placeholders starting with "source." are ignored.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input alarm has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#alarm-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Alarms</th>
<td><span>Generates a pulse output for each <tt>Alarm</tt> object received, with extra properties.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Event Input

`apama.analyticskit.blocks.cumulocity.DeviceEventInput`

<p>Receives <tt>Event</tt> objects from a device, asset, or devices in a group and reorders them based on the timestamp.</p>
<p>If the Ignore Timestamp parameter is set, the block ignores the timestamp of the event and processes the events as they are received. Otherwise, it drops old events.
<p></p>
The parameters that define the input stream of the block are "Input Source" and "Event Type". If this block is configured with the same "Input Source" and "Event Type" parameters as an Event Output block in another model, then a connection between the models is formed, as each block refers to the same stream of <tt>Event</tt> objects.
<p></p>
Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.
<p></p>
Note: A history of changes is not maintained for <tt>Event</tt> objects, and it is thus not possible to retrieve the original objects from the inventory. For this reason, a model which contains this input block type may behave differently in simulation mode than it would in production mode.</p>


#### Parameters {#event-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the event has been received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Event Type</th>
<td><span>The event type the block is listening for.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Notification Mode</th>
<td><span>Filters <tt>Event</tt> events such that only new events, updated events, or all events are processed. The default is that all events are processed.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>All</li>
<li>Updates only</li>
<li>New events only</li></ul>
</span>
</td>
<td><span>Default: All</span></td>
</tr>
<tr>
<th scope="row">Ignore Timestamp</th>
<td><span>If selected, the timestamp of the incoming event is ignored. Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property, for example <tt>"Speed is #{Speed.value} #{Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders not starting with "source." are considered and any placeholders starting with "source." are ignored.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input event has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#event-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Events</th>
<td><span>Generates a pulse output for each <tt>Event</tt> object received, with extra properties.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Managed Object Input

`apama.analyticskit.blocks.cumulocity.ManagedObjectInput`

<p>Receives <tt>ManagedObject</tt> objects from a device, asset, devices in a group, or all input sources.</p>
<p>The block does not reorder the received <tt>ManagedObject</tt> objects and processes them as they are received. If the Property Name parameter is supplied, then the block does not produce new output if the value of the specified property has not changed since the last output, even if other properties on the same <tt>ManagedObject</tt> object have changed.
<p></p>
The Value output from the block contains all properties on the <tt>ManagedObject</tt> object, including the property specified by the Property Name parameter. Property values can be accessed using the Extract Property block.
<p></p>
Properties with values of type <tt>string</tt>, <tt>boolean</tt> or <tt>float</tt> can be accessed by specifying the name of the property in the Extract Property block. For example, if the name of the property is <tt>ap_State</tt>, then specify <tt>ap_State</tt> as the value for the Property Path parameter of the Extract Property block.
<p></p>
If a property value is of type JSON object or sequence, then nested values can be accessed by specifying the full path to the nested values as the name of the property.
<p></p>
For example, if the name of the property is <tt>c8y_SpeedMeasurement</tt> and the value is <tt>{ "Speed": { "value": 1234, "unit": "km/h" } }</tt> (in JSON form), then specify <tt>c8y_SpeedMeasurement.Speed.unit</tt> as the value for the Property Path parameter of the Extract Property block to extract the value of the unit.
<p></p>
Any position data associated with the <tt>ManagedObject</tt> object is available as a <tt>c8y_Position</tt> property and can be extracted using the Extract Property block.
<p></p>
If the value of the property specified by the Property Name parameter of this block is of type <tt>string</tt>, <tt>boolean</tt> or <tt>float</tt>, then the value is also directly available in the Value output port and can be directly consumed by blocks consuming values of that type without using the Extract Property block, for example, the Expression or Difference blocks.
<p></p>
The parameters that define the input stream of the block are "Input Source" and "Property Name".</p>


#### Parameters {#managed-object-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the managed object has been received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Property Name</th>
<td><span>The name of the property for which to listen.</span>
<p>The <tt>ManagedObject</tt> object must have a property of this name. Otherwise, it is ignored. If not set, the objects are not filtered. Every update generates a pulse output with all of the properties from the <tt>ManagedObject</tt>. This property is always included in the output.</p>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Capture Start Value</th>
<td><span>Outputs the initial value when the model is activated. This parameter must not be selected if the Input Source parameter is set to "All Inputs".</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property on the source object, for example <tt>"Speed is #{source.Speed.value} #{source.Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders starting with "source." are considered and any placeholders not starting with "source." are ignored. The name of the property is derived from the placeholder by removing the "source." prefix. For example, if the placeholder is <tt>#{source.Speed}</tt>, then the property name will be <tt>Speed</tt>.
<p></p>
The properties specified here are in addition to the property specified by the Property Name parameter, which is always included in the output if the parameter is specified.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input managed object has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#managed-object-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Value</th>
<td><span>Generates an output for each <tt>ManagedObject</tt> object received.</span>
<p>All properties of the managed object are available as extra properties. You can use the Extract Property block to access their values.</p>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### Measurement Input

`apama.analyticskit.blocks.cumulocity.DeviceMeasurementInput`

<p>Receives <tt>Measurement</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</p>
<p>If the Ignore Timestamp parameter is set, the block ignores the timestamp of the measurement and processes the measurements as they are received. Otherwise, it drops old measurements.
<p></p>
If using a group for input, select a device within the group to select the fragment and series, and then change to the desired group.
<p></p>
The parameters that define the output stream of the block are "Input Source" and "Fragment and Series". If this block is configured with the same "Input Source" and "Fragment and Series" parameters as a Measurement Output block in another model, then a connection between the models is formed, as each block refers to the same stream of <tt>Measurement</tt> objects.
<p></p>
Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.</p>


#### Parameters {#measurement-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the measurement has been received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Fragment and Series</th>
<td><span>The fragment the block is listening for.</span>
<p>This only shows fragments and series for measurements associated with the object (device or group) selected. Any measurements on a device within a group are only shown when a device is selected (unless there are measurements with the group as the source). For example, if a temperature measurement is sent in Celsius, the fragment is <tt>T</tt> and the series is <tt>C(Celsius)</tt>. This means, that this parameter can be set as <tt>T.C</tt> or <tt>T=>C</tt>.</p>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Ignore Timestamp</th>
<td><span>If selected, the timestamp of the incoming measurement is ignored. Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property, for example <tt>"Speed is #{Speed.value} #{Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders not starting with "source." are considered and any placeholders starting with "source." are ignored.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input measurement has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#measurement-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Value</th>
<td><span>The numeric value from the measurement object.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Operation Input

`apama.analyticskit.blocks.cumulocity.OperationInput`

<p>Receives <tt>Operation</tt> objects from a device, asset, devices in a group, or all input sources.</p>
<p>The block does not reorder the received <tt>Operation</tt> objects and processes the operations as they are received. The block can be optionally configured to only process operations having a specified status or property.
<p></p>
The output from the block contains all properties on the <tt>Operation</tt> object. Property values can be accessed using the Extract Property block.
<p></p>
Properties with values of type <tt>string</tt>, <tt>boolean</tt> or <tt>float</tt> can be accessed by specifying the name of the property in the Extract Property block. For example, if the name of the property is <tt>ap_State</tt>, then specify <tt>ap_State</tt> as the value for the Property Path parameter of the Extract Property block.
<p></p>
If a property value is of type JSON object or sequence, then nested values can be accessed by specifying the full path to the nested values as the name of the property.
<p></p>
For example, if the name of the property is <tt>c8y_SpeedMeasurement</tt> and the value is <tt>{ "Speed": { "value": 1234, "unit": "km/h" } }</tt> (in JSON form), then specify <tt>c8y_SpeedMeasurement.Speed.unit</tt> as the value for the Property Path parameter of the Extract Property block to extract the value of the unit.
<p></p>
The parameter that defines the input stream of the block is Input Source.
<p></p>
Note: A history of changes is not maintained for <tt>Operation</tt> objects, and it is thus not possible to retrieve the original objects from the inventory. For this reason, a model which contains this input block type may behave differently in simulation mode than it would in production mode.</p>


#### Parameters {#operation-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the operation has been received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Operation Name</th>
<td><span>The name of the operation the block is listening for.</span>
<p>If specified, the <tt>Operation</tt> object must have a property of this name. Otherwise, it is ignored.</p>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Operation Status</th>
<td><span>The status for which to listen.</span>
<p>If not specified, the block listens for operations with any status.</p>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>SUCCESSFUL</li>
<li>FAILED</li>
<li>EXECUTING</li>
<li>PENDING</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Notification Mode</th>
<td><span>Filters <tt>Operation</tt> events such that only new operations, updated operations, or all operations are processed. The default is that all operations are processed.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>All</li>
<li>Updates only</li>
<li>New operations only</li></ul>
</span>
</td>
<td><span>Default: All</span></td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property, for example <tt>"Speed is #{Speed.value} #{Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders not starting with "source." are considered and any placeholders starting with "source." are ignored.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input operation has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#operation-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Operations</th>
<td><span>Generates a pulse output for each <tt>Operation</tt> object received.</span>
<p>All properties of the <tt>Operation</tt> object are available as extra properties. You can use the Extract Property block to access their values.</p>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Position Input

`apama.analyticsbuilder.blocks.PositionInput`

<p>Receives <tt>Event</tt> objects from a device, asset, devices in a group, or all input sources and extracts the <tt>c8y_Position</tt> fragment into a <tt>Value</tt> object.</p>
<p>If no <tt>c8y_Position</tt> fragment is present, the event is ignored. If the fragment does not contain at least a valid latitude and valid longitude, the event is ignored. If the Primary Value parameter is set to Altitude and the fragment does not contain an altitude, the event is ignored. Latitudes must be between -90 and 90 degrees inclusive. Longitudes must be between -180 and 180 degrees inclusive.
<p></p>
The primary value of the output <tt>Value</tt> object can be set to be the latitude, longitude or altitude. All members of the <tt>c8y_Position</tt> fragment are added to the properties dictionary of the <tt>Value</tt> object.
<p></p>
If the Ignore Timestamp parameter is set, the block ignores the timestamp of the event and processes the measurements as they are received. Otherwise, it reorders the events and drops old measurements.
<p></p>
The parameter that defines the input stream of the block is Input Source, and Event Type if set.
<p></p>
Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.
<p></p>
Note: A history of changes is not maintained for <tt>Event</tt> objects, and it is thus not possible to retrieve the original objects from the inventory. For this reason, a model which contains this input block type may behave differently in simulation mode than it would in production mode.</p>


#### Parameters {#position-input-parameters}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 50%; text-align: start;">
<col style="width: 25%; text-align: start;">
<col style="width: 10%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Input Source</th>
<td><span>Defines the source from which the position is received.</span>
<p>This can be a single device, an asset, an object that references or contains a group of devices, or all input sources.</p>
</td>
<td><span>any</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Event Type</th>
<td><span>The event type for which the block listens. If left unset, then there is no filtering by type.</span>
<p>To consume events from another model, this property must be set.</p>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Notification Mode</th>
<td><span>Filters <tt>Event</tt> events such that only new events, updated events, or all events are processed.</span>
<p>The default is that all events are processed.</p>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>All</li>
<li>Updates only</li>
<li>New events only</li></ul>
</span>
</td>
<td><span>Default: New events only</span></td>
</tr>
<tr>
<th scope="row">Ignore Timestamp</th>
<td><span>If selected, the timestamp of the incoming measurement is ignored. Note: When running in simulation mode, because historical input data is used, timestamps are not ignored.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Primary Value</th>
<td><span>The primary value to be output by the block: latitude, longitude or altitude, or empty if not set.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Latitude</li>
<li>Longitude</li>
<li>Altitude</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Properties to Output</th>
<td><span>When specified, only the properties mentioned in this parameter are included in the output. If empty, all properties are included in the output.</span>
<p>Each property could be either: <ul> <li>Name of a property, for example <tt>MyCounter</tt></li> <li>Path to a nested property, for example <tt>Speed.value</tt></li> <li>Text substitution string that refers to any property, for example <tt>"Speed is #{Speed.value} #{Speed.unit}"</tt></li> </ul>
<p></p>
When using text substitutions, only the placeholders not starting with "source." are considered and any placeholders starting with "source." are ignored.
<p></p>
Use this parameter to limit the output to only used properties to reduce the memory usage of the model. For example, if the input event has 10 properties but only 2 are used in the model, then specifying those 2 properties in this parameter can reduce the memory usage significantly. If no property is used in the model, then specify a single blank property to exclude all properties in the output except for mandatory position-related properties.</p>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Output Port Details {#position-input-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Position</th>
<td><span>An object containing at least latitude and longitude.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

