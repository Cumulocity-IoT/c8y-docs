---
date: 2023-12-06
title: Receive input from all input sources
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
version: 24.18.0
---
The Analytics Builder input blocks can now be configured to receive inputs from all input sources. You can simplify global tasks by creating a single Analytics Builder model that works with inputs from all input sources, for example, send an email for every critical alarm of type `C8Y_TemperatureAlarm` that is generated, regardless of the device that generated the alarm. A new **All Inputs** option is available for this purpose.
When you add a new block to your model or when you edit the parameters of a new template instance, the **All Inputs** option is now set by default. See also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block).

You can also use the new **All Inputs** option in the replace dialog box when replacing input sources. Keep in mind that the replace dialog box is used for both input blocks and output blocks. So when you replace a device with the new **All Inputs** option, all matching output devices are automatically changed to trigger devices.
See also [Replacing sources or destinations](/streaming-analytics/analytics-builder/#replacing-sources-or-destinations).

A new Analytics Builder sample named "Aggregate measurements per input source" is now available, which creates new measurements that average the measurement values for each input source that has a specified fragment and series. This is a simple sample that creates a model without template parameters, so you can activate the model directly in the model manager. See also [The Samples tab](/streaming-analytics/analytics-builder/#the-samples-tab).
