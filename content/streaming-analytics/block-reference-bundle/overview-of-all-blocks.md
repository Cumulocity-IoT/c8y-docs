---
weight: 12
title: Overview of all blocks
layout: redirect
---

The following table gives a brief description of all blocks that can be selected from the palette of the model editor, sorted alphabetically (excluding custom blocks that you have created yourself).

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
<td><a href="#ai-agent-prompt-preview">AI Agent Prompt (Preview)</a></td>
<td><span>This block queries an AI Agent manager agent using its inputs and produces the agent's text response as output.</span>
</td>
</tr>
<tr>
<td><a href="#alarm-input">Alarm Input</a></td>
<td><span>Receives <tt>Alarm</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#alarm-output">Alarm Output</a></td>
<td><span>Creates a new <tt>Alarm</tt> object for a specified device, asset or for the trigger device with a pre-configured alarm name and parameters.</span>
</td>
</tr>
<tr>
<td><a href="#and">AND</a></td>
<td><span>Performs a logical 'and' on the inputs.</span>
</td>
</tr>
<tr>
<td><a href="#average-mean">Average (Mean)</a></td>
<td><span>Calculates the mean of the values over time.</span>
</td>
</tr>
<tr>
<td><a href="#combiner">Combiner</a></td>
<td><span>Calculates the output based on the selected mode and the connected inputs.</span>
</td>
</tr>
<tr>
<td><a href="#constant-value">Constant Value</a></td>
<td><span>Outputs a value, either when the Trigger input port receives a signal or at startup.</span>
</td>
</tr>
<tr>
<td><a href="#counter">Counter</a></td>
<td><span>Gives a count of the total inputs and repeated inputs.</span>
</td>
</tr>
<tr>
<td><a href="#cron-timer">Cron Timer</a></td>
<td><span>Sends a signal output based on cron-like periodic timer syntax.</span>
</td>
</tr>
<tr>
<td><a href="#crossing-counter">Crossing Counter</a></td>
<td><span>Detects and counts the number of threshold crossings in the specified direction.</span>
</td>
</tr>
<tr>
<td><a href="#delta">Delta</a></td>
<td><span>Calculates the difference between successive input values.</span>
</td>
</tr>
<tr>
<td><a href="#difference">Difference</a></td>
<td><span>Calculates the absolute and signed differences between the connected inputs.</span>
</td>
</tr>
<tr>
<td><a href="#direction-detection">Direction Detection</a></td>
<td><span>Detects whether the input value changes direction.</span>
</td>
</tr>
<tr>
<td><a href="#discrete-statistics">Discrete Statistics</a></td>
<td><span>Generates statistics of sum, count, average (mean), standard deviation, minimum and maximum for discrete input values.</span>
</td>
</tr>
<tr>
<td><a href="#duration">Duration</a></td>
<td><span>Measures the time elapsed from a set start time.</span>
</td>
</tr>
<tr>
<td><a href="#event-input">Event Input</a></td>
<td><span>Receives <tt>Event</tt> objects from a device, asset, or devices in a group and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#event-output">Event Output</a></td>
<td><span>Creates a new <tt>Event</tt> object for a specified device, asset or for the trigger device.</span>
</td>
</tr>
<tr>
<td><a href="#expression">Expression</a></td>
<td><span>Evaluates an expression to perform arithmetic or logical calculations or string operations.</span>
</td>
</tr>
<tr>
<td><a href="#extract-property">Extract Property</a></td>
<td><span>Extracts the specified property from the input value and converts it to the specified type.</span>
</td>
</tr>
<tr>
<td><a href="#from-base-n">From Base N</a></td>
<td><span>Converts a base N string to a float.</span>
</td>
</tr>
<tr>
<td><a href="#gate">Gate</a></td>
<td><span>Blocks the input from going to output unless the gate is open and enabled.</span>
</td>
</tr>
<tr>
<td><a href="#geofence">Geofence</a></td>
<td><span>Compares the input value against the defined geofence value to detect whether the device is within the geofence, and whether the device entered or exited the geofence.</span>
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
<td><a href="#kpi">KPI</a></td>
<td><span>Compares a value against either a KPI (Key Performance Indicator) or the data point of a device, asset or group of devices.</span>
</td>
</tr>
<tr>
<td><a href="#latch-values">Latch Values</a></td>
<td><span>Latches the latest input value received while the block is enabled.</span>
</td>
</tr>
<tr>
<td><a href="#limit">Limit</a></td>
<td><span>Outputs a value that is kept within the defined upper and lower limits.</span>
</td>
</tr>
<tr>
<td><a href="#logger-preview">Logger (Preview)</a></td>
<td><span>Writes a message to the microservice log file for each input.</span>
</td>
</tr>
<tr>
<td><a href="#managed-object-input">Managed Object Input</a></td>
<td><span>Receives <tt>ManagedObject</tt> objects from a device, asset, devices in a group, or all input sources.</span>
</td>
</tr>
<tr>
<td><a href="#managed-object-output">Managed Object Output</a></td>
<td><span>Updates a <tt>ManagedObject</tt> object for a specified device, asset or for the trigger device.</span>
</td>
</tr>
<tr>
<td><a href="#measurement-input">Measurement Input</a></td>
<td><span>Receives <tt>Measurement</tt> objects from a device, asset, devices in a group, or all input sources and reorders them based on the timestamp.</span>
</td>
</tr>
<tr>
<td><a href="#measurement-output">Measurement Output</a></td>
<td><span>Creates a new <tt>Measurement</tt> object for a specified device, asset or for the trigger device.</span>
</td>
</tr>
<tr>
<td><a href="#minimum--maximum">Minimum / Maximum</a></td>
<td><span>Calculates the minimum and maximum of a value over time.</span>
</td>
</tr>
<tr>
<td><a href="#missing-data">Missing Data</a></td>
<td><span>Generates an output if the input has not occurred for a set amount of time.</span>
</td>
</tr>
<tr>
<td><a href="#not">NOT</a></td>
<td><span>Performs a logical 'not' on the input.</span>
</td>
</tr>
<tr>
<td><a href="#operation-input">Operation Input</a></td>
<td><span>Receives <tt>Operation</tt> objects from a device, asset, devices in a group, or all input sources.</span>
</td>
</tr>
<tr>
<td><a href="#operation-output">Operation Output</a></td>
<td><span>Creates a new <tt>Operation</tt> object for a specified device, asset or for the trigger device.</span>
</td>
</tr>
<tr>
<td><a href="#or">OR</a></td>
<td><span>Performs a logical 'or' on the inputs.</span>
</td>
</tr>
<tr>
<td><a href="#position-input">Position Input</a></td>
<td><span>Receives <tt>Event</tt> objects from a device, asset, devices in a group, or all input sources and extracts the <tt>c8y_Position</tt> fragment into a <tt>Value</tt> object.</span>
</td>
</tr>
<tr>
<td><a href="#pulse">Pulse</a></td>
<td><span>Converts a non-pulse input into a pulse output.</span>
</td>
</tr>
<tr>
<td><a href="#range">Range</a></td>
<td><span>Compares the input value against the defined lower and upper range values to detect whether the input is within or out of the range, or whether it crosses the range.</span>
</td>
</tr>
<tr>
<td><a href="#range-lookup">Range Lookup</a></td>
<td><span>Finds the range in which the input value lies.</span>
</td>
</tr>
<tr>
<td><a href="#rate-limiter-preview">Rate Limiter (Preview)</a></td>
<td><span>Suppresses all but the first message received per specified time period.</span>
</td>
</tr>
<tr>
<td><a href="#rounding">Rounding</a></td>
<td><span>Rounds the input to a specified number of decimal points or to an integer, using a selectable rule.</span>
</td>
</tr>
<tr>
<td><a href="#selector">Selector</a></td>
<td><span>Outputs a parameter value depending on which input port has a <tt>true</tt> value, lowest number taking precedence.</span>
</td>
</tr>
<tr>
<td><a href="#send-email">Send Email</a></td>
<td><span>Sends an email to the specified email addresses.</span>
</td>
</tr>
<tr>
<td><a href="#send-sms">Send SMS</a></td>
<td><span>Sends an SMS (Short Message Service) to the specified phone number.</span>
</td>
</tr>
<tr>
<td><a href="#set-properties">Set Properties</a></td>
<td><span>Outputs a pulse with properties set from values on the input ports.</span>
</td>
</tr>
<tr>
<td><a href="#smart-function-preview">Smart Function (Preview)</a></td>
<td><span>The Smart Function block allows you to write a custom JS/ECMAScript function to process up to ten inputs and produce up to ten outputs.</span>
</td>
</tr>
<tr>
<td><a href="#standard-deviation">Standard Deviation</a></td>
<td><span>Calculates the standard deviation and variance of the values over time.</span>
</td>
</tr>
<tr>
<td><a href="#switch">Switch</a></td>
<td><span>Outputs the values from a given input, or acts as a circuit breaker.</span>
</td>
</tr>
<tr>
<td><a href="#text-substitution">Text Substitution</a></td>
<td><span>Substitutes identifiers marked with a hash and braces (for example, <tt>#{name}</tt>) in the text template with corresponding entries from the input values.</span>
</td>
</tr>
<tr>
<td><a href="#threshold">Threshold</a></td>
<td><span>Compares the input value against the defined threshold value to detect whether the input breaches the threshold or whether it crosses the threshold.</span>
</td>
</tr>
<tr>
<td><a href="#time-delay">Time Delay</a></td>
<td><span>Delays the input by the specified amount of time.</span>
</td>
</tr>
<tr>
<td><a href="#to-base-n">To Base N</a></td>
<td><span>Converts a float to a base N string.</span>
</td>
</tr>
<tr>
<td><a href="#toggle">Toggle</a></td>
<td><span>Converts two pulse inputs to a boolean output based on the set and reset signals, with optional delays.</span>
</td>
</tr>
</tbody>
</table>
