---
date: 
title: Time-based window for the Discrete Statistics block in Analytics Builder
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-1974
version: 27.248.0
---

The **Discrete Statistics** block has a new optional **Window Duration (secs)** parameter. Set it to report statistics over the samples received within that duration, instead of over every sample since the model started.

A sample leaves the window once it is older than the window duration. Every sample in the window counts equally, however long it has been there, and the time between samples does not affect the result. The **Reset** input port clears the window.

The block generates output as samples leave the window, even when no new input arrives. If no new inputs arrive, the block generates output each time the oldest remaining samples expire, until the window is empty.

When the window is empty, the block outputs zero for the sum and the count, and not-a-number (NaN) for the average, standard deviation, minimum, and maximum. The sampling standard deviation needs at least two samples. If you connect the **Sample** input port, the block outputs NaN for the standard deviation whenever the window holds fewer than two samples.

The window is an approximation. The block divides the window duration into 20 buckets and discards a whole bucket at a time, so a sample stays in the window for the window duration plus up to one bucket duration, and never less. See [Windows and buckets](/streaming-analytics/analytics-builder/#windows-and-buckets) for detailed information.

The window duration must be at least 20 times the `minimum_wait_time_secs` value configured for your tenant, which by default makes 2 seconds the shortest window you can set. A shorter window makes the model fail with a validation error. See [Configuration](/streaming-analytics/analytics-builder/#configuration) for detailed information.

If you leave **Window Duration (secs)** empty, the block keeps every sample since it started or was last reset, as before.

{{< c8y-admon-important >}}
This release also changes the **Standard Deviation** output port for existing models that connect the **Sample** input port. When the block has fewer than two samples, the port now sends NaN. Previously it sent no value at all. Check that a NaN value on this port does not affect the rest of your model.
{{< /c8y-admon-important >}}

See the description of the [Discrete Statistics](/streaming-analytics/block-reference/#discrete-statistics) block for detailed information.
