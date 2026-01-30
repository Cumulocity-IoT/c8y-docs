---
weight: 60
title: Wires and blocks
layout: redirect
---

### Values sent on a wire {#values-sent-on-a-wire}

Blocks within a model are connected from block outputs to block inputs with wires.

{{< c8y-admon-info>}}
These block outputs and inputs are also called output ports and input ports. See also [Adding a wire between two blocks](/streaming-analytics/analytics-builder/#adding-a-wire-between-two-blocks).
{{< /c8y-admon-info>}}

Wires allow blocks to pass signals and values between blocks. The value sent on a wire is one of the following types, according to the block output from which it is connected:

<table>
<colgroup>
    <col style="width: 20%;">
    <col style="width: 80%;">
</colgroup>
<thead>
  <tr>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>boolean</code></td>
    <td>A true or false value. A boolean value stays true or false until changed.</td>
  </tr>
  <tr>
    <td><code>float</code></td>
    <td>A numeric value, which can be fractional (and processed using fixed precision). A float value maintains its current value until changed.</td>
  </tr>
  <tr>
    <td><code>string</code></td>
    <td>A textual value. A string value maintains its current value until changed.</td>
  </tr>
  <tr>
    <td><code>pulse</code></td>
    <td>A signal of a point in time. Pulses are only active momentarily. Unlike the above types, they only represent a single instance in time. See also <a href="/streaming-analytics/analytics-builder/#the-pulse-type">The pulse type</a>.</td>
  </tr>
  <tr>
    <td><code>any</code></td>
    <td>A value that may be any of the above types. See also <a href="/streaming-analytics/analytics-builder/#the-any-type">The any type</a>.</td>
  </tr>
</tbody>
</table>

The type of a wire depends on the output to which it is connected. This can be viewed in the block reference. Similarly, the type \(or supported types\) of a block's input can be viewed in the block reference.

#### Value types {#value-types}

The following types are referred to as value types:

-   `boolean`
-   `string`
-   `float`
-   `any` when used to hold a `boolean`, `string` or `float` value

Value types are useful for modeling measurements such as sensor values, which may be read intermittently, or sampled. In between readings, the physical property being measured \(such as temperature\) will still have some value, as it is a continuous property. For practical reasons, a sensor may not give a continuous stream of output but instead a periodic sampling, or provide new readings only if the value being measured has changed \(within whatever measurement resolution the sensor provides\). Between sample points, blocks will use the most recent value, as that is the most up to date value being provided. In general, blocks assume that a value stays at whatever the most recent reading of that value is until a new value is received.

For example, consider a pair of temperature sensors. One provides a reading every 10 seconds regardless, while another only provides a new reading if the value has changed by 0.5 degrees. If we connect these to a **Difference** block, then we may have inputs as shown in the following table, with the corresponding result from the **Difference** block's **Absolute Difference** output:

|Time|Sensor 1 \(reads every 10s\)|Sensor 2 \(output if changed by 0.5\)|Difference block: Absolute Difference output|
|----|:--------------------------:|:-----------------------------------:|:------------------------------------------:|
|10:00:00|20.0|||
|10:00:03||22.0|2|
|10:00:10|20.0||2|
|10:00:20|20.0||2|
|10:00:23||22.5|2.5|
|10:00:28||23.0|3|
|10:00:30|21.1||1.9|
|10:00:35||23.5|2.4|
|10:00:40|22.8|24.0|1.2|

Note that two inputs \(to different input ports of the block\) to the same block with the same timestamp only generate a single output. For each wire within a model \(and each input block\), there can only be a single value for a given point in time. An input block cannot generate more than one output for the same timestamp. If it receives multiple events at the same time, then it is undefined which of the events is picked.

In general, blocks will not consider there to be any significance to a wire receiving the same `boolean`, `float` or `string` value as before. Most blocks will not change behavior. This is true for any arithmetic blocks, such as the **Difference** block in the example above: the output is still 2 on the repeated readings from sensor 1. There are some exceptions, such as the **Missing Data** block when the **Ignore Repeated Inputs** checkbox is not selected \(`false`\).

If a single block has a numeric value input and pulse signals such as reset, the absence of a new value when a pulse signal occurs means that the value is treated as having the same value still. Thus, when an **Average \(Mean\)** block is reset, its output will be equal to the most recently received input \(assuming it has received an input since the model has started\). In the example below, the **Average \(Mean\)** block's duration has not been set, while the output threshold is set to 0.05; this means the block will generate new output even if there is no new input \(see [Common block inputs and parameters](/streaming-analytics/analytics-builder/#common-block-inputs-and-parameters)\).

<table>
<colgroup>
    <col style="width: 15%;">
    <col style="width: 15%;">
    <col style="width: 15%;">
    <col style="width: 15%;">
    <col style="width: 40%;">
</colgroup>
<thead>
  <tr>
    <th>Time</th>
    <th>Reset signal</th>
    <th>Sensor 2</th>
    <th>Average (Mean) block output</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>10:00:00</td>
    <td>Reset</td>
    <td></td>
    <td></td>
    <td>No output. There has been no input value yet.</td>
  </tr>
  <tr>
    <td>10:00:03</td>
    <td></td>
    <td>22.0</td>
    <td>22.00</td>
    <td>With no history, the output value is the input value.</td>
  </tr>
  <tr>
    <td>10:00:23</td>
    <td></td>
    <td>22.5</td>
    <td></td>
    <td>All of the values up to this point have been 22, so the average value is still 22 (thus, no new output is generated).</td>
  </tr>
  <tr>
    <td>10:00:25.22</td>
    <td></td>
    <td></td>
    <td>22.05</td>
    <td>Average of 20 seconds at value 22 and 2.22 seconds at value 22.5.</td>
  </tr>
  <tr>
    <td>10:00:28</td>
    <td></td>
    <td>23.0</td>
    <td>22.10</td>
    <td>Average of 20 seconds at value 22 and 5 seconds at value 22.5.</td>
  </tr>
  <tr>
    <td>10:00:30</td>
    <td>Reset</td>
    <td></td>
    <td>23.00</td>
    <td>The input is still 23 (we just have not received a new event), and reset only discards the history. With no history, the output value is the input value.</td>
  </tr>
  <tr>
    <td>10:00:35</td>
    <td></td>
    <td>23.5</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:35.56</td>
    <td></td>
    <td></td>
    <td>23.05</td>
    <td rowspan="4">Average at various points in time, when the output changes by 0.05.</td>
  </tr>
  <tr>
    <td>10:00:36.25</td>
    <td></td>
    <td></td>
    <td>23.10</td>
  </tr>
  <tr>
    <td>10:00:37.14</td>
    <td></td>
    <td></td>
    <td>23.15</td>
  </tr>
  <tr>
    <td>10:00:38.33</td>
    <td></td>
    <td></td>
    <td>23.20</td>
  </tr>
  <tr>
    <td>10:00:40</td>
    <td></td>
    <td>24.0</td>
    <td>23.25</td>
    <td>Average of 5 seconds at value 23 (from reset at :30 to :35) and 5 seconds at value 23.5 (from :35 to :40).</td>
  </tr>
</tbody>
</table>

The following graph illustrates the inputs to the **Average \(Mean\)** block and the output of this block:

![Graph illustrating the inputs and the output](/images/streaming-analytics/analytics-builder/value-types-example1.png)

Note how the effective input value is unchanged until a new measurement input occurs, and the **Average \(Mean\)** block operates on this effective value \(the red line in the above graph\). When reset, the block outputs the current effective input, which at the second reset at 10:00:30 is 23. Note that when the **Output Threshold** parameter is set, new outputs can be generated even if no new input occurs, and will asymptotically approach the last input value. Note that this behavior differs from Apama queries or stream queries.

If the **Average \(Mean\)** block was configured with a window of 10 seconds, then the window would apply as illustrated below:

<table>
<colgroup>
    <col style="width: 20%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
    <col style="width: 15%;">
    <col style="width: 15%;">
    <col style="width: 20%;">
</colgroup>
<thead>
  <tr>
    <th>Time</th>
    <th>Reset signal</th>
    <th>Sensor 2</th>
    <th>Effective input value</th>
    <th>Average (Mean) block output</th>
    <th>Values in window history</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>10:00:00</td>
    <td>Reset</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:03</td>
    <td></td>
    <td>22</td>
    <td>22</td>
    <td>22.00</td>
    <td></td>
    <td>First value after start: the window is empty, so the <b>Average (Mean)</b> block uses the input value for the output.</td>
  </tr>
  <tr>
    <td>10:00:23</td>
    <td></td>
    <td>22.5</td>
    <td>22.5</td>
    <td></td>
    <td>22</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:23 - 10:00:28</td>
    <td></td>
    <td></td>
    <td>22.5</td>
    <td>increasing from 22.00 to 22.20</td>
    <td>22, 22.5</td>
    <td>Proportion of window that is 22 or 22.5 changes over time, thus the output changes.</td>
  </tr>
  <tr>
    <td>10:00:28</td>
    <td></td>
    <td>23</td>
    <td>23</td>
    <td>22.25</td>
    <td>22, 22.5</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:28 - 10:00:30</td>
    <td></td>
    <td></td>
    <td>23</td>
    <td>increasing from 22.25 to 22.40</td>
    <td>22, 22.5, 23</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:30</td>
    <td>Reset</td>
    <td></td>
    <td>23</td>
    <td>23.00</td>
    <td></td>
    <td>Window is reset and thus now empty; the current (effective) input is 23, so the <b>Average (Mean)</b> block uses that for the output.</td>
  </tr>
  <tr>
    <td>10:00:35</td>
    <td></td>
    <td>23.5</td>
    <td>23.5</td>
    <td></td>
    <td>23</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:35 - 10:00:40</td>
    <td></td>
    <td></td>
    <td>23.5</td>
    <td>increasing from 23.00 to 23.20</td>
    <td>23, 23.5</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:40</td>
    <td></td>
    <td>24</td>
    <td>24</td>
    <td>23.25</td>
    <td>23, 23.5</td>
    <td>Window is now full (10 seconds since reset).</td>
  </tr>
  <tr>
    <td>10:00:40 - 10:00:45</td>
    <td></td>
    <td></td>
    <td>24</td>
    <td>increasing from 23.25 to 23.75</td>
    <td>23, 23.5, 24</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:45</td>
    <td></td>
    <td></td>
    <td>24</td>
    <td>23.75</td>
    <td>23.5, 24</td>
    <td>Value 23 is now finally expired from the window (this was the effective input until 10:00:35, which is 10 seconds ago).</td>
  </tr>
  <tr>
    <td>10:00:45 - 10:00:50</td>
    <td></td>
    <td></td>
    <td>24</td>
    <td>increasing from 23.75 to 24</td>
    <td>23.5, 24</td>
    <td></td>
  </tr>
  <tr>
    <td>10:00:50</td>
    <td></td>
    <td></td>
    <td>24</td>
    <td>24</td>
    <td>24</td>
    <td>Value 23.5 is now finally expired from the window (this was the effective input until 10:00:40, which is 10 seconds ago). The window now contains 10 seconds worth of measurements, all with value 24.</td>
  </tr>
</tbody>
</table>

In the above, note how the current value only has any weighting in the window \(that is, contributing to the output value\) after the measurement is received. At the point the measurement is received, it has zero weighting compared to the previous history. As before, the sensor's value remains the effective input until it is replaced with a newer value \(note that this is different to aggregates with timed-based windows in Apama queries or stream queries\). For example, the block has an effective input value of 23.5 from 10:00:35 to 10:00:40, and the value 23.5 is thus only finally expired from the window at 10:00:50, 10 seconds after it ceased to be the current effective input value, rather than 10 seconds after it first entered the window. Finally, note that when the window is empty, the effective input is used as the output instead, as the window is zero-length.

#### The pulse type {#the-pulse-type}

In contrast to value types, the `pulse` type represents a single point in time. For example, this may be a result of:

-   a user pressing a momentary-action button,
-   a state transition of a device,
-   a sensor detecting a person walking through a door,
-   a heartbeat event to denote a remote device is still alive, or
-   a state transition of a block within a model.

Typically, blocks act upon every pulse sent to one of their inputs. Pulses are commonly used to trigger an output from a model using an output block, or used to reset the state of blocks within a model.

Pulses are active momentarily. In some regards, they are similar to a boolean value which is automatically reset to `false` after a model has processed a value.

Repeated pulses are typically significant, though they may not necessarily result in any change, depending on how they are being used. For example, repeatedly resetting an **Average \(Mean\)** block while its input value is unchanged will result in the output value remaining the same.

#### The any type {#the-any-type}

The `any` type is used on blocks which pass through a value of any type \(for example, a **Time Delay** block or a **Gate** block\).

Values of the `any` type can represent a value type or a `pulse` type.

### Type conversions {#type-conversions}

It is legal to connect a block output to a block input if they are the same type. Most other connections are also permissible, which result in the conversions as described in the table below. An <img src="/images/streaming-analytics/analytics-builder/type-conversion-error.png" alt="X icon" style="display:inline-block; margin:0"> indicates that a connection is not legal; trying to deploy a model with such a wiring connection will fail.

<table>
<thead>
  <tr>
    <th colspan="2" rowspan="2"></th>
    <th colspan="5">From block with output type</th>
  </tr>
  <tr>
    <th>pulse</th>
    <th>boolean</th>
    <th>float</th>
    <th>string</th>
    <th>any</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="5"style="width: 10%;"><b>Connect to input of type</b></td>
    <td style="width: 10%;"><b>pulse</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>pulse occurs when output changes to true</td>
    <td>pulse occurs when output changes value</td>
    <td>pulse occurs when output changes value</td>
    <td>pulse occurs when output changes value (excluding changes to false)</td>
  </tr>
  <tr>
    <td><b>boolean</b></td>
    <td>true when the pulse has occurred, otherwise false</td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>true if non-zero</td>
    <td>true if not an empty string</td>
    <td>true if value non-zero/empty</td>
  </tr>
  <tr>
    <td><b>float</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-error.png" alt="Connection is not legal"></td>
    <td>0 for false, 1 for true</td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-error.png" alt="Connection is not legal"></td>
    <td>permitted if the value is of type float or boolean, other values fail at runtime</td>
  </tr>
  <tr>
    <td><b>string</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-error.png" alt="Connection is not legal"></td>
    <td>"true" or "false"</td>
    <td>number converted to a string (may be in scientific notation)</td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>string value (may be in scientific notation)</td>
  </tr>
  <tr>
    <td><b>any</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
  </tr>
</tbody>
</table>

Only conversions that will always succeed are allowed. String values are not converted to float values; while the input conversion may work sometimes, it cannot be guaranteed to always work.

In many cases, you need not worry about type conversions and where a wire makes sense. Any type conversion that is needed happens automatically.

Some blocks accept different types of inputs, and may change their output type or behavior depending on the input types. For example, the logical **OR** block can operate on either boolean or pulse inputs, and its output is the same as its input types.

In some cases, it is desirable to force a value to be interpreted as a specific type, in which case a converter block can be used to force a conversion to a specific type. For example, the **Pulse** block can convert boolean or float values to pulses, according to the conversions above. This means: for boolean, generate a pulse when the boolean value changes to true; for float, generate a pulse when the value changes. Thus, connecting two float outputs to an **OR** block directly will generate a boolean output which is true when either of the float outputs is non-zero. Alternatively, connecting two float outputs each to a **Pulse** block and from them to the inputs of an **OR** block, will send a pulse whenever either float output changes value. This is the default behavior of the **Pulse** block.

Different types of pulse conversions are possible with the **Pulse** block, depending on the setting of its **Mode** parameter. The conversions in the different modes are described in the table below:

<table>
<thead>
  <tr>
    <th colspan="2" rowspan="2"></th>
    <th colspan="5">From block with output type</th>
  </tr>
  <tr>
    <th>pulse</th>
    <th>boolean</th>
    <th>float</th>
    <th>string</th>
    <th>any</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3"><b>Connect to Pulse block in mode</b></td>
    <td><b>On value change (default)</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>pulse occurs when output changes to true</td>
    <td>pulse occurs when output changes value</td>
    <td>pulse occurs when output changes value</td>
    <td>pulse occurs when output changes value (excluding changes to false)</td>
  </tr>
  <tr>
    <td><b>On every input</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>pulse occurs on every input</td>
    <td>pulse occurs on every input</td>
    <td>pulse occurs on every input</td>
    <td>pulse occurs on every input</td>
  </tr>
  <tr>
    <td><b>On non-zero values</b></td>
    <td><img src="/images/streaming-analytics/analytics-builder/type-conversion-legal.png" alt="Connection is legal"></td>
    <td>pulse occurs on every true input</td>
    <td>pulse occurs on every non-zero input</td>
    <td>pulse occurs on every non-empty input</td>
    <td>pulse occurs depending on value's type as described in cells to the left</td>
  </tr>
</tbody>
</table>

### Processing order of wires {#processing-order-of-wires}

Where a block has multiple inputs connected, all of these inputs are calculated before the block performs any calculations based on the inputs. It may be that the inputs for a block occur out of step with each other \(such as in the example for two temperature sensors in [Value types](/streaming-analytics/analytics-builder/#value-types)\), in which case a block uses the latest value for value type inputs.

Where a single value is sent on two or more paths which both lead to the same block, the block performs calculations based on the latest value for both paths. This ensures consistent behavior when multiple paths to a single block exist. For example:

![Example of a model with different paths to the same block](/images/streaming-analytics/analytics-builder/processing-order.png)

When the device measurement is received, the **Average \(Mean\)** block calculation is completed to generate an average before the **Difference** block computes the difference between the value and its average.

### Wire restrictions {#wire-restrictions}

While a block's output can be connected to multiple other blocks, a block's input can only have a single connection.

It is also legal to leave a block's input or output unconnected if that is not required \(the **Average \(Mean\)** block in the example that is given in [Processing order of wires](/streaming-analytics/analytics-builder/#processing-order-of-wires) does not have anything connected to its **Sample** or **Reset** inputs\).

Wires cannot create cycles. This means, the output of a block cannot be connected to

-   the input of the same block, or to
-   the input of any block that is connected directly or indirectly to one of the source block's inputs.

For example, there are three blocks: Block1, Block2 and Block3. A model would contain a cycle in the following cases:

-   The output of Block1 is connected to the input of Block2, and the output of Block2 is connected to the input of Block1.
-   The output of Block1 is connected to the input of Block2, the output of Block2 is connected to the input of Block3, and the output of Block3 is connected back to the input of Block1.

There are many possible connections which may lead to cycles in the model. The model editor, however, prevents you from creating cycles.

### Block inputs and outputs {#block-inputs-and-outputs}

Many blocks have inputs or outputs that do not have to be used.

Some blocks generate several different outputs, and a model may only require some of the outputs available.

Some blocks have inputs, especially inputs of the `pulse` type, which do not have to be used. Leaving these not connected to anything is fine, and the operation associated with those inputs \(such as **Reset**, see [Common block inputs and parameters](/streaming-analytics/analytics-builder/#common-block-inputs-and-parameters)\) will never be triggered.

Blocks can, when needed, detect which inputs are connected. For example, the **AND** block has five inputs, but it only requires the inputs that are connected to be `true` to generate a `true` output.

### Common block inputs and parameters {#common-block-inputs-and-parameters}

The inputs listed below are the names of common input ports that are shown on the left side of a block.

-   **Value** input

    Most calculation blocks have one main input which is called **Value**. This is the value on which the block performs its main calculation.

-   **Value 1** and **Value 2** inputs

    Blocks may have a number of similar inputs, which may be labeled **Value 1**, **Value 2**, and so on. You can find such inputs with the **Difference** block \(see also the example in [Value types](/streaming-analytics/analytics-builder/#value-types)\) or with the **AND** and **OR** logic blocks. Typically, there is nothing significant as to which input is used.

-   **Reset** input

    Blocks that maintain some internal state may also have a **Reset** input, which is typically a `pulse` type. This does not have to be connected, but can be used to explicitly control on which range of readings a block should perform a calculation. For example, a model that monitors vehicle journeys may reset on the engine starting, which signifies the beginning of a journey. See also [Value types](/streaming-analytics/analytics-builder/#value-types) for an example that illustrates the **Reset** input.

-   **Sample** input and **Output Threshold** parameter

    Blocks typically re-calculate their output when a new input is received. Some blocks may also generate output at some point after receiving an input, either because of time delay parameters set \(for example, with the **Missing Data** or **Time Delay** blocks\), or because their output may change over time even if the input value is constant. For example, the **Integral** block with a positive input generates an ever-increasing output until its window is full \(or indefinitely if no duration has been set, when the block is calculating the integral over an unbounded window\).

    As with real-world sensors, it is not practical to create a continuously changing output. As well as generating an output if their input value changes, such blocks may also have a **Sample** input which triggers the block to re-evaluate and generate a new output, even if the input has not received any new value and the output has not changed by a significant amount. This is useful if there is a specific point in time when the output of the block should be calculated, as its output is going to be used at a later point in the model.

    Alternatively, such blocks may have an **Output Threshold** parameter, which is used to control how frequently the output is re-calculated. When set, the block determines when its output will change by the output threshold, and when that occurs, even if it is not as a result of any new input value, the block generates an output value.

    The **Output Threshold** should be set taking into account what error margins will exist on the input value \(real-world physical sensors have some limited precision and accuracy in the property they are measuring\), and what precision is required in the output.

    Take care to avoid **Output Threshold** values that are too large or too small. If the values are too large, the block does not generate a new output when needed \(unless the **Sample** input is used\). If the values are too small, the block limits how frequently it generates output. If you want to change the values, send a `POST` request to {{< product-c8y-iot >}} that changes the value for the `minimum_wait_time_secs` key. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for detailed information.

    The scale of appropriate values varies depending on what the magnitude of the input value is. If **Output Threshold** is not set, then the block only generates new outputs if it receives an input \(this may be appropriate if it is receiving frequent inputs on the value, or if the **Sample** input is being used\).

-   **Ignore Timestamp** parameter

    For {{< product-c8y-iot >}} measurements, events and alarms, the block by default uses the source timestamp available on the input. The block reorders the input based on the timestamp \(see also [Input blocks and event timing](/streaming-analytics/analytics-builder/#input-blocks-and-event-timing)\), but drops events that are delayed by too much. If this behavior is not desirable \(for example, if a device's clock is not well synchronized, or if data from a device may be delayed\), then you can disable this behavior by selecting the **Ignore Timestamp** parameter. If this is selected, the timestamp of the data is ignored, and the model processes the input data as soon as it is received, regardless of what timestamp it has. This may give different results compared to the default behavior of using timestamps. The behavior which is most desirable will depend on the nature of the device and its connectivity to {{< product-c8y-iot >}}.

    Note that when a model is running in simulation mode, the setting of the **Ignore Timestamp** parameter is ignored. The block will always use the source timestamp, so that when replaying simulation events, the data is guaranteed to be processed in order and this will yield more realistic results \(and there is no record of when the data was received, only the source timestamp\). See also [About simulation mode](/streaming-analytics/analytics-builder/#about-simulation-mode).

### Input blocks and event timing {#input-blocks-and-event-timing}

Input blocks make data from external sources \(such as {{< product-c8y-iot >}} measurements\) available to the model. Many data sources have timestamps on each piece of data, which reports the time that a measurement or event actually occurred. There may be delays in transmitting the data to the Apama system for processing, leading to events being received by Apama out of order.

Data sources with timestamps, such as measurements, can be reordered. Operations, for example, do not have timestamps and are therefore processed as they are received, without reordering.

Analytics Builder delivers several input blocks which consume data sources with timestamps. These blocks provide an **Ignore Timestamp** parameter which allows you to disable data reordering and thus to process the inputs as they are received. See also [Common block inputs and parameters](/streaming-analytics/analytics-builder/#common-block-inputs-and-parameters).

The following table lists the available input blocks and indicates whether they are able to reorder the input:

|Input block          |Reordering is possible|
|---------------------|----------------------|
|Alarm Input          |Yes|
|Event Input          |Yes|
|Managed Object Input |No|
|Measurement Input    |Yes|
|Operation Input      |No|
|Position Input       |Yes|

{{< c8y-admon-info>}}
The **Position Input** block is a specialized **Event Input** block. You can also use the **Cron Timer** block to activate a model periodically. Unlike the above blocks, the **Cron Timer** block is not associated with a device and can be found in the **Utility** category of the palette.
{{< /c8y-admon-info>}}

For data sources that have timestamps associated with a piece of data, the input block can handle events received out of order. In order to do this, the input blocks hold all received events in a reorder buffer and delay processing them until a predefined delay time after their source timestamp. By delaying the processing of the event relative to the source timestamp, the input block allows events to be reordered. The key parameter to this process is the amount of time by which the events are delayed. To configure the time in seconds by which the input blocks delay inputs, send a `POST` request to {{< product-c8y-iot >}} that changes the value for the `timedelay_secs` key. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for detailed information.

The input blocks assume that while events may be delivered out of order, they are received by Apama within the defined time delay value. If an event is received after a delay of more than the defined number of seconds \(that is, the difference between the timestamp in the event and the time on the system running Apama\), then it is dropped if an event for the same timestamp or a more recent timestamp has already been processed by the model. Thus, it is possible that an old event might be processed by one model but dropped by another model.

If the time delay value is set too low, then a small delay may result in Apama dropping an event, which can lead to erroneous results. The higher the time delay value is, the larger is the delay before an event is processed. Thus, it is important to pick a suitable value for the time delay to match the environment for events being delivered into Apama.

The correlator logs the number of dropped events periodically to the log file. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for configuring logging throttling and [Log files of the Apama-ctrl microservice](/streaming-analytics/troubleshooting/#logfiles).

### Output blocks and event timing {#output-blocks-and-event-timing}

Output blocks make data \(such as {{< product-c8y-iot >}} measurements or operations\) from the model available to external systems \(such as {{< product-c8y-iot >}}\). Outputs blocks can either produce synchronous or asynchronous values.

The values from an output block which generates synchronous output \(such as measurements\) can also be consumed by another model in a time-synchronous manner and can be processed by the model with any other data from the same timestamp. See also [Connections between models](/streaming-analytics/analytics-builder/#connections-between-models).

The values from an output block which generates asynchronous output can also be consumed by another model, but only in a time-asynchronous manner when data is received back from the external system.

The following table lists the available output blocks and indicates whether the output is synchronous or asynchronous:

|Output block          |Type of output|
|----------------------|--------------|
|Alarm Output          |Synchronous|
|Event Output          |Synchronous|
|Managed Object Output |Asynchronous|
|Measurement Output    |Synchronous|
|Operation Output      |Asynchronous|

### Fragment properties on wires {#fragment-properties-on-wires}

Each wire has a primary value that is of the type of the wire: one of `float`, `boolean`, `string` or `pulse`.

In addition to this, some blocks may provide other fragments of information alongside the value. These are named properties on the value. They may be other pieces of information provided from an input block, such as the unit in which a measurement is measured, or some extra contextual information for a data source.

Most blocks only operate on the primary value from their input wires, but some blocks can make use of these fragment properties values and extract them into separate output ports \(for an example, see the **Extract Property** block\). This gives more flexibility in processing more complex data from external sources.

### Keys for identifying a series of events {#keys-for-identifying-a-series-of-events}

Input and output blocks identify a series of events by specifying a key for the series \(or stream\) of events. This series of events is used to identify correct events to deliver to an input block. The key is made up of multiple block parameters, and identifies that series of events distinct from other series of events through the same block type. For example:

-   For `Measurement` object input and outputs, the key is the device, the fragment, and the series. The **Unit** parameter specified in an output block is not considered part of the key \(it is for information only\) and is not required to match the parameters of the **Measurement Input** block.
-   For `Event` objects, the key is the device and the event type.
-   For `Alarm` objects, the key is the device and the alarm type.

{{< c8y-admon-important>}}
In Analytics Builder, for synchronous output types such as measurements, events and alarms \(see also [Output blocks and event timing](/streaming-analytics/analytics-builder/#output-blocks-and-event-timing)\), it is allowed to have more than one output block that generates output with any given key.
As there can be connections between the models, ambiguities may occur while processing events in the input blocks if there are multiple output blocks (in different models) generating the same output stream at the same point in time. When using output blocks, ensure that no two blocks generate output of the same stream type at the same time.
{{< /c8y-admon-important>}}
