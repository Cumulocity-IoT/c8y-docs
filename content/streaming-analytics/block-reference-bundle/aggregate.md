---
weight: 72
title: Aggregate
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
<td><a href="#average-mean">Average (Mean)</a></td>
<td><span>Calculates the mean of the values over time.</span>
</td>
</tr>
<tr>
<td><a href="#counter">Counter</a></td>
<td><span>Gives a count of the total inputs and repeated inputs.</span>
</td>
</tr>
<tr>
<td><a href="#discrete-statistics">Discrete Statistics</a></td>
<td><span>Generates statistics of sum, count, average (mean), standard deviation, minimum and maximum for discrete input values.</span>
</td>
</tr>
<tr>
<td><a href="#gradient">Gradient</a></td>
<td><span>Calculates the weighted linear regression gradient for the values.</span>
</td>
</tr>
<tr>
<td><a href="#group-statistics">Group Statistics</a></td>
<td><span>Generates periodic aggregate values across all the devices in a group for which the block has received input values.</span>
</td>
</tr>
<tr>
<td><a href="#integral">Integral</a></td>
<td><span>Calculates the integral of the input value over time.</span>
</td>
</tr>
<tr>
<td><a href="#minimum--maximum">Minimum / Maximum</a></td>
<td><span>Calculates the minimum and maximum of a value over time.</span>
</td>
</tr>
<tr>
<td><a href="#quash-frequent-preview">Quash Frequent (Preview)</a></td>
<td><span>Suppresses all but the first message received per specified time period.</span>
</td>
</tr>
<tr>
<td><a href="#standard-deviation">Standard Deviation</a></td>
<td><span>Calculates the standard deviation and variance of the values over time.</span>
</td>
</tr>
</tbody>
</table>

### Average (Mean)

`apama.analyticskit.blocks.core.Mean`

<p>Calculates the mean of the values over time.</p>
<p>This block is suitable for continuous values, even if they are irregularly sampled. The time between inputs or samples is significant, while the number of samples is not. Use this block, for example, if the input is a physical property, such as temperature, that is sampled either regularly or irregularly (for example, only generating measurement values on a change in temperature).  Use the Discrete Statistics block instead of the Average (Mean) block for independent measurements, such as ticket sales, where the number of measurements is significant, but the time between measurements is not.
<p></p>
The mean is defined as the sum of the input's value multiplied by how long the input has stayed at that value, within an optional window, divided by the window duration or the time since the block was started or last reset, whichever is smallest.
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, the block uses an unbounded window. The Reset input port clears the window contents. Output is generated on any new input or, if the Output Threshold parameter is set, only when the output changes by more than the specified output threshold (which includes if no further input occurs, or the value only changes due to old entries expiring). The Sample input port can be used to force re-evaluation and generate the latest value.
<p></p>
See also the "Value types" topic in the Analytics Builder documentation for more details and an example of the frequency of output from this block and how values in windows behave.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the expired value is an approximation of the average value across a bucket.
<p></p>
Note: The Average (Mean) block generates the mean for an individual device. If the input comes from a range of devices, the mean is generated separately for each device in that group. To calculate and generate aggregate values for the group as a whole (not for individual devices), use the Group Statistics block.</p>


#### Parameters {#average-mean-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Output Threshold</th>
<td><span>If present, the output to be sent at the point when it changes by at least this value.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#average-mean-inputs}

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
<td><span>Input for which the mean is to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Clears the content of the window.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Forces re-evaluation of the current mean value and sends the output.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#average-mean-outputs}

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
<th scope="row">Average</th>
<td><span>The sum of the value multiplied by how long it stays at that value divided by the total time.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Counter

`apama.analyticskit.blocks.core.Counter`

