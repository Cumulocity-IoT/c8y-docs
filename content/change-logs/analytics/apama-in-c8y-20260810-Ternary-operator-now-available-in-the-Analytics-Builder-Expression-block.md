---
date: 
title: Ternary operator now available in the Analytics Builder Expression block
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-1938
version: 27.209.0
---

The [Expression](/streaming-analytics/block-reference/#expression) block in Analytics Builder now supports a ternary conditional operator: `<condition> ? <trueValue> : <falseValue>`. `<condition>` must be of type `boolean`, and `<trueValue>` and `<falseValue>` must be of the same type. Only the branch selected by `<condition>` is evaluated.
