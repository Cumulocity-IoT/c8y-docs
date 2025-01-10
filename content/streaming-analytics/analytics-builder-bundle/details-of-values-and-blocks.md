---
weight: 70
title: Details of values and blocks
layout: redirect
---

### Introduction {#introduction}

Analytics Builder provides an environment for connecting blocks together to form models that can process and react to inputs. Analytics Builder uses a few types of values internally, and it is important to understand the differences between these. The following topics cover the distinctions between value types representing continuous-time and discrete-time values, and the `pulse` type. They also cover some of the details of block implementations around windowing and when blocks generate output.

#### Summary {#summary}

In Analytics Builder, the value types `float`, `boolean`, and `string` are used to represent continuous-time values. They have the following properties, which you should consider when writing models or creating custom blocks:

-   A value wire holds its value until there is new input.
-   Repeated inputs of the same value should not affect the output \(for most cases\).
-   There is no guarantee that a new input will occur within a defined time period.

Contrast these to the `pulse` type, which represents discrete events and has the following properties:

-   A pulse represents a single point in time.
-   Multiple inputs of a pulse have significance, even if there is no difference to any value associated with the pulse.
-   If a block has multiple input ports for pulses, inputs occurring at different times to different ports will only be “seen” one at a time. An input port for a pulse on a block acts as if it is automatically “reset” after evaluation.

These properties and the rationale behind them are explored and explained in the following topics. These topics also explain how to handle cases that do not fit into these distinctions, such as discrete numeric measurements.

### Values as representations of continuous-time physical quantities {#values-as-representations-of-continuous-time-physical-quantities}

A continuous-time value type, especially of the `float` \(that is, numeric\) type, is typically used to represent the measurement of some continuous physical quantity or property by a sensor. For example, a value may represent one of the following:

-   The pressure in a pipe.
-   The temperature measured by a thermometer.
-   The rotational speed of an axle.
-   The position of an object.

These are all continuous measurable properties which are analog in nature. There will be some degree of precision as to how accurately they can be measured in both time and value \(and within physical limits\). By time accuracy, we mean how frequently a measurement can be made and how precisely the time of the measurement is recorded. There may also be latency - a delay between a change in the actual property and when that can be measured. By value accuracy, we mean with what level of precision the value can be measured - typically at least 2 significant figures, and rarely more than 4 or 5 significant figures of precision can be distinguished. By continuous, we mean that it is valid to measure the property at any point in time.

