---
weight: 96
title: Utility
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
<td><a href="#constant-value">Constant Value</a></td>
<td><span>Outputs a value, either when the Trigger input port receives a signal or at startup.</span>
</td>
</tr>
<tr>
<td><a href="#cron-timer">Cron Timer</a></td>
<td><span>Sends a signal output based on cron-like periodic timer syntax.</span>
</td>
</tr>
<tr>
<td><a href="#duration">Duration</a></td>
<td><span>Measures the time elapsed from a set start time.</span>
</td>
</tr>
<tr>
<td><a href="#extract-property">Extract Property</a></td>
<td><span>Extracts the specified property from the input value and converts it to the specified type.</span>
</td>
</tr>
<tr>
<td><a href="#geofence">Geofence</a></td>
<td><span>Compares the input value against the defined geofence value to detect whether the device is within the geofence, and whether the device entered or exited the geofence.</span>
</td>
</tr>
<tr>
<td><a href="#missing-data">Missing Data</a></td>
<td><span>Generates an output if the input has not occurred for a set amount of time.</span>
</td>
</tr>
<tr>
<td><a href="#set-properties">Set Properties</a></td>
<td><span>Outputs a pulse with properties set from values on the input ports.</span>
</td>
</tr>
<tr>
<td><a href="#text-substitution">Text Substitution</a></td>
<td><span>Substitutes identifiers marked with a hash and braces (for example, <tt>#{name}</tt>) in the text template with corresponding entries from the input values.</span>
</td>
</tr>
<tr>
<td><a href="#toggle">Toggle</a></td>
<td><span>Converts two pulse inputs to a boolean output based on the set and reset signals, with optional delays.</span>
</td>
</tr>
</tbody>
</table>

### Constant Value

`apama.analyticsbuilder.blocks.ConstantValue`

<p>Outputs a value, either when the Trigger input port receives a signal or at startup.</p>
<p>The Trigger input port can be used to delay the output until a trigger input is received. If the Trigger input port is not connected, then the block outputs a value when the model is activated, which may trigger further processing.
<p></p>
The Value parameter can be treated as a string, boolean, float or JSON value. If treated as a JSON string, number or boolean, then the output is of this type. If treated as a JSON object, the output is a pulse with the properties from the object. JSON arrays are only permitted within an object.</p>


#### Parameters {#constant-value-parameters}

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
<th scope="row">Value</th>
<td><span>The value to output.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Type</th>
<td><span>How to interpret the Value parameter and set the output type. If JSON is selected as the type, the Value parameter must be a valid JSON value.</span>
<p>If the Type parameter remains unselected, the type of the output value is set based on the type of the input parameter value. If the value is either <tt>true</tt> or <tt>false</tt>, the output is a boolean value. If the value is a number, the output is a float value. If the value is a valid JSON, the output is a pulse with the properties from the object. In all other cases, the output is a string value.</p>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Float</li>
<li>Boolean</li>
<li>String</li>
<li>JSON</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#constant-value-inputs}

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
<th scope="row">Trigger</th>
<td><span>If connected, send output on this trigger.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#constant-value-outputs}

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
<th scope="row">Output</th>
<td><span>The output value from the Value parameter.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### Cron Timer

`apama.analyticskit.blocks.core.CronTimer`

<p>Sends a signal output based on cron-like periodic timer syntax.</p>
<p>The timer tick output is sent every time the time matches the pattern. The Time Zone parameter is a case-sensitive string that can be set to any supported time zone. The other parameters can be set to an asterisk (*) to match all times, a list of comma-separated numbers to fire at those specific times, or "* / number" to fire on every multiple of the number.
<p></p>
For example:
<p></p>
To send a signal every Wednesday at 20:30: <ul> <li>Day of Week: 4</li> <li>Hour: 20</li> <li>Minute: 30</li> </ul>
<p></p>
To send a signal every 5 seconds: <ul> <li>Seconds: * / 5</li> </ul>
<p></p>
To send a signal on Europe/Berlin time zone: <ul> <li>Time Zone: Europe/Berlin</li> </ul>
<p></p>
The Days of Month and Days of Week parameters operate together such that if both are specified, then any match in either parameter triggers an output. For example, if Days of Month is set to 15 and Days of Week is set to 1, then there is an output on every Monday of the month and the 15th regardless of which day that is.
<p></p>
This block is not supported in simulation mode.</p>


#### Parameters {#cron-timer-parameters}

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
<th scope="row">Seconds</th>
<td><span>The seconds at which to trigger the signal. <p>Range: 0 to 59.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: 0</span></td>
</tr>
<tr>
<th scope="row">Minutes</th>
<td><span>The minutes at which to trigger the signal. <p>Range: 0 to 59.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: *</span></td>
</tr>
<tr>
<th scope="row">Hours</th>
<td><span>The hours at which to trigger the signal. <p>Range: 0 to 23.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: *</span></td>
</tr>
<tr>
<th scope="row">Days of Month</th>
<td><span>The days of the month on which to trigger the signal. <p>Range: 1 to 31.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: *</span></td>
</tr>
<tr>
<th scope="row">Months</th>
<td><span>The months in which to trigger the signal. <p>Range: 1 to 12.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: *</span></td>
</tr>
<tr>
<th scope="row">Days of Week</th>
<td><span>The days of the week on which to trigger the signal. <p>Range: 0 (Sunday) to 6 (Saturday).</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: *</span></td>
</tr>
<tr>
<th scope="row">Time Zone</th>
<td><span>The time zone to be used. <p> Example: Europe/Berlin. For a full list, see the <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-DevApaAppInEpl_supported_time_zones.html%23">Supported time zones</a>.</p> <p> The default value is empty which means that the platform's time zone is used.</p></span>
</td>
<td><span>string</span>
</td>
<td><span>Default: </span></td>
</tr>
</tbody>
</table>

#### Output Port Details {#cron-timer-outputs}

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
<th scope="row">Timer Tick</th>
<td><span>Sent at each trigger time based on the cron parameters.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Duration

`apama.analyticskit.blocks.core.Duration`

<p>Measures the time elapsed from a set start time.</p>
<p>The start time is set by a start signal which activates the block. If the block is already active, then a start signal is ignored and the existing measurement remains unaffected. The block is deactivated with a reset signal which also disables any periodic outputs.
<p></p>
The block generates a float output of the time elapsed since the start signal, measured in seconds. If the block is inactive at the time it receives a measure signal, then 0.0 is generated as the output.
<p></p>
If multiple signals are received at the same time, they are processed in the order of measure, reset and start. Thus, for example, if measure and reset signals are received together, the block first generates an output with the current duration and then resets its state. Processing the inputs in this order allows the current state of the block to be output and the block to be restarted within a single unit of time, if desired.</p>


#### Parameters {#duration-parameters}

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
<th scope="row">Periodic Output (secs)</th>
<td><span>The amount of time (in seconds) between automatically generated outputs by an active block. If not set, then an output is only generated when a measure signal is received.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#duration-inputs}

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
<th scope="row">Measure</th>
<td><span>Triggers an output of the duration (in seconds) since the block was activated. If the block is inactive, then 0.0 is output.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Deactivates and resets the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Start</th>
<td><span>Activates the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#duration-outputs}

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
<th scope="row">Duration</th>
<td><span>The time in seconds since a start signal was received.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Extract Property

`apama.analyticskit.blocks.core.ExtractProperty`

<p>Extracts the specified property from the input value and converts it to the specified type.</p>
<p>The value in the Value input named by the Property Path parameter should be a string, number or boolean.
<p></p>
You can specify a period (.) as part of the Property Path parameter to extract nested values from a dictionary.
<p></p>
For example: If the input is <tt>{ "location" : { "city" : "Cambridge" } }</tt> (in JSON form), then you can extract that value by specifying <tt>location.city</tt> as the Property Path parameter.
<p></p>
You can also specify square brackets as part of the Property Path parameter to extract a specific element from a sequence.
<p></p>
If the value is an object, then the properties of that object are output as properties on the Extracted Value output port.
<p></p>
For example: If the input is <tt>{ "users" : [ { "age" : 40.375 } ] }</tt> (in JSON form), then you can extract that value by specifying <tt>users[0].age</tt> as the Property Path parameter.
<p></p>
The block does not support extracting entries from a dictionary whose key contains special characters like the period (.) or square brackets. Also it does not support extracting entries from a sequence without using square brackets, for example, <tt>users.0.id</tt> must be written as <tt>users[0].id</tt>.
<p></p>
In converting a string to a float, this block treats an empty string as a value of 0.0, rather than as not parseable.
<p></p>
Note: To extract a custom property from the Measurement Input block, you must add the prefix <tt>measurement_</tt> to the name of the property in the Property Path parameter of the Extract Property block. For example, if the name of the custom property you want to extract is <tt>city</tt>, you must specify <tt>measurement_city</tt> as the Property Path parameter.</p>


#### Parameters {#extract-property-parameters}

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
<th scope="row">Property Path</th>
<td><span>The name or path of the property that is to be extracted from the input value. If not set, all of the properties are output.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Property Type</th>
<td><span>The type to which the property value is to be converted. If set to Properties, a pulse is output with properties from the extracted value.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>String</li>
<li>Boolean</li>
<li>Float</li>
<li>Properties</li></ul>
</span>
</td>
<td><span>Default: String</span></td>
</tr>
<tr>
<th scope="row">Clear On Missing</th>
<td><span>If selected, the default value of the specified type is output if the Property Path parameter was not specified or if the value cannot be converted into the specified type.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#extract-property-inputs}

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
<td><span>The input value from which the property is to be extracted.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#extract-property-outputs}

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
<th scope="row">Extracted Value</th>
<td><span>The value that has been extracted from the input value.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### Geofence

`apama.analyticsbuilder.blocks.Geofence`

<p>Compares the input value against the defined geofence value to detect whether the device is within the geofence, and whether the device entered or exited the geofence.</p>
<p>The boundary line itself is considered to be outside of the geofence area.</p>


#### Parameters {#geofence-parameters}

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
<th scope="row">Geofence</th>
<td><span>A polygon describing an area on the Earth's surface.</span>
<p>Note that crossing the international date line, namely the longitude of +/- 180 degrees, is not supported.</p>
</td>
<td><span>sequence&lt;apama.analyticsbuilder.LngLat&gt;</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#geofence-inputs}

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
<td><span>The input value from which the properties for the longitude (lng) and latitude (lat) are to be extracted.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#geofence-outputs}

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
<th scope="row">Within Geofence</th>
<td><span>Is set to <tt>true</tt> when the device is within the defined geofence.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Entered Geofence</th>
<td><span>Sends a signal when the device enters the defined geofence.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Exited Geofence</th>
<td><span>Sends a signal when the device leaves the defined geofence.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Missing Data

`apama.analyticskit.blocks.core.MissingData`

<p>Generates an output if the input has not occurred for a set amount of time.</p>
<p>The block can optionally detect an absence of changes in value if repeated same-value inputs are not counted.</p>


#### Parameters {#missing-data-parameters}

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
<th scope="row">Ignore Repeated Inputs</th>
<td><span>If selected, same-value inputs are ignored.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Duration (secs)</th>
<td><span>The amount of time (in seconds) the block waits for an input.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#missing-data-inputs}

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
<td><span>The data whose presence or absence is being detected.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the state of the block - resets any timer and the previous value.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#missing-data-outputs}

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
<th scope="row">Missing Data</th>
<td><span>Absence of data, <tt>true</tt> if no input is received within the specified duration, else <tt>false</tt>.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>


### Set Properties

`apama.analyticsbuilder.blocks.SetProperties`

<p>Outputs a pulse with properties set from values on the input ports.</p>
<p>The property names are taken from the parameters and the values from the input ports. New properties are only output if they have been received. An output is sent as soon as at least one of the inputs is provided.
<p></p>
Properties are set on the output in the following order of precedence: <ol><li>Any properties which have been explicitly specified by the use of a parameter. If an input is a pulse, it is treated as an object using the properties of that input. If an input has a primary value (not a pulse), then the primary value is used. To use the properties instead, use the Extract Property block with the Property Path parameter not set and the Property Type parameter set to Properties which replaces the primary value with a pulse (which is ignored) and the properties are used.</li> <li>The properties of any <tt>Value</tt> object on an input port which does not have the corresponding parameter set. This is a straight merge of the <tt>properties</tt> dictionary. If two dictionaries have the same property key, then the input port with the lowest identifier has precedence. Thus any shared properties on Input 1 overwrite properties from Input 2 and down.</li> <li>Any  properties on a <tt>Value</tt> object provided to the  Merge input port are kept if they are not overwritten by either of the operations above. The optional Merge input port allows chaining or supplementing a set of properties from another block.</li></ol>
<p></p>
Thus, any properties set on an input are overwritten by those with the same name on a  higher precedence input, or when an input is configured for the specified property.</p>


#### Parameters {#set-properties-parameters}

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
<th scope="row">Property 1</th>
<td><span>A property to set in the output, using the value from input port 1.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Property 2</th>
<td><span>A property to set in the output, using the value from input port 2.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Property 3</th>
<td><span>A property to set in the output, using the value from input port 3.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Property 4</th>
<td><span>A property to set in the output, using the value from input port 4.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Property 5</th>
<td><span>A property to set in the output, using the value from input port 5.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#set-properties-inputs}

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
<th scope="row">Input 1</th>
<td><span>Value to be added using the property name in parameter Property 1.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Input 2</th>
<td><span>Value to be added using the property name in parameter Property 2.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Input 3</th>
<td><span>Value to be added using the property name in parameter Property 3.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Input 4</th>
<td><span>Value to be added using the property name in parameter Property 4.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Input 5</th>
<td><span>Value to be added using the property name in parameter Property 5.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Merge</th>
<td><span>Source to merge with the specified properties. Properties from here not replaced by an input value are passed through to the output.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#set-properties-outputs}

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
<th scope="row">Output</th>
<td><span>The output value with extra properties supplied.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Text Substitution

`apama.analyticsbuilder.blocks.TextSubstitution`

<p>Substitutes identifiers marked with a hash and braces (for example, <tt>#{name}</tt>) in the text template with corresponding entries from the input values.</p>
<p>At least one of the Object or Source input ports must be connected. Identifiers that cannot be resolved are not substituted.
<p></p>
The identifiers prefixed with <tt>source.</tt> (for example, <tt>#{source.name}</tt>) are searched for in the value received on the Source input port. For example, if the value received on the Source input port is <tt>{ "name": "sample_name" }</tt>, then the identifier <tt>#{source.name}</tt> is resolved to <tt>sample_name</tt>.
<p></p>
The identifiers not prefixed with <tt>source.</tt> are searched for in the value received on the Object input port.
<p></p>
Nested identifiers can be specified by separating them with a dot (.). For example, when the Object input port has received the value <tt>{ "address": { "street": { "name": "example_street" }}}</tt>, then the identifier <tt>#{address.street.name}</tt> is resolved to <tt>example_street</tt>.
<p></p>
Keys with a dot (.) in them are not supported, so if the Object input port value is of the form <tt>{ "address.street": { "name": "example_street" }}</tt>, then the <tt>example_street</tt> value cannot be resolved because the identifier <tt>#{address.street.name}</tt> expects <tt>street</tt> to be nested inside the <tt>address</tt> entry.
<p></p>
Primitive values such as <tt>integer</tt>, <tt>float</tt>, <tt>boolean</tt> and <tt>string</tt> are substituted directly, but complex values are converted to a JSON representation before substitution.
<p></p>
Any identifier with the text <tt>time</tt> (case-insensitive) in it and value type <tt>float</tt> is interpreted as a timestamp value and is converted into the format <tt>yyyy-MM-ddTHH:mm:ss.SSSZ</tt> before substitution. This can be modified with optional parameters using the following syntax: <tt>{time:param1="value1",param2="value2"}</tt>. Use the parameter <tt>TZ="time_zone"</tt> to specify a different time zone and/or use the parameter <tt>FORMAT="format_string"</tt> to specify a different format. For example, <tt>#{time:TZ="America/New_York",FORMAT="HH:mm:ssZ"}</tt> specifies the time zone for New York and the format to be <tt>HH:mm:ssZ</tt>. The model fails to activate if the time zone is not recognized or the format is invalid.
<p></p>
Note: The format string for the time must not contain quotes (") and braces ({ and }).
<p></p>
A hash (#) can be specified in the text template by escaping it as follows: <tt>#{#}</tt>.
<p></p>
For more information, see the <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-DevApaAppInEpl_supported_time_zones.html">list of time zones</a> and the <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}index.html#page/pam-webhelp%2Fco-DevApaAppInEpl_format_specification_for_the_time_format_plug_in_functions.html">list of valid time format strings</a>.</p>


#### Parameters {#text-substitution-parameters}

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
<th scope="row">Text Template</th>
<td><span>The text that is used to generate the output by substituting the identifiers in it, such as #{name}, with the values from the input ports.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#text-substitution-inputs}

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
<th scope="row">Object</th>
<td><span>Used to substitute identifiers that are not prefixed with <tt>source.</tt>. For example, <tt>#{name}</tt> or <tt>#{timestamp}</tt>.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Source</th>
<td><span>Used to substitute identifiers that are prefixed with <tt>source.</tt>. For example, <tt>#{source.name}</tt>.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#text-substitution-outputs}

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
<th scope="row">Output</th>
<td><span>String containing the substitutions from the text template.</span>
</td>
<td><span>string</span>
</td>
</tr>
</tbody>
</table>


### Toggle

`apama.analyticskit.blocks.core.Toggle`

<p>Converts two pulse inputs to a boolean output based on the set and reset signals, with optional delays.</p>
<p>Without delays, the output state is changed to <tt>true</tt> on a set signal, and changed to <tt>false</tt> on a reset signal. If both signals are received at the same time, the output state is toggled (to <tt>true</tt> if signals are received for the first time).
<p></p>
If delay times are specified, the output state is only changed to <tt>true</tt> or <tt>false</tt> after the delay has been applied.
<p></p>
The following exception applies if both signals are received at the same time: the output state is only toggled if both delay times are the same, or have not been specified at all.</p>


#### Parameters {#toggle-parameters}

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
<th scope="row">Set Delay (secs)</th>
<td><span>The amount of time (in seconds) after which the set signal is processed.</span>
<p>If the parameter is not specified, then the signal is immediately processed.
<p></p>
This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Reset Delay (secs)</th>
<td><span>The amount of time (in seconds) after which the reset signal is processed.</span>
<p>If the parameter is not specified, then the signal is immediately processed.
<p></p>
This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#toggle-inputs}

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
<th scope="row">Set</th>
<td><span>Sets the output to <tt>true</tt>. Any pending delayed set or reset signals are cancelled on the new input.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Sets the output to <tt>false</tt>. Any pending delayed set or reset signals are cancelled on the new input.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#toggle-outputs}

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
<td><span>The output value generated from the input signals.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

