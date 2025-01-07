---
weight: 84
title: Flow Manipulation
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
<td><a href="#combiner">Combiner</a></td>
<td><span>Calculates the output based on the selected mode and the connected inputs.</span>
</td>
</tr>
<tr>
<td><a href="#gate">Gate</a></td>
<td><span>Blocks the input from going to output unless the gate is open and enabled.</span>
</td>
</tr>
<tr>
<td><a href="#latch-values">Latch Values</a></td>
<td><span>Latches the latest input value received while the block is enabled.</span>
</td>
</tr>
<tr>
<td><a href="#pulse">Pulse</a></td>
<td><span>Converts a non-pulse input into a pulse output.</span>
</td>
</tr>
<tr>
<td><a href="#selector">Selector</a></td>
<td><span>Outputs a parameter value depending on which input port has a <tt>true</tt> value, lowest number taking precedence.</span>
</td>
</tr>
<tr>
<td><a href="#switch">Switch</a></td>
<td><span>Outputs the values from a given input, or acts as a circuit breaker.</span>
</td>
</tr>
<tr>
<td><a href="#time-delay">Time Delay</a></td>
<td><span>Delays the input by the specified amount of time.</span>
</td>
</tr>
</tbody>
</table>

### Combiner

`apama.analyticskit.blocks.core.Combiner`

<p>Calculates the output based on the selected mode and the connected inputs.</p>
<p>Available modes are: <ul> <li>Minimum: Outputs the minimum of the connected inputs which have received a value. All numeric literals are treated as <tt>float</tt> type.</li> <li>Maximum: Outputs the maximum of the connected inputs which have received a value. All numeric literals are treated as <tt>float</tt> type.</li> <li>Average (Mean): Outputs the average (mean) of the connected inputs for which a value has been received. All numeric literals are treated as <tt>float</tt> type.</li> <li>Latest Changed: Outputs the latest changed value. If multiple values change in a single activation, then the input port with the highest number is used. For example, if Value 1 and Value 2 get an updated value, Value 2 is selected for output. Inputs must be of the same type. When using the Latest Changed mode, a value is not considered changed if the actual value does not change. For example, when using the Latest Changed mode with temperature sensors, it outputs the sensor value whose temperature was most recently changed.</li> <li>Latest Input: Outputs the latest input value even if the actual value is unchanged. If multiple values update in a single activation, then the input port with the highest number is used. For example, if you have a number of sensors that measure the temperature periodically at different intervals and you want to get the latest temperature received by the block by all of those sensors, you can use the Combiner block with the Latest Input mode. This provides the latest published temperature, even if a sensor measures and publishes the same temperature.</li> </ul></p>


#### Parameters {#combiner-parameters}

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
<th scope="row">Mode</th>
<td><span>The mode to be selected.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Minimum</li>
<li>Maximum</li>
<li>Average (Mean)</li>
<li>Latest Changed</li>
<li>Latest Input</li></ul>
</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#combiner-inputs}

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
<th scope="row">Value 1</th>
<td><span>First input value to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Value 2</th>
<td><span>Second input value to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Value 3</th>
<td><span>Third input value to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Value 4</th>
<td><span>Fourth input value to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Value 5</th>
<td><span>Fifth input value to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#combiner-outputs}

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
<th scope="row">Combined Value</th>
<td><span>The calculated combined value.</span>
</td>
<td><span>sameAsAll(value1, value2, value3, value4, value5)</span>
</td>
</tr>
</tbody>
</table>


### Gate

`apama.analyticskit.blocks.core.Gate`

<p>Blocks the input from going to output unless the gate is open and enabled.</p>
<p>The block starts disabled if the Enable input is connected. Otherwise, the block is always enabled. The block starts closed if the Open input is connected. Otherwise, the block starts open.</p>


#### Parameters {#gate-parameters}

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
<th scope="row">Null Value</th>
<td><span>The value to use as output value when the gate is either disabled or closed.</span>
<p>The exact type of the value depends on the Null Value Type parameter. If the Null Value Type parameter is specified then the string value is parsed as the specified type. If the Null Value Type parameter is not specified, and the value is parsable into a float or a boolean value then it is parsed into the corresponding value type, otherwise it is used as a string value.</p>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Null Value Type</th>
<td><span>The type of the value specified by the Null Value parameter. If specified, the null value is parsed into the specified type.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Float</li>
<li>Boolean</li>
<li>String</li></ul>
</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Close Duration (secs)</th>
<td><span>The amount of time (in seconds) the gate should be closed when a close signal is received.</span>
<p>If the parameter is not specified, then after a close signal is received, the gate remains closed until an open signal is received. If the parameter is specified, then the gate automatically opens after the specified number of seconds, unless another open or close signal is received before the time has elapsed. On opening, if the gate is also enabled, then the latest input value is sent out as output.
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