<p>Gives a count of the total inputs and repeated inputs.</p>
<p>If two consecutive input values have different types, they are not evaluated as repeat values. For example, a float value of 1.0 will not evaluate as a repeat of an integer value of 1. All other evaluations for whether two values are equal follow the same rules as EPL. For more information, refer to <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}/epl-reference/types/">Types</a>.
<p></p>
You can specify a maximum value for each count independently. By default, each counter returns to one, counting the first input after the maximum has been reached. This is useful, for example, if you want to trigger an action on every n<sup>th</sup> input, or if the input has repeated more often than expected. You can also set each counter to stop once it reaches the maximum value. In this mode, a pulse on the Reset input port is required to reset the count, although this resets both counters at the same time. If this dual reset is an issue, you must use a separate Counter block to deal with each count independently.</p>


#### Parameters {#counter-parameters}

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
<th scope="row">Maximum Count</th>
<td><span>The maximum value the Count output port can take. A negative or zero value is interpreted as <tt>float.MAX (~2e308)</tt>. This only affects the Count output port. If the counter is looping, this can be useful for triggering an action on every n<sup>th</sup> input.</span>
</td>
<td><span>float</span>
</td>
<td><span>Default: 0.0</span></td>
</tr>
<tr>
<th scope="row">Loop Count</th>
<td><span>If selected, the Count output port resets to one when the maximum value is exceeded. If not selected, the counter stops counting when the maximum value is reached and must be reset manually. This only affects the Count output port.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: True</span></td>
</tr>
<tr>
<th scope="row">Maximum Number Same</th>
<td><span>The maximum value the Number Same output port can take. A negative or zero value is interpreted as <tt>float.MAX (~2e308)</tt>. This only affects the Number Same output port. This can be useful for assessing whether a value has remained static for an unexpectedly long time, such as positions within a GPS measurement.</span>
</td>
<td><span>float</span>
</td>
<td><span>Default: 0.0</span></td>
</tr>
<tr>
<th scope="row">Loop Number Same</th>
<td><span>If selected, the Number Same output port resets to one when the maximum value is exceeded. If not selected, the counter stops counting when the maximum value is reached and must be reset manually. This only affects the Number Same output port.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: True</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#counter-inputs}

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
<td><span>The input to be counted.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets both counters.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#counter-outputs}

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
<th scope="row">Count</th>
<td><span>The total count of all the inputs.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Number Same</th>
<td><span>The current count of repeated inputs with the same value.</span>
<p>On a change of value, this is reset to one.</p>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Discrete Statistics

`apama.analyticsbuilder.blocks.DiscreteStatistics`

<p>Generates statistics of sum, count, average (mean), standard deviation, minimum and maximum for discrete input values.</p>
<p>This block is suitable for discrete time inputs, where the number of samples (or inputs) is significant, while the time between them is not. The Average (Mean) and Standard Deviation blocks are more suitable for continuous values that may be irregularly sampled, such as temperature readings. Use this block, for example, if each sample represents a transaction such as a ticket being sold.
<p></p>
If the Sample input port is not connected, every value is sampled. If a new value is received during the same activation period as a reset, the value is sampled after the reset, otherwise it is ignored. As every value is used, the standard deviation uses the generic formula: <tt>σ² = ∑(x - µ)² / N</tt>.
<p></p>
If the Sample input port is connected, the block only samples the data when the Sample input port receives a signal. In this case, the sampling standard deviation uses the formula: <tt>σ² = ∑(x - µ)² / (N-1)</tt>.
<p></p>
If reset and sample signals are received together, the reset is processed first.</p>


#### Input Port Details {#discrete-statistics-inputs}

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
<td><span>The current value.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Use the current value in generating statistics. If left unconnected, all values are used.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Reset the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#discrete-statistics-outputs}

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
<th scope="row">Sum</th>
<td><span>Sum of the sampled input values, <tt>∑x</tt>.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Count</th>
<td><span>Count of the number of sampled input values, <tt>N</tt>.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Average</th>
<td><span>Average (mean) of the sampled input values, <tt>µ = ∑x / N</tt>.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Standard Deviation</th>
<td><span>Standard deviation of the sampled input values. If all values are being sampled, with the Sample input port disconnected, the generic standard deviation, <tt>σ² = ∑(x - µ)² / N</tt>, is used. Otherwise the sampling standard deviation, <tt>σ² = ∑(x - µ)² / (N-1)</tt>, is used.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Minimum</th>
<td><span>Minimum of the sampled input values.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Maximum</th>
<td><span>Maximum of the sampled input values.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Gradient

