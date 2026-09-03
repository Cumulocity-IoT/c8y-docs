---
weight: 60
title: Calculation
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
<td><a href="#ai-agent-prompt">AI Agent Prompt</a></td>
<td><span>This block queries an AI Agent manager agent using its inputs and produces the agent's text response as output.</span>
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
<td><a href="#expression">Expression</a></td>
<td><span>Evaluates an expression to perform arithmetic or logical calculations or string operations.</span>
</td>
</tr>
<tr>
<td><a href="#from-base-n">From Base N</a></td>
<td><span>Converts a base N string to a float.</span>
</td>
</tr>
<tr>
<td><a href="#kpi">KPI</a></td>
<td><span>Compares a value against either a KPI (Key Performance Indicator) or the data point of a device, asset or group of devices.</span>
</td>
</tr>
<tr>
<td><a href="#limit">Limit</a></td>
<td><span>Outputs a value that is kept within the defined upper and lower limits.</span>
</td>
</tr>
<tr>
<td><a href="#onnx">ONNX</a></td>
<td><span>Executes an ONNX model with named inputs and outputs.</span>
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
<td><a href="#rounding">Rounding</a></td>
<td><span>Rounds the input to a specified number of decimal points or to an integer, using a selectable rule.</span>
</td>
</tr>
<tr>
<td><a href="#smart-function">Smart Function</a></td>
<td><span>The Smart Function block allows you to write a custom JS/ECMAScript function to process up to ten inputs and produce up to ten outputs.</span>
</td>
</tr>
<tr>
<td><a href="#threshold">Threshold</a></td>
<td><span>Compares the input value against the defined threshold value to detect whether the input breaches the threshold or whether it crosses the threshold.</span>
</td>
</tr>
<tr>
<td><a href="#to-base-n">To Base N</a></td>
<td><span>Converts a float to a base N string.</span>
</td>
</tr>
</tbody>
</table>

### AI Agent Prompt

`apama.analyticsbuilder.blocks.AIAgent`

<p>This block queries an AI Agent manager agent using its inputs and produces the agent's text response as output.</p>
<p><b>Warning:</b> Be careful when using block inputs, as there is a risk of prompt injection attacks. Always validate and sanitize user-provided data before passing it to AI models.
<p></p>
<b>Note:</b> This block produces its output asynchronously after the input activation completes. If you wire this output alongside outputs from other blocks into the same downstream block, they will trigger that block in separate activations rather than being processed together.
<p></p>
<b>This block is currently in public preview and may be subject to change.</b></p>


#### Parameters {#ai-agent-prompt-parameters}

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
<th scope="row">Agent name</th>
<td><span>The agent to use in the AI Agent manager.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Prompt template</th>
<td><span>The prompt template to use when querying the agent. The block inputs will be mapped into this template using variables like {{inputs[0]}}, {{inputs[1]}}, etc.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#ai-agent-prompt-inputs}

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
<th scope="row">inputs[0]</th>
<td><span>The first input value. Accessed in the prompt template as {{inputs[0]}}.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[1]</th>
<td><span>The second input value. Accessed in the prompt template as {{inputs[1]}}.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[2]</th>
<td><span>The third input value. Accessed in the prompt template as {{inputs[2]}}.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[3]</th>
<td><span>The fourth input value. Accessed in the prompt template as {{inputs[3]}}.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[4]</th>
<td><span>The fifth input value. Accessed in the prompt template as {{inputs[4]}}.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#ai-agent-prompt-outputs}

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
<th scope="row">Result</th>
<td><span>The output value containing the AI agent's response.</span>
</td>
<td><span>string</span>
</td>
</tr>
</tbody>
</table>


### Crossing Counter

`apama.analyticskit.blocks.core.CrossingCounter`

<p>Detects and counts the number of threshold crossings in the specified direction.</p>
<p>Crossing is defined as a change in the input value from one side of the threshold to the other side of the threshold (that is, from less than to greater than or vice versa).
<p></p>
The block can operate over a time-bounded window that is specified with the Window Duration parameter. If this parameter is not specified, it uses an unbounded window. The Reset input clears the window contents.
<p></p>
If a window is configured, the block uses a set of 20 buckets, so the time of expired values is an approximation to the nearest bucket interval.</p>


