---
date: 2023-12-06
title: Additional value types for the Constant Value block
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
The [Constant Value](/streaming-analytics/block-reference/#constant-value) block in Analytics Builder now supports `float` and `boolean` value types
and can produce output of these types. This enables the block's output to be consumed by other blocks that take input of type `float` or `boolean` like the blocks in
the **Logic** and **Aggregate** categories. The **Type** parameter is also now optional. If a type is not selected, the type of the output value is inferred from the **Value** parameter.