`apama.analyticskit.blocks.core.Gradient`

<p>Calculates the weighted linear regression gradient for the values.</p>
<p>A gradient measures the rate of change of a value over time. A positive gradient indicates an increase of the input values, and a negative gradient indicates a decrease of the input values. The magnitude of the gradient signifies the scale of change.
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, it uses an unbounded window and the block re-evaluates for every 1 second, and uses 1-second buckets. If a window is configured, the block uses a set of 20 buckets, so the time of expired values is an approximation to the nearest bucket interval. The first gradient output is generated only when a minimum of two buckets is available for computation.
<p></p>
The Reset input clears the content of the window. Sample input can be used to force re-evaluation and generate the latest value.</p>


#### Parameters {#gradient-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#gradient-inputs}

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
<td><span>The input value for which the gradient is to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Clears the content of the window.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Forces re-evaluation of the current value and sends the output.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#gradient-outputs}

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
<th scope="row">Gradient</th>
<td><span>The gradient of the input values.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Group Statistics

`apama.analyticskit.blocks.core.GroupStatistics`

<p>Generates periodic aggregate values across all the devices in a group for which the block has received input values.</p>
<p>This block generates the following aggregate values: <ul> <li>Minimum</li> <li>Maximum</li> <li>Device Count</li> <li>Average </li> <li>Standard Deviation</li> <li>Variance</li> </ul>
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, the block uses an unbounded window. Output is generated periodically as specified by the Output Period parameter.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the expired value is an approximation to the nearest bucket interval.
<p></p>
Note: The Group Statistics block calculates and generates aggregate values for the group as a whole (not for individual devices). To generate aggregates for an individual device in a group, use the Average (Mean), Standard Deviation, or Minimum/Maximum blocks. The Group Statistics block only considers devices from which it has received input values.</p>


#### Parameters {#group-statistics-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Output Period (secs)</th>
<td><span>The amount of time (in seconds) between each output.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Default: 5.0</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#group-statistics-inputs}

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
<td><span>Input value for which the aggregate values are to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#group-statistics-outputs}

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
<th scope="row">Minimum</th>
<td><span>The smallest input value (closest to negative infinity) across all the devices in a group.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Maximum</th>
<td><span>The largest input value (closest to positive infinity) across all the devices in a group.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Device Count</th>
<td><span>The number of devices in a group for which input values have been received so far.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Average</th>
<td><span>The sum of the value multiplied by how long it stays at that value divided by the total time and the device count.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Standard Deviation</th>
<td><span>The standard deviation of the input values across all the devices in a group.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Variance</th>
<td><span>The variance of the input values across all the devices in a group.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Integral

`apama.analyticskit.blocks.core.Integral`

<p>Calculates the integral of the input value over time.</p>
<p>Integral is defined as the sum of the input's value multiplied by how long the input has stayed at that value, within an optional window, since the block was started or last reset.
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, it uses an unbounded window. The Reset input clears the window contents. Output is generated on any new input or, if the Output Threshold parameter is set, only when the output changes by more than the specified output threshold (which includes if no further input occurs, or the value only changes due to old entries expiring). The Sample input can be used to force re-evaluation and generate the latest value.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the expired value is an approximation of the average value across a bucket.</p>


#### Parameters {#integral-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Output Threshold</th>
<td><span>If present, the output to be sent at the point when it changes by at least this value.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#integral-inputs}

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
<td><span>Input for which the integral is to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Clears the content of the window.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Forces re-evaluation of the current integral value and sends the output.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#integral-outputs}

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
<th scope="row">Integral Value</th>
<td><span>The sum of the value multiplied by how long it stays at that value.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Minimum / Maximum

`apama.analyticskit.blocks.core.MinMax`