#### Parameters {#crossing-counter-parameters}

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
<th scope="row">Threshold Value</th>
<td><span>This value is compared against the input value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Default: 0.5</span></td>
</tr>
<tr>
<th scope="row">Direction</th>
<td><span>The direction in which to check for a threshold crossing: whether to detect a crossing in the upwards direction, in the downwards direction, or in both directions.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Upwards</li>
<li>Downwards</li>
<li>Both</li></ul>
</span>
</td>
<td></td>
</tr>
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

#### Input Port Details {#crossing-counter-inputs}

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
<td><span>The input value for which to detect a crossing.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the count of crossings.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
<tr>
<th scope="row">Sample</th>
<td><span>Forces re-evaluation of the current value and sends the output.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#crossing-counter-outputs}

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
<th scope="row">Crossing Count</th>
<td><span>The number of crossings.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Crossing</th>
<td><span>Sends a pulse when a crossing is detected.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Delta

`apama.analyticskit.blocks.core.Delta`

<p>Calculates the difference between successive input values.</p>
<p>The block generates an output after getting at least two input values.</p>


#### Input Port Details {#delta-inputs}

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
<td><span>Value to calculate the delta.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#delta-outputs}

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
<th scope="row">Delta Value</th>
<td><span>The delta value.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Difference

`apama.analyticskit.blocks.core.Difference`

<p>Calculates the absolute and signed differences between the connected inputs.</p>
<p>Only generates an output if both inputs receive a value.</p>


#### Input Port Details {#difference-inputs}

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
<td><span>First input to the block.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Value 2</th>
<td><span>Second input to the block.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#difference-outputs}

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
<th scope="row">Absolute Difference</th>
<td><span>The absolute difference of the inputs.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Signed Difference</th>
<td><span>The signed difference of the inputs. Positive if the Value 1 input is larger than the Value 2 input.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Direction Detection

`apama.analyticskit.blocks.core.DirectionDetector`

<p>Detects whether the input value changes direction.</p>
<p>Outputs the change in direction and the last significant inflection point, ignoring minor variations if the changes are less than the defined hysteresis value. Repeated inputs of the same value are ignored.</p>


#### Parameters {#direction-detection-parameters}

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
<th scope="row">Hysteresis</th>
<td><span>Only counts a change in direction if the input value changes by the defined hysteresis value since the point of changing direction.</span>
<p>Must either be zero (meaning all changes of direction are counted) or a a positive number.</p>
</td>
<td><span>float</span>
</td>
<td><span>Default: 0.0</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#direction-detection-inputs}

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
<td><span>Numeric value for which to detect the change in direction.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#direction-detection-outputs}

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
<th scope="row">Upward Direction</th>
<td><span>Is <tt>true</tt> if the input value changes towards the upward direction, else <tt>false</tt>.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Inflection Point</th>
<td><span>The last inflection point detected by the block.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Expression

`apama.analyticskit.blocks.core.Expression`