#### Input Port Details {#gate-inputs}

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
<td><span>The value to pass to output.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Enable</th>
<td><span>Enables the gate. If the gate is always to be enabled, then leave this port unconnected.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Open</th>
<td><span>Opens the gate. If the gate is to be open at the start, then leave this port unconnected.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Close</th>
<td><span>Closes the gate. If the Close Duration parameter is specified, then the gate is closed only for the specified number of seconds.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#gate-outputs}

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
<th scope="row">Gated Value</th>
<td><span>Same as the input value when the gate is open and enabled. Otherwise the value specified by the Null Value parameter.</span>
</td>
<td><span>input(value)</span>
</td>
</tr>
<tr>
<th scope="row">Activated</th>
<td><span>Output pulse. Generated when the gate becomes active. The gate is active when it is both open and enabled.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Deactivated</th>
<td><span>Output pulse. Generated when the gate becomes inactive. The gate is inactive when it is either closed or disabled.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Latch Values

`apama.analyticskit.blocks.core.Latch`

<p>Latches the latest input value received while the block is enabled.</p>
<p>Only generates an output if the input value changes and the block is enabled. The block starts disabled if the Enable input is connected. Otherwise, the block is always enabled.</p>


#### Input Port Details {#latch-values-inputs}

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
<td><span>The input value to be monitored.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Enable</th>
<td><span>Enables the block. If the block is always to be enabled, then leave this unconnected.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#latch-values-outputs}

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
<th scope="row">Latched Value</th>
<td><span>Same as the input value. Generated only if the input has changed while the block was enabled.</span>
</td>
<td><span>input(value)</span>
</td>
</tr>
<tr>
<th scope="row">Changed</th>
<td><span>Output pulse. Generated only if the input has changed while the block was enabled.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Enabled</th>
<td><span>Output pulse. Generated when the block is enabled but was previously disabled.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Disabled</th>
<td><span>Output pulse. Generated when the block is disabled but was previously enabled.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Pulse

`apama.analyticskit.blocks.core.Pulse`

<p>Converts a non-pulse input into a pulse output.</p>
<p>The block can be configured to send a pulse when the value changes which is also the default conversion behavior, on every input, or on every non-zero value.
<p></p>
The default conversion behavior sends a pulse if the input is a string or float and the value changes, or if the input is a boolean and the value changes to <tt>true</tt>.
<p></p>
This is useful with blocks which consume both pulse and non-pulse values, and where the input value is treated as non-pulse without the explicit conversion.
<p></p>
For example, a numeric value passed to the OR block is treated as <tt>true</tt> if non-zero (as described in the "Type conversions" topic of the Analytics Builder documentation). However, when passing a numeric value to the Pulse block and then connecting the output of the Pulse block to the OR block, the numeric value is converted to a pulse so the OR block sends a pulse.</p>


#### Parameters {#pulse-parameters}

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
<th scope="row">Mode</th>
<td><span>Controls when the block sends a pulse.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>On value change (excluding to false)</li>
<li>On every input</li>
<li>On non-zero values</li></ul>
</span>
</td>
<td><span>Default: On value change (excluding to false)</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#pulse-inputs}

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
<td><span>The input to treat as pulse.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#pulse-outputs}

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
<th scope="row">Pulse</th>
<td><span>The output pulse value converted from the input value.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Selector

`apama.analyticsbuilder.blocks.Selector`

<p>Outputs a parameter value depending on which input port has a <tt>true</tt> value, lowest number taking precedence.</p>
<p>You specify the output value that is to be sent using the parameters of this block. Only one of the parameter values is sent in the output. It is sent when the corresponding input port receives a <tt>true</tt> value. If more than one input port receives a <tt>true</tt> value, then the input port is used which has the lowest number in its name. For example, Input 1 has a higher priority than Input 2.
<p></p>
If all input values are <tt>false</tt>, then the value specified with the No Input parameter is sent.
<p></p>
Example: Input 1 has "high", Input 2 has "medium", Input 3 has "low", and the No Input parameter has the value "off". If none of the input ports receives a <tt>true</tt> value, then "off" is sent as the output value. If both the Input 2 and Input 3 ports receive a <tt>true</tt> value and Input 1 receives a <tt>false</tt> value, then "medium" is sent as the output value. This is because Input 2 has a higher priority than Input 3.</p>