<p>Calculates the minimum and maximum of a value over time.</p>
<p>The minimum is defined as the smallest value (closest to negative infinity) of  the input values in the window, and the maximum is defined as the largest value (closest to positive infinity) of the input values in the window.
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, the block uses an unbounded window. The Reset input clears the window contents. Output is generated on any new input that exceeds the current minimum or maximum, or, if the Window Duration parameter is set, when a previous minimum or maximum expires.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the time of expired values is an approximation to the nearest bucket interval.
<p></p>
Note: The Minimum/Maximum block generates the minimum and maximum for an individual device. If the input comes from a group of devices, these values are generated separately for each device in that group. To calculate and generate aggregate values for the group as a whole (not for individual devices), use the Group Statistics block.</p>


#### Parameters {#minimum--maximum-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#minimum--maximum-inputs}

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
<td><span>Input for which the minimum and maximum is to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Clears the content of the window.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#minimum--maximum-outputs}

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
<th scope="row">Minimum</th>
<td><span>The smallest value in the window (closest to negative infinity).</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Maximum</th>
<td><span>The largest value in the window (closest to positive infinity).</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Quash Frequent (Preview)

`apama.analyticsbuilder.blocks.QuashMessages`

<p>Suppresses all but the first message received per specified time period.</p>
<p><b>This block is currently in public preview and may be subject to change.</b></p>


#### Parameters {#quash-frequent-preview-parameters}

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
<th scope="row">Period</th>
<td><span>Time period in seconds.</span>
</td>
<td><span>float</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#quash-frequent-preview-inputs}

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
<th scope="row">Input</th>
<td><span>The input to be quashed</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#quash-frequent-preview-outputs}

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
<th scope="row">Rate limited output</th>
<td><span>The first input activation in the specified time period is sent to this output; subsequent activations within that period are sent to the quashed output. When the time period has elapsed, the next input activation starts a new period and is again sent to this output.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Quashed message output</th>
<td><span>Input activations that occur more than once within the specified time period are sent to this output.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Number of quashed messages within the current period</th>
<td><span>Incremented every time a message is quashed. Resets to zero when a message is not quashed.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Standard Deviation

`apama.analyticskit.blocks.core.StandardDeviation`

<p>Calculates the standard deviation and variance of the values over time.</p>
<p>This block is suitable for continuous values, even if they are irregularly sampled. The time between inputs or samples is significant, while the number of samples is not. Use this block, for example, if the input is a physical property, such as temperature, that is sampled either regularly or irregularly (for example, only generating measurement values on a change in temperature).  Use the Discrete Statistics block instead of the Standard Deviation block for independent measurements, such as ticket sales, where the number of measurements is significant, but the time between measurements is not.
<p></p>
Standard deviation is a measure that is used to quantify the amount of variation or dispersion of a set of data values. A low standard deviation indicates that the data points tend to be close to the mean of the set, while a high standard deviation indicates that the data points are spread out over a wider range of values.
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, the block uses an unbounded window. The Reset input port clears the window contents. The Sample input port can be used to force re-evaluation and generate the latest value. Output is generated on any new input or, if the Window Duration parameter is set, output is generated periodically on every new bucket that is added to the window.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the time of expired values is an approximation to the nearest bucket interval.
<p></p>
Note:  The Standard Deviation block generates the standard deviation and variance for an individual device. If the input comes from a group of devices, these values are generated separately for each device in that group. To calculate and generate aggregate values for the group as a whole (not for individual devices), use the Group Statistics block.</p>


#### Parameters {#standard-deviation-parameters}

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
<th scope="row">Window Duration (secs)</th>
<td><span>If present, the amount of time (in seconds) for which values are to be kept in the window.</span>
<p>This must be a finite and positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#standard-deviation-inputs}

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
<td><span>Input for which the standard deviation and variance is to be calculated.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Clears the content of the window.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Forces re-evaluation of the current value and sends the output.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#standard-deviation-outputs}

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
<th scope="row">Standard Deviation</th>
<td><span>The standard deviation of the input values.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Variance</th>
<td><span>The variance of the input values.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