Taking discrete measurements at different times rather than continuously may be referred to as “sampling” \(see also [https://en.wikipedia.org/wiki/Sampling\_\(signal\_processing\)](https://en.wikipedia.org/wiki/Sampling_(signal_processing))\), and limits as to the value precision may be referred to as “quantization error” \(see also [https://en.wikipedia.org/wiki/Quantization\_\(signal\_processing\)](https://en.wikipedia.org/wiki/Quantization_(signal_processing)\)\). When measuring a continuous value, the rate at which measurements are obtained should not make significant differences to the output of a block or a model. More measurements may give a more accurate output, but should not make a gross change to calculations.

For example, a sensor measuring the rotational speed of an axle may be able to provide a new measurement every one tenth \(0.1\) of a second, and only measure in the range 0 to 10000 rpm to the nearest 50 rpm. A change of 10 or 20 rpm may not result in any change of measured value, as the change is less than the level of precision. Applying brakes to a rotating axle to stop it may not be detected immediately, but result in one reading of 1000 rpm, followed by a reading 0.1 seconds later at 0 rpm after the axle has stopped \(while the axle would take a few tens of milliseconds to stop, slowing down over that time period\).

A sensor may be connected in such a way that it provides a new measurement at a regular frequency \(for example, audio sampling at 8,000 Hz or a camera taking video at 50 frames a second\). This is a regular sampling input.

A simple and common optimization is that a sensor or device may generate a new measurement value only if the value is different to the previous value. For many sensors, it would be normal to measure something that often maintains a steady or constant value \(at least to within the quantization limit\), and there is little value in repeatedly sending the same value. This is an on-change input. There will still be an underlying sampling frequency, but new values are only transmitted from the sensor if they are different.

It is also possible to combine the regular sampling and on-change forms together: a sensor that generates a new input if the measurement is different, or periodically. This is a hybrid input. For example, the rotational sensor described above may only send a value if the rotation speed changes, or every 10 seconds regardless.

As an example, consider a raw value that changes over time as so:

![Graph of raw value](/images/streaming-analytics/analytics-builder/raw-value.png)

But suppose the sensor can only measure to the nearest whole number, and only once a second. The value thus has some error, shown by the red error bars:

![Graph of raw and sampled value](/images/streaming-analytics/analytics-builder/raw-and-sampled-value.png)

A regular sampling sensor would generate uniform inputs:

![Graph of raw and interpreted data regularly sampled](/images/streaming-analytics/analytics-builder/raw-and-interpreted-data-regularly-sampled.png)

While an on-change sensor would generate inputs only when a value changes:

![Graph of raw and interpreted data sent on change only](/images/streaming-analytics/analytics-builder/raw-and-interpreted-data-sent-on-change-only.png)

The grey line shows how a real-time processing system such as Apama interprets such values. A value is assumed to maintain the latest value until it is replaced by a newer value. It is also common to draw lines between measurements. So there is a straight line decreasing from value 11 at 00:01 to value 9 at 00:19. However, a real-time system cannot do this. It does not know what the next value is, whereby viewing historic data can interpolate between values. At time 00:19.5, the only information it has is that the value was 11 and then 9. It does not yet know that the value will be 8 at time 00:20. Note that there is no difference between the interpreted grey line in the regularly sampled and on-change-only case. Note that in the middle of the graph, there is a significant quantization error \(the `true` value of 10.6 is read as 11\), and the sampling frequency of only once a second means that the minimum point of 7.4 at 00:19.5 seconds is lost.

#### Input values at different times {#input-values-at-different-times}

Consider two position sensors which give the position of two robot arms, and both are on-change sensors. If the two arms move together in unison in the same direction and speed, then the position sensors should update to new values at the same time such that they are a constant distance apart \(or at least, close to a constant distance\). If the **Difference** block has inputs connected to both sensors, then even if the robot arms move, the output of the **Difference** block should be approximately constant. Analytics Builder evaluates all values with the same timestamp, so even though there may be a small delay in receiving the values from the two sensors, provided they supply timestamps from the same clock \(and the **Ignore Timestamp** parameter of the **Measurement Input** block is not set\), then the **Difference** block will always generate a synchronized output, as shown in the table below:

|Time|Position sensor 1|Position sensor 2|Output of the **Difference** block|
|----|-----------------|-----------------|----------------------------------|
|00:00|4|14|10|
|00:01|6|16|10|
|00:02|9|19|10|

By contrast, consider if the two robot arms do not move in unison - one moves, then another. The distance between the arms may vary as either arm moves. As the sensors are on-change inputs, there will only be a new value when the position changes. However, the absence of an input does not mean that the corresponding robot arm does not have a position. It has remained where it is \(within error margins\). For example:

|Time|Position sensor 1|Position sensor 2|Output of the **Difference** block|
|----|-----------------|-----------------|----------------------------------|
|00:00|9|19|10|
|00:01|11|**19**|8|
|00:02|13|**19**|6|
|00:05|**13**|18|5|
|00:06|**13**|17|4|
|00:07|**13**|15|2|

The bold numbers indicate the effective value. The last value latches if it has not been replaced by a more up-to-date value.

#### On-change inputs and time windows {#on-change-inputs-and-time-windows}

If an on-change input is connected to an aggregate block such as the **Average \(Mean\)** block, then the block should treat the input as continuously having the most recent value it received. This is significant for blocks that maintain a time window. Even if the block last received an input \(and thus had its `$process` action called\) more than the time window ago, the contents of the window will contain the most recent value. For example, consider the **Average \(Mean\)** and **Integral** blocks with window duration set to 10 seconds, and input as so:

|Time|Input value|Window contents|Output of the **Average \(Mean\)** block|Output of the **Integral** block|
|----|-----------|---------------|----------------------------------------|--------------------------------|
|00:00|10|0: 10|10|0|
|00:02|11|0-2: 10|10|20|
|00:10|**11**|0-2: 10, 2-10: 11|10.8|108|
|00:12|**11**|2-12: 11|11|110|
|00:19|9|9-19: 11|11|110|
|00:20|8|10-19: 11; 19-20: 9|10.8|108|

In this case, note how a measurement received at time 00:02 still has influence on the output at 00:19 and later - because it is not replaced until 00:19. Also note that when a new value occurs, it has zero influence on the average or integral - it has not been that value for any time yet. The only exception is for the **Average \(Mean\)** block when it starts - with an empty window, the output is the input value.

Also refer to the diagram below for what values the window covers at time 00:20:

![Window compared to samples and actual value](/images/streaming-analytics/analytics-builder/window-compared-to-samples-and-actual-value.png)

While only the measurement updates with values 9 and 8 were received within the window, the average value within the window is close to the 11 value. The measurement update for that was received at time 00:02, but as it is a continuous value, it continues to hold the 11 value until time 00:19.

Note that for a block such as **Missing Data**, the absence of input for some time may affect the behavior of the block. If the **Missing Data** block is configured with a 10 second duration, then it would trigger at time 00:12.

If the **Average \(Mean\)** and **Integral** blocks receive a regular input from a regular sampling sensor, then the block will receive more measurement values, and the comparable table is:

|Time|Input value|Window contents|Output of the **Average \(Mean\)** block|Output of the **Integral** block|
|----|-----------|---------------|----------------------------------------|--------------------------------|
|**00:00**|**10**|**0: 10**|**10**|**0**|
|00:01|10|0-1: 10|10|10|
|**00:02**|**11**|**0-2: 10**|**10**|**20**|
|00:03|11|0-2: 10, 2-3: 11|10.333|31|
|00:04|11|0-2: 10, 2-4: 11|10.5|42|
|00:05|11|0-2: 10, 2-5: 11|10.6|53|
|00:06|11|0-2: 10, 2-6: 11|10.667|64|
|00:07|11|0-2: 10, 2-7: 11|10.714|75|
|00:08|11|0-2: 10, 2-8: 11|10.75|86|
|00:09|11|0-2: 10, 2-9: 11|10.778|97|
|**00:10**|**11**|**0-2: 10, 2-10: 11**|**10.8**|**108**|
|00.11|11|1-2: 10, 2-11: 11|10.9|109|
|**00:12**|**11**|**2-12: 11**|**11**|**110**|
|00:13|11|3-13: 11|11|110|
|00:14|11|4-14: 1|11|110|
|00:15|11|5-15: 11|11|110|
|00:16|11|6-16: 11|11|110|
|00:17|11|7-17: 11|11|110|
|00:18|11|8-18: 11|11|110|
|**00:19**|**9**|**9-19: 11**|**11**|**110**|
|**00:20**|**8**|**10-19: 11; 19-20: 9**|**10.8**|**108**|

Note that the highlighted lines are the same as without the repeated measurements. Repeated measurements of the same value received by these blocks make no difference to what the block would calculate if re-evaluated.

### Window block output timings {#window-block-output-timings}

For aggregate blocks such as the **Average \(Mean\)** block, the effect of a change of input value means that, if regularly re-evaluated, the output of the block will change, approaching the new value. If there have been different input values received by the block in the past, then a re-evaluation of the block at any point in time is possible, and each may generate a different output.

With the previous example from [On-change inputs and time windows](/streaming-analytics/analytics-builder/#on-change-inputs-and-time-windows), repeatedly re-evaluating an **Average \(Mean\)** block with a 10 second window will yield the following:

|Time|Input value|Output of the **Average \(Mean\)** block|
|----|-----------|----------------------------------------|
|00:00|10|10|
|00:01|10|10|
|00:02|11|10|
|00:03|11|10.333|
|00:04|11|10.5|
|00:05|11|10.6|
|00:06|11|10.667|
|00:07|11|10.714|
|00:08|11|10.75|
|00:09|11|10.778|
|00:10|11|10.8|
|00.11|11|10.9|
|00:12|11|11|

It would also be possible to re-evaluate the block every half a second, or any fraction of a second - to milliseconds or even smaller times between re-calculations. It is impractical to “continuously” re-evaluate the block \(to re-calculate the average value at a given point in time and generate a new output\). So when is an appropriate time for the block to evaluate and generate an output?

The **Average \(Mean\)** block \(and others\) provide an **Output Threshold** parameter. If this is set, then the block emulates a sensor which generates a new measurement reading if the output changes by the output threshold amount. Thus, if set at 0.1, we get several outputs between 00:02 and 00:03 \(when the output is changing from 10 to 10.333\), another output between 00:03 and 00:04 \(when it reaches 10.4\), outputs at 00:04 and 00:05 exactly, another between 00:06 and 00:07 \(10.7\), then at 00:10 and 00:11 and 00:12. The block calculates at what time the output would vary by more than the output threshold compared to the most recent output, and re-evaluates at that point in time. Thus, the output may occur quite irregularly in time, but output at times such that the values output always differs by an amount equal to the output threshold. The block also re-evaluates on any new inputs, even if there is not a different value to the last input.

As models may wish to perform a calculation with the output of the **Average \(Mean\)** block at any point in time \(for example, to compare to another measurement\), a **Sample** input port is also provided, to force a re-evaluation and generate an output value.

#### Windows and buckets {#windows-and-buckets}

A number of blocks, primarily those in the **Aggregate** category, maintain a time-based window of input values received in the past. Their output is a calculation based on values within this window. Typically, such blocks offer two distinct ways of managing this window:

-   A parameter value specifying the duration of the window. If set, the window automatically expires interpreted values older than the time specified \(where interpreted values are the latest received value at any point in time, as described in [On-change inputs and time windows](/streaming-analytics/analytics-builder/#on-change-inputs-and-time-windows)\). If the parameter is not specified, then the block does not automatically expire any data.
-   A reset input. When a signal is received, the contents of the window is cleared and the block resets to having no contents.

It is possible to use these in combination, or neither, but more typically one or the other.

For the case of the window duration being specified, the block must be able to expire old data. A strictly exact implementation of this would be to store each different measurement input along with the time it occurred. For long windows and/or high frequency inputs, this can result in a large amount of data being stored. To avoid an excessive amount of data being stored, the product blocks do not store all measurement values and times. Instead, the window duration is divided into equal-size buckets. The blocks store state per bucket and use that information to re-calculate the output of the block. A historic bucket can either be completely within the window or be partly expired. If a bucket is partly expired, then the block applies a fractional proportion of the values within that bucket. The practical effect of this is that if the value is changing without significant fluctuations, there is only small difference between an exact \(but more resource-intensive\) implementation of the block and one that uses buckets. If there is a significant fluctuation in the input value that causes a shift in the output, then the exact time of individual measurement inputs is lost, and the effect that the significant value has as it expires will be spread in time by up to one bucket duration. The product blocks use 20 buckets as a reasonable compromise between accuracy and efficiency.

To illustrate this, we exaggerate the effect by simulating an **Average \(Mean\)** block with 3 buckets and a 3 second window, so each bucket is 1 second in duration. A few anomalous readings \(after a continuous input of value 1\) affect the average for both exact and bucket-based **Average \(Mean\)** blocks in the same way, but we can compare the result of “exactly” expiring each value exactly 3 seconds after it occurred with using buckets, where the change in output is smoothed over the bucket duration:

![Average (Mean) block with 3 x 1 second buckets](/images/streaming-analytics/analytics-builder/average-block-with-3x1-second-buckets.png)

Note that not only is the timing of the expiry of the anomalous values less precise, the exact shape of the output is lost. The bucketed average changes uniformly between time 00:13 and 00:14. Remember, the product blocks use 20 buckets, so the effect would be less pronounced in this case.

### Pulse signals {#pulse-signals}

A pulse is used to signal a point in time or a change of state. Examples of use cases for pulses are:

-   A person goes through a gate \(for example, at a train station\).
-   A button is pressed \(for example, an emergency stop button\).
-   A machine goes into a new state \(for example, a gateway is reset or powered on\).
-   A device has made a connection to the network.

In {{< product-c8y-iot >}}, [events](/concepts/domain-model/#events), [alarms](/device-integration/fragment-library/#alarms) and [operations](/concepts/domain-model/#operations) are used as the sources of pulses.

A pulse may be merely a point in time, but it can also convey extra information, for example, the version number of the software or which network node it has connected to. These can be obtained using the **Extract Property** block. If you are writing your own custom blocks, these are accessible if the input is declared as a `Value` type, which has a properties field. This can be used with numeric value types as well. See the documentation for the Analytics Builder Block SDK for more information on the `Value` type.

In contrast to measurement values, the timing and number of pulses is very significant, and even though the only difference between subsequent pulses may be the time they were received, each is still significant \(whereas multiple measurements with the same value are of little interest\).

In contrast to measurement values, a pulse is only active for a single evaluation of a model, where a model evaluation processes all blocks that have a timer that fires \(including input blocks\) and any blocks connected to outputs that have changed. While both pulses and boolean measurement values are represented by the `boolean` type in the EPL of the blocks, their behavior is different:

-   If a boolean measurement value is received by a block, it will “stick” to its value until replaced. For example, if looking at whether temperature sensors 1 and 2 are both over a threshold using an **AND** block, that value is still true after receiving high measurements.
-   If a pulse is received by a block, it is reset after it is evaluated. For example, if an **Average \(Mean\)** block is reset by an event, then the reset happens when the event is received. After that, if no further event is received, the block is not reset on future value inputs.

It is still valid and sensible to combine multiple pulses, for example, with an **AND** block. If two pulses occur at the same point in time, that will be a single evaluation. For example, the **Threshold** block has a **Crossed Threshold** output port which is a pulse that is sent only when a continuous value input goes from one side of the threshold value to another. Two sensors on the same device \(thus with the same timestamp\) may cross thresholds at the same time, so the **AND** of the output of two such thresholds will only trigger if both inputs cross the threshold with new values of the same timestamp. Note that if one sensor crosses the threshold and then later the other sensor, the blocks below would never give an output from the **AND** block. They would only do this if the two occurred at the same time.

![Example model with an AND block](/images/streaming-analytics/analytics-builder/pulse-example.png)

### Discrete-time measurements {#discrete-time-measurements}

There are some cases where a measurement would be used where a numeric measurement value does not represent a continuous-time property. For example:

-   The weight of parcels passing a weighing machine on a conveyor belt.
-   The size of objects passing a measuring point.
-   The value of a ticket scanned or printed by a machine.

In contrast to the continuous-time values, each of these are significant, even if two measurements are of the same value. The time of each measurement may have some significance, but the time between subsequent measurements is of no great significance. If the measurements were received with slightly different timings, or even potentially out of order, this would not signify a difference \(for example, the sum of the value of tickets does not change if they are processed in a different order or with different timings, and the time between values is unlikely to be uniform\). Note that by discrete-time we are only referring to the time of the measurements. The value may still be continuous. For example, weight is a continuous value, but we may weigh individual parcels - while the weight of a parcel may be representable to fractions of a gram of weight. If we are between two parcels on a conveyor belt, there is no “current” value for the weight of the parcel at that point. The value could also be discrete. For example, the ticket value would typically be a discrete value \(for example, to the nearest cent, or one of a few predefined ticket values\).

Compare also: [https://en.wikipedia.org/wiki/Discrete\_time\_and\_continuous\_time](https://en.wikipedia.org/wiki/Discrete_time_and_continuous_time) and [https://en.wikipedia.org/wiki/Continuous\_or\_discrete\_variable](https://en.wikipedia.org/wiki/Continuous_or_discrete_variable). In practice, all measurements are samples of a continuous-time property.

When dealing with discrete-time inputs, you should use the **Discrete Statistics** block rather than the **Average \(Mean\)** block. While it is possible to connect an input from a parcel weight sensor to the **Average \(Mean\)** block, the **Average** block weights by time. For example:

|Time|Input value|Average of continuous-time input|Average of discrete-time input|
|----|-----------|--------------------------------|------------------------------|
|00:10|11|11|11|
|00:19|9|11|10|
|00:20|8|10.8|9.33|

Compare this to the table in [On-change inputs and time windows](/streaming-analytics/analytics-builder/#on-change-inputs-and-time-windows), looking at times 00:10 onwards \(that is, what would be in a window from 00:10 to 00:20\). Note that the continuous-time block would generate a different output if the inputs occurred at different times, while a block averaging values based on discrete-time would not.

Note that by default measurements are treated as continuous-time values. So it is possible, for example, to calculate the difference between two values:

![Example showing a Difference block](/images/streaming-analytics/analytics-builder/discrete-time-example.png)

The above example gives the difference between the most recent weight received by two sensors. This may not be a particularly useful distinction if these are genuinely discrete-time inputs. However, it can make sense to compare the difference of averages \(or means\) between two discrete-time inputs. The **Average** output port of the **Discrete Statistics** block gives a continuous-time value:

![Example showing two Discrete Statistics blocks and a Difference block](/images/streaming-analytics/analytics-builder/discrete-time-example-discrete-statistics.png)