#### Parameters {#selector-parameters}

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
<th scope="row">Input 1</th>
<td><span>The output to be sent when the Input 1 port receives a <tt>true</tt> value.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Input 2</th>
<td><span>The output to be sent when the Input 2 port receives a <tt>true</tt> value, but only if this is the port with the lowest number in its name.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Input 3</th>
<td><span>The output to be sent when the Input 3 port receives a <tt>true</tt> value, but only if this is the port with the lowest number in its name.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Input 4</th>
<td><span>The output to be sent when the Input 4 port receives a <tt>true</tt> value, but only if this is the port with the lowest number in its name.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Input 5</th>
<td><span>The output to be sent when the Input 5 port receives a <tt>true</tt> value, but only if this is the port with the lowest number in its name.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">No Input</th>
<td><span>The output to be sent when there is no input which has a <tt>true</tt> value.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Type</th>
<td><span>How to interpret the parameter values and set the output type.</span>
<p>If JSON is selected as the type, all input parameter values must be valid JSON values of the same type. This allows the Selector block to output properties which can be used, for example, with the Set Properties block to generate different sets of properties for the output blocks, depending on which input port of the Selector block is enabled.
<p></p>
If the Type parameter remains unselected, the type of the output value is set based on the types of all input parameter values. If all values are either <tt>true</tt> or <tt>false</tt>, the output is a boolean value. If all values are numbers, the output is a float value. In all other cases, the output is a string value.</p>
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

#### Input Port Details {#selector-inputs}

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
<td><span>Causes the Input 1 parameter value to be sent if <tt>true</tt>.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Input 2</th>
<td><span>Causes the Input 2 parameter value to be sent if <tt>true</tt> (and no lower numbered input is <tt>true</tt>).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Input 3</th>
<td><span>Causes the Input 3 parameter value to be sent if <tt>true</tt> (and no lower numbered input is <tt>true</tt>).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Input 4</th>
<td><span>Causes the Input 4 parameter value to be sent if <tt>true</tt> (and no lower numbered input is <tt>true</tt>).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Input 5</th>
<td><span>Causes the Input 5 parameter value to be sent if <tt>true</tt> (and no lower numbered input is <tt>true</tt>).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#selector-outputs}

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
<td><span>The output value from one of the parameters.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### Switch

`apama.analyticsbuilder.blocks.Switch`

<p>Outputs the values from a given input, or acts as a circuit breaker.</p>
<p>If the Selected Input parameter is specified, then the given input must exist and the corresponding input port must be connected.
<p></p>
If the Selected Input parameter is not specified, then the block acts as a circuit breaker.
<p></p>
You can use the initial default names for the inputs. However, you can also rename them to be more descriptive. The input names must be unique, so two inputs cannot share the same name. Connected inputs must all be of the same type.
<p></p>
The expected use case is that the Selected Input parameter is set to a template parameter which can then be set individually for each model instance to decide which input is used.</p>


#### Parameters {#switch-parameters}

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
<th scope="row">Selected Input</th>
<td><span>To specify an output, specify one of the five input names. To act as a circuit breaker, leave this parameter empty.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Name for input1</th>
<td><span>The name of the first input to the block.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: input1</span></td>
</tr>
<tr>
<th scope="row">Name for input2</th>
<td><span>The name of the second input to the block.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: input2</span></td>
</tr>
<tr>
<th scope="row">Name for input3</th>
<td><span>The name of the third input to the block.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: input3</span></td>
</tr>
<tr>
<th scope="row">Name for input4</th>
<td><span>The name of the fourth input to the block.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: input4</span></td>
</tr>
<tr>
<th scope="row">Name for input5</th>
<td><span>The name of the fifth input to the block.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: input5</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#switch-inputs}

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
<th scope="row">input1</th>
<td><span>The first input.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input2</th>
<td><span>The second input.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input3</th>
<td><span>The third input.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input4</th>
<td><span>The fourth input.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input5</th>
<td><span>The fifth input.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#switch-outputs}

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
<th scope="row">Switch</th>
<td><span>The value from the specified input, or no value (circuit breaker) if the Selected Input parameter is empty.</span>
</td>
<td><span>sameAsAll(input1, input2, input3, input4, input5)</span>
</td>
</tr>
</tbody>
</table>


### Time Delay

`apama.analyticskit.blocks.core.TimeDelay`

<p>Delays the input by the specified amount of time.</p>

#### Parameters {#time-delay-parameters}

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
<th scope="row">Delay (secs)</th>
<td><span>The amount of time (in seconds) by which the input is delayed.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#time-delay-inputs}

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
<td><span>The input value to be delayed.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#time-delay-outputs}

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
<th scope="row">Delayed Value</th>
<td><span>The delayed output value.</span>
</td>
<td><span>input(value)</span>
</td>
</tr>
</tbody>
</table>