<p>Evaluates an expression to perform arithmetic or logical calculations or string operations.</p>
<p>On change of input values (once all in-use inputs have been received), the expression specified in the parameter is re-calculated.
<p></p>
The expression language is much like EPL (see <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}/epl-reference/introduction/">EPL reference</a>), but is restricted to <tt>float</tt>, <tt>integer</tt>, <tt>string</tt> and <tt>boolean</tt> types.
<p></p>
Note: All numeric literals are treated as <tt>float</tt> type values, even if they have no fractional part. Integer values can only be obtained as the result of functions such as <tt>floor()</tt>. Similar to EPL, <tt>integer</tt> and <tt>float</tt> are not implicitly convertible within an expression. If the result of an expression is an <tt>integer</tt> value, it is converted to a <tt>float</tt> automatically (there might be a loss of precision).
<p></p>
Boolean values can be specified using the Boolean literals <tt>true</tt> and <tt>false</tt>. Boolean literals are case insensitive, so for example, <tt>TRUE</tt> and <tt>True</tt> are allowed. String values can be specified by enclosing string literals in double quotes, for example "my value". Special characters are encoded with a backslash (<tt>\</tt>). The following special characters (along which their encoding) are supported in string literals: <ul> <li>Double quotes - <tt>\"</tt></li> <li>Backslash - <tt>\\</tt></li> <li>Newline - <tt>\</tt><tt>n</tt></li> <li>Tab - <tt>\</tt><tt>t</tt></li> </ul>
<p></p>
Similar to EPL, each value type can be concatenated with a <tt>string</tt> type. The non-string value is first converted to a <tt>string</tt> and then appended to the <tt>string</tt> value.
<p></p>
The values of the inputs are available as <tt>input1</tt>, <tt>input2</tt>, <tt>input3</tt>, <tt>input4</tt> and <tt>input5</tt>. The input values can be of type <tt>float</tt>, <tt>string</tt>, <tt>boolean</tt> and <tt>any</tt>. Logical, relational, numerical and equality operators can be used on the values of the supported types. Logical operators are case insensitive, so for example, <tt>AND</tt> and <tt>And</tt> are allowed. The conditional (ternary) operator <tt>&lt;condition&gt; ? &lt;trueValue&gt; : &lt;falseValue&gt;</tt> evaluates only the branch selected by the <tt>boolean</tt> <tt>&lt;condition&gt;</tt>, requires <tt>&lt;trueValue&gt;</tt> and <tt>&lt;falseValue&gt;</tt> to be of the same type, has the lowest precedence of all operators, and is right-associative, so <tt>a ? b : c ? d : e</tt> is parsed as <tt>a ? b : (c ? d : e)</tt>. Built-in methods on the <tt>float</tt>, <tt>integer</tt>, <tt>string</tt> and <tt>boolean</tt> types can be called, including <tt>x.abs()</tt> (absolute value of <tt>x</tt>), <tt>x.pow(y)</tt> (raise <tt>x</tt> to the power <tt>y</tt>), <tt>x.sin()</tt> (sine of <tt>x</tt> in radians), <tt>x.round()</tt> (rounds <tt>x</tt> to the nearest integer), and <tt>s.ltrim()</tt> (remove whitespace from the start of the string <tt>s</tt>). Built-in static methods of the supported types can be called by specifying the type name, followed by a dot (<tt>.</tt>) and the method name, for example, <tt>float.max(input1, input2)</tt> (find the larger of two input values). Built-in constants on the supported types can be accessed by specifying the type name, followed by a dot (<tt>.</tt>) and the constant name, for example, <tt>float.E</tt> (Euler's constant). Values of type <tt>any</tt> are unpacked at runtime to evaluate the expression. After unpacking, the value must be of type <tt>float</tt>, <tt>string</tt> or <tt>boolean</tt>. The type checker tries to validate the expressions during the validation phase, but this is not always possible with the <tt>any</tt> type. So if an expression contains the <tt>any</tt> type, even if it passes the validation phase, it can still fail at runtime due to a wrong type of variable being passed or an unsupported operation being performed. For a full list of built-in methods and constants, consult the API <a target="_blank" rel="external noopener" href="{{< link-apama-webhelp >}}/related/ApamaDoc/index.html">Reference for EPL (ApamaDoc)</a>.
<p></p>
Some examples: <ul> <li>Convert Fahrenheit to Celsius: <tt>(input1 - 32) * 5/9 </tt></li> <li>Convert days to seconds: <tt>input1 * 86400 </tt></li> <li>Average of 4 inputs: <tt>(input1 + input2 + input3 + input4) / 4 </tt></li> <li>Threshold comparison: <tt>input1 &gt; 3.1412 </tt> (but also see the Threshold block)</li> <li>Pythagoras to compute the hypotenuse of a right-angled triangle: <tt>(input1.pow(2) + input2.pow(2)).sqrt() </tt></li> <li>Comparison to 3 decimal places: <tt>(input1 * 1000 - (input1 * 1000).fractionalPart()) = (input2 * 1000 - (input2 * 1000).fractionalPart()) </tt></li> <li>Range check: <tt>input1 &gt;= 1 and input1 &lt;= 10</tt></li> <li>String comparison: <tt>input1 = "my value"</tt></li> <li>Larger value: <tt>float.max(input1, float.PI)</tt></li> <li>Remainder of integer division: <tt>input1.round() % input2.round()</tt></li> <li>Left shift of integer value: <tt>input1.round() &lt;&lt; 4.round()</tt></li> <li>Right shift of integer value: <tt>input1.round() &gt;&gt; 2.round()</tt></li> <li>Bitwise not of integer value: <tt>not input1.round()</tt></li> <li>Bitwise or of integer values: <tt>input1.round() or input2.round()</tt></li> <li>Bitwise and of integer values: <tt>input1.round() and input2.round()</tt></li> <li>Bitwise xor of integer values: <tt>input1.round() xor input2.round()</tt></li> <li>String and non-string concatenation: <tt>"Current temperature is " + input1 + " degrees Celsius"</tt></li> <li>Conditional (ternary) operator: <tt>input1 &gt; 0 ? "positive" : "non-positive"</tt></li> </ul></p>


#### Parameters {#expression-parameters}

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
<th scope="row">Expression</th>
<td><span>An expression - a string representation of an EPL expression.</span>
<p>Similar to EPL expressions, but with the differences as described above.</p>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#expression-inputs}

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
<td><span>First input, to be used as <tt>input1</tt> in the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input2</th>
<td><span>Second input, to be used as <tt>input2</tt> in the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input3</th>
<td><span>Third input, to be used as <tt>input3</tt> in the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input4</th>
<td><span>Fourth input, to be used as <tt>input4</tt> in the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">input5</th>
<td><span>Fifth input, to be used as <tt>input5</tt> in the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#expression-outputs}

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
<th scope="row">Result</th>
<td><span>Result of the expression.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### From Base N

`apama.analyticsbuilder.blocks.FromBaseN`

<p>Converts a base N string to a float.</p>
<p>The input string can be in any integer base from 2 to 36, where letters of the English alphabet are used as digits for bases above 10. Common bases are 2 (binary), 8 (octal), 10 (decimal) and 16 (hexadecimal). The number being converted can contain a radix point.
<p></p>
Conversion between two arbitrary bases can be achieved by chaining this block with the To Base N block.</p>


#### Parameters {#from-base-n-parameters}

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
<th scope="row">Input Base</th>
<td><span>The number base of the input stream, in the range 2 to 36.</span>
</td>
<td><span>integer</span>
</td>
<td><span>Default: 16</span></td>
</tr>
<tr>
<th scope="row">Radix Character</th>
<td><span>The character to use as the radix point. Expected to be a dot or a comma.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Dot</li>
<li>Comma</li></ul>
</span>
</td>
<td><span>Default: Dot</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#from-base-n-inputs}

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
<th scope="row">Base N</th>
<td><span>String input in base N.</span>
</td>
<td><span>string</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#from-base-n-outputs}

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
<th scope="row">Float</th>
<td><span>Numeric output.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### KPI

`apama.analyticskit.blocks.cumulocity.KPI`

<p>Compares a value against either a KPI (Key Performance Indicator) or the data point of a device, asset or group of devices.</p>
<p>This block uses data from the KPI input port or from the device, asset or group of devices which contains data points. It extracts the units, label, and the red and yellow ranges. The output indicates whether the value is within the red or yellow range specified by the KPI or data point.
<p></p>
The KPI input can provide properties, typically from a KPI-managed object, which include the red and yellow ranges, the unit and the label. If the device contains a data point for the specified fragment and series, then the values from the data point override those from the KPI.</p>


#### Parameters {#kpi-parameters}

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
<td><span>The device, group, or asset which contains a data point. If specified, then this source (typically the same as the measurement source) is checked to see if it contains a data point for the specified fragment and series. If it contains a data point, the red and yellow range values from the source object are used in place of the KPI values.</span>
<p>For the KPI block, this parameter must not be set to "All Inputs".</p>
</td>
<td><span>any</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Data Point Fragment and Series</th>
<td><span>This parameter must be specified if the Input Source parameter is specified. It specifies a data point from the source object. This is typically the same as the fragment and series of the measurement source.</span>
<p>The data point fragment and series must be specified as <tt>fragment.series</tt>.</p>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Upper end of yellow range exclusive</th>
<td><span>If set, the upper end of the yellow range is treated as being exclusive.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
<tr>
<th scope="row">Upper end of red range exclusive</th>
<td><span>If set, the upper end of the red range is treated as being exclusive.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: False</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#kpi-inputs}

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
<td><span>Numeric value to compare with the defined ranges.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">KPI</th>
<td><span>Object containing the <tt>c8y_Kpi</tt> property.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#kpi-outputs}

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
<th scope="row">Red</th>
<td><span>Is set to <tt>true</tt> when the value is in the red range (if a red range is defined).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Yellow</th>
<td><span>Is set to <tt>true</tt> when the value is in the yellow range (if a yellow range is defined).</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Unit</th>
<td><span>The unit name from the data point.</span>
</td>
<td><span>string</span>
</td>
</tr>
<tr>
<th scope="row">Label</th>
<td><span>The label name from the data point.</span>
</td>
<td><span>string</span>
</td>
</tr>
</tbody>
</table>


### Limit

`apama.analyticsbuilder.blocks.Limit`

<p>Outputs a value that is kept within the defined upper and lower limits.</p>
<p>The input value is limited so that the output does not exceed the boundaries defined by the Lower Limit and Upper Limit parameters. If the input violates either limit, then the output is set to the parameter value, otherwise the value is passed through unchanged.
<p></p>
It is only mandatory to provide one of the limits. If this is the case, then the input is only limited in the direction of the specified parameter.</p>


#### Parameters {#limit-parameters}

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
<th scope="row">Upper Limit</th>
<td><span>Any input above this value results in the output being capped at this value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Lower Limit</th>
<td><span>Any input below this value results in the output being capped at this value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
</tbody>
</table>

#### Input Port Details {#limit-inputs}

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
<td><span>The input value.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#limit-outputs}

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
<td><span>The input value, if it is within the limits defined by the Lower Limit and Upper Limit parameters. If the input value exceeds one of the limit parameters, it is set to the value of that parameter.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### ONNX

`apama.analyticsbuilder.blocks.ONNX`

<p>Executes an ONNX model with named inputs and outputs.</p>
<p><b>This block is currently in public preview and may be subject to change.</b>
<p></p>
The input pulse must contain a properties dictionary where keys are the ONNX input names and values are scalars (float, integer, boolean, string) or tensors (nested sequences of those types).
<p></p>
The output pulse contains a properties dictionary where keys are the ONNX output names and values are scalars or tensors matching the model's output schema.
<p></p>
If the model execution fails, the output properties will contain a single "error" property with the error message.</p>


#### Parameters {#onnx-parameters}

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
<th scope="row">ONNX model name</th>
<td><span>The name of the ONNX model to run, which must include one of the following file extensions: <ul> <li><b>.onnx</b> - for a standalone ONNX model file (for example, <tt>MyModel.onnx</tt>).</li> <li><b>.zip</b> - for a zip archive containing an ONNX model of the same base name (for example, <tt>MyModel.zip</tt> containing <tt>MyModel.onnx</tt>). Useful when the model requires additional files alongside the <tt>.onnx</tt> file.</li> </ul> The model/zip must be deployed to the platform's Files repository under this name.</span>
</td>
<td><span>string</span>
</td>
<td></td>
</tr>
</tbody>
</table>

#### Input Port Details {#onnx-inputs}

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
<th scope="row">Model Inputs</th>
<td><span>Input pulse containing properties dictionary with named ONNX inputs.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#onnx-outputs}

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
<th scope="row">Model Outputs</th>
<td><span>Output pulse containing properties dictionary with named ONNX outputs. Each output property value is either a scalar (float, integer, boolean, string) or a tensor (nested sequences of those types). If the model execution fails, the output properties will contain a single "error" property with the error message.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Range

`apama.analyticsbuilder.blocks.Range`

<p>Compares the input value against the defined lower and upper range values to detect whether the input is within or out of the range, or whether it crosses the range.</p>
<p>By default, the range includes the value for the lower range but excludes the value for the upper range. For example, if the lower range is 100 and the upper range is 200, then all values from 100 to 199 are within the range. 200 is considered to be out of the range.
<p></p>
A pulse is sent when the defined range is crossed. That is, when either the lower or upper range is crossed, or if the value goes from below the range to over the range (or vice versa) without ever being within the range.</p>


#### Parameters {#range-parameters}

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
<th scope="row">Lower Range</th>
<td><span>The lower range value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Include Lower Range</th>
<td><span>If selected, an input value equal to the lower range is considered to identify whether it is within or out of the range. If not selected, an input value equal to the lower range is not considered.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: True</span></td>
</tr>
<tr>
<th scope="row">Upper Range</th>
<td><span>The upper range value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Exclude Upper Range</th>
<td><span>If selected, an input value equal to the upper range is not considered to identify whether it is within or out of the range. If not selected, such an input value is considered to identify whether it is within or out of the range.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: True</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#range-inputs}

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
<td><span>The input value to validate against the defined range.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#range-outputs}

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
<th scope="row">Out of Range</th>
<td><span>Is set to <tt>true</tt> when the input value is not within the defined range.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">In Range</th>
<td><span>Is set to <tt>true</tt> when the input value is within the defined range.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Crossed</th>
<td><span>Sends a pulse when the range is crossed.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### Range Lookup

`apama.analyticskit.blocks.core.RangeLookup`

<p>Finds the range in which the input value lies.</p>
<p>Ranges are defined using a list of unique upper bound values in increasing order. The lower bound of the first range depends on the value of the Minimum Value parameter. The lower bound of each subsequent range is defined by the upper bound of the previous range. The range to which an input value equal to a boundary value belongs depends on the Exclude Upper parameter. The block outputs the mapped value for the range the input lies within, or a failed flag if the input value is not within any of the ranges.</p>


#### Parameters {#range-lookup-parameters}

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
<th scope="row">Minimum Value</th>
<td><span>The lower bound of the first range (first row). If nothing is specified, negative infinity is taken as the minimum value.</span>
</td>
<td><span>float</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Ranges</th>
<td><span>A boundary and mapped value pair for the upper bound of a range for which to look up the input value and a mapped value that is to be used as the output value if the input value lies within the range.</span>
</td>
<td><span>List of Upper Bound value and Mapped Value</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Exclude Upper</th>
<td><span>If selected, an input value equal to the upper bound of a row is considered to be part of the range of the next row. If not selected, such an input value is considered to be part of the range of the current row.</span>
</td>
<td><span>boolean</span>
</td>
<td><span>Default: True</span></td>
</tr>
<tr>
<th scope="row">Type</th>
<td><span>The type that is to be used for the output value.</span>
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
</tbody>
</table>

#### Input Port Details {#range-lookup-inputs}

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
<td><span>The input value for which the range is to be found.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#range-lookup-outputs}

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
<th scope="row">Mapped</th>
<td><span>The Mapped Value for the range that is matched.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">Failed</th>
<td><span>Is <tt>true</tt> when the input does not lie in any range. Otherwise it is <tt>false</tt>.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>


### Rounding

`apama.analyticskit.blocks.core.Rounding`

<p>Rounds the input to a specified number of decimal points or to an integer, using a selectable rule.</p>
<p>Rounding a numerical value means replacing it by another value that is approximately equal but has a shorter and simpler representation.
<p></p>
The rules available for use are: <ul> <li>Up (or take the ceiling, or round towards plus infinity) rounds the input up to the nearest target number. </li> <li>Down (or take the floor, or round towards minus infinity) rounds the input down to the nearest target number.</li> <li>Towards Zero (or truncate, or round away from infinity) rounds the input towards zero to the nearest target number.</li> <li>Nearest (or round half up, or round half towards positive infinity) rounds to the nearest target number. Numbers that are equidistant from the two nearest target numbers are always rounded up. For example, value <tt>23.5</tt> gets rounded to <tt>24</tt>, but <tt>-23.5</tt> gets rounded to <tt>-23.</tt> </li> <li>Even or Nearest rounds to the nearest target number. Numbers that are equidistant from the two nearest target numbers are always rounded to the nearest even target. For example, <tt>0.5</tt> rounds down to <tt>0</tt> and <tt>1.5</tt> rounds up to <tt>2.</tt> Also known as Bankers Rounding.</li> </ul>
<p></p>
The value is rounded to the nearest 'target number' - this is a whole number (if the number of decimal points is zero), or rounded to the number of decimal points specified.  If the number of decimal points is negative, it is rounded to a power of 10. For example, if the number of decimal points is 2, it is rounded to the nearest 0.01 (that is, hundredths). If the number of decimal points is -3, it is rounded to the nearest 1000 (that is, thousands).</p>


#### Parameters {#rounding-parameters}

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
<th scope="row">Rule</th>
<td><span>The rounding rule to be applied.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Up</li>
<li>Down</li>
<li>Towards Zero</li>
<li>Nearest</li>
<li>Even or Nearest</li></ul>
</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Number of Decimal Points</th>
<td><span>The number of decimal points the input is to be rounded to.</span>
</td>
<td><span>integer</span>
</td>
<td><span>Default: 0</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#rounding-inputs}

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
<td><span>The input value which is to be rounded.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#rounding-outputs}

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
<th scope="row">Rounded Value</th>
<td><span>The input value rounded to a specified number of decimal points or to an integer.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>


### Smart Function

`apama.analyticsbuilder.blocks.SmartFunction`

<p>The Smart Function block allows you to write a custom JS/ECMAScript function to process up to ten inputs and produce up to ten outputs.</p>
<p><b>This block is currently in public preview and may be subject to change.</b>
<p></p>
The Smart Function must export a function <tt>onInput(inputs, context)</tt> that returns a list of outputs.
<p></p>
Argument details: <ul> <li><tt>inputs</tt> is a list of ten <tt>Value</tt> objects, with members <tt>value</tt>, <tt>properties</tt> and <tt>timestamp</tt> corresponding to the block inputs.</li>
<p></p>
<li><tt>context</tt> is an object with the following members: <ul> <li><tt>params</tt> - List that contains the block parameters as specified in the block configuration.</li> <li><tt>getState(key, def = null)</tt> - Method that retrieves a value previously stored in the context under the given key. If no value is found, returns <tt>def</tt>.</li> <li><tt>setState(key, value)</tt> - Method that stores the given value in the context under the given key.</li> </ul> </li> </ul>
<p></p>
In addition, the <tt>console</tt> object has <tt>log</tt>, <tt>warn</tt>, <tt>error</tt>, <tt>info</tt> and <tt>debug</tt> members that can be used to log messages to the microservice log. These all have the signature:
<p></p>
<pre>function log(...args: any[]): void</pre>
<p></p>
Logging is configured by the block's log level parameter and the model's shared logger category threshold; the effective level is whichever is stricter. By default, the block log level is set to <tt>WARN</tt>; only <tt>console.warn</tt> and <tt>console.error</tt> are written; <tt>console.log</tt>, <tt>console.info</tt> and <tt>console.debug</tt> are not. Raise the log level to <tt>INFO</tt> or <tt>DEBUG</tt> to see more, or set it to <tt>OFF</tt> to silence everything.
<p></p>
Arguments are formatted and separated by spaces. String interpolation can be done with Javascript interpolation syntax. For example:
<p></p>
<pre> console.log("Server started");<br/> // -> Server started<br/> <br/> console.log("User", "logged", "in");<br/> // -> User logged in<br/> <br/> console.log("User login", { userId: 123, role: "admin" });<br/> // -> User login { userId: 123, role: 'admin' }<br/> <br/> const userId = 123;<br/> const role = "admin";<br/> console.log(`User ${userId} logged in as ${role}`);<br/> // -> User 123 logged in as admin<br/> </pre>
<p></p>
The return value of the function is a list of up to ten values corresponding to the block outputs. These can either be bare values, or <tt>Value</tt> objects, with members <tt>value</tt>, <tt>properties</tt> and <tt>timestamp</tt>. If the function does not generate a value, return <tt>null</tt> instead.
<p></p>
For example:
<p></p>
<pre> export function onInput(inputs, context) {<br/> &nbsp;&nbsp;console.log("Processing inputs");<br/> &nbsp;&nbsp;context.setState("count", context.getState("count", 0) + 1);<br/> &nbsp;&nbsp;if (inputs[0].value !== null && inputs[1].value !== context.params[0]) {<br/> &nbsp;&nbsp;&nbsp;&nbsp;return [<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inputs[0].value - inputs[1].value, // outputs[0]<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: inputs[0].value - inputs[1].value,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties: { ...inputs[0].properties, ...inputs[1].properties }<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} // outputs[1]<br/> &nbsp;&nbsp;&nbsp;&nbsp;];<br/> &nbsp;&nbsp;}<br/> &nbsp;&nbsp;return null;<br/> }<br/> </pre></p>


#### Parameters {#smart-function-parameters}

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
<th scope="row">Label</th>
<td><span>An arbitrary label for the block instance.</span>
</td>
<td><span>string</span>
</td>
<td><span>Optional</span>
</td>
</tr>
<tr>
<th scope="row">Parameters for the Smart Function code</th>
<td><span>List of parameters that can be templated into the Smart Function code. Can be accessed using <tt>context.params[N]</tt>.</span>
</td>
<td><span>sequence&lt;string&gt;</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Smart Function</th>
<td><span>The JS code must define a function onInput that takes inputs and context as arguments and returns a list of outputs.</span>
</td>
<td><span>string</span>
</td>
<td><span>Default: export function onInput(inputs, context) {
  return null;
}
</span></td>
</tr>
<tr>
<th scope="row">Log level</th>
<td><span>This block's <tt>console.*</tt> verbosity. The effective level is determined by this setting and the model's shared logger category threshold; whichever is stricter.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>OFF</li>
<li>ERROR</li>
<li>WARN</li>
<li>INFO</li>
<li>DEBUG</li></ul>
</span>
</td>
<td><span>Default: WARN</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#smart-function-inputs}

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
<th scope="row">inputs[0]</th>
<td><span>First input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[1]</th>
<td><span>Second input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[2]</th>
<td><span>Third input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[3]</th>
<td><span>Fourth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[4]</th>
<td><span>Fifth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[5]</th>
<td><span>Sixth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[6]</th>
<td><span>Seventh input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[7]</th>
<td><span>Eighth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[8]</th>
<td><span>Ninth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">inputs[9]</th>
<td><span>Tenth input to the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#smart-function-outputs}

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
<th scope="row">outputs[0]</th>
<td><span>First output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[1]</th>
<td><span>Second output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[2]</th>
<td><span>Third output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[3]</th>
<td><span>Fourth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[4]</th>
<td><span>Fifth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[5]</th>
<td><span>Sixth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[6]</th>
<td><span>Seventh output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[7]</th>
<td><span>Eighth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[8]</th>
<td><span>Ninth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
<tr>
<th scope="row">outputs[9]</th>
<td><span>Tenth output of the block.</span>
</td>
<td><span>any</span>
</td>
</tr>
</tbody>
</table>


### Threshold

`apama.analyticskit.blocks.core.Threshold`

<p>Compares the input value against the defined threshold value to detect whether the input breaches the threshold or whether it crosses the threshold.</p>
<p>A breach occurs when the direction has been set to 'Above' and the input value is greater than the defined threshold value, or when the direction has been set to 'Below' and the input value is less than the defined threshold, or when the direction has been set to 'Above or Equal' and the input value is greater than or equal to the defined threshold value, or when the direction has been set to 'Below or Equal' and the input value is less than or equal to the defined threshold value.
<p></p>
A pulse is sent when the defined threshold value is crossed from any direction.</p>


#### Parameters {#threshold-parameters}

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
<th scope="row">Threshold Value</th>
<td><span>This value is compared against the input value.</span>
</td>
<td><span>float</span>
</td>
<td></td>
</tr>
<tr>
<th scope="row">Direction</th>
<td><span>The direction in which to look: whether the input value is above, below or equal to the defined threshold, or whether it crosses the defined threshold.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Above</li>
<li>Above or Equal</li>
<li>Below</li>
<li>Below or Equal</li>
<li>Crossing</li></ul>
</span>
</td>
<td><span>Default: Above</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#threshold-inputs}

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
<td><span>The input value to compare against the defined threshold value.</span>
</td>
<td><span>float</span>
</td>
</tr>
<tr>
<th scope="row">Reset</th>
<td><span>Resets the state of the block.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#threshold-outputs}

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
<th scope="row">Breached Threshold</th>
<td><span>Is set to <tt>true</tt> when the threshold is breached.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Within Threshold</th>
<td><span>Is set to <tt>true</tt> when the threshold is not breached.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Crossed Threshold</th>
<td><span>Sends a pulse when the threshold is crossed.</span>
</td>
<td><span>pulse</span>
</td>
</tr>
</tbody>
</table>


### To Base N

`apama.analyticsbuilder.blocks.ToBaseN`

<p>Converts a float to a base N string.</p>
<p>The output string can be in any integer base from 2 to 36, where letters of the English alphabet are used as digits for bases above 10. Common bases are 2 (binary), 8 (octal), 10 (decimal) and 16 (hexadecimal). The number being converted can contain a radix point. The output is calculated to a maximum precision of 16 radix places.
<p></p>
Conversion between two arbitrary bases can be achieved by chaining this block with the From Base N block.</p>


#### Parameters {#to-base-n-parameters}

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
<th scope="row">Output Base</th>
<td><span>The number base of the output stream, in the range 2 to 36.</span>
</td>
<td><span>integer</span>
</td>
<td><span>Default: 16</span></td>
</tr>
<tr>
<th scope="row">Radix Character</th>
<td><span>The character to use as the radix point. Expected to be a dot or a comma.</span>
</td>
<td><span><p>Option - one of:</p>
<ul>
<li>Dot</li>
<li>Comma</li></ul>
</span>
</td>
<td><span>Default: Dot</span></td>
</tr>
</tbody>
</table>

#### Input Port Details {#to-base-n-inputs}

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
<th scope="row">Float</th>
<td><span>Numeric input.</span>
</td>
<td><span>float</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#to-base-n-outputs}

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
<th scope="row">Base N</th>
<td><span>String output in base N.</span>
</td>
<td><span>string</span>
</td>
</tr>
</tbody>
</table>

