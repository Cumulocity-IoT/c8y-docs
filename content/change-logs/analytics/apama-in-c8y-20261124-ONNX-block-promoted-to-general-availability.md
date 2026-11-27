---
date:
title: ONNX block in Analytics Builder is now generally available
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
ticket: PAB-5480
version: <FIRST apama-in-c8y VERSION THAT CONTAINS THE GA CHANGE>
---

The [ONNX](/streaming-analytics/block-reference/#onnx) block, previously released in [Public Preview](/change-logs/?component=.component-M5-cepIIS#apama-in-c8y-20260211-add-onnx-block-in-public-preview), is now Generally Available (GA).

The block is available in the Analytics Builder palette by default and no longer requires the preview blocks feature to be enabled. The block has moved from the **Calculation** section of the palette to the new **AI/ML** section, which holds the blocks for artificial intelligence and machine learning.

The block now behaves differently in the following ways:

- The block downloads and checks the ONNX model when you activate the analytic model. If the file is missing, corrupt, or larger than the size limit, the analytic model does not activate and shows the reason. The default size limit is 100 MB.
- A run of the ONNX model that fails, or that does not finish within the time limit, makes the analytic model fail and shows the reason. The output no longer has an `error` property. Remove any check of this property from your models. The default time limit is 1 second.
- If the input does not have a property for every input of the ONNX model, the block does not run the ONNX model and sends no output. Previously, the output had an `error` property in this case.
- If several files in the files repository have the same name, the block uses the most recently updated file.

Models that already use the ONNX block continue to work if every run of the ONNX model succeeds. See [Running ONNX models](/streaming-analytics/analytics-builder/#running-onnx-models) for the limits, the supported data types, and how the block handles its inputs.
