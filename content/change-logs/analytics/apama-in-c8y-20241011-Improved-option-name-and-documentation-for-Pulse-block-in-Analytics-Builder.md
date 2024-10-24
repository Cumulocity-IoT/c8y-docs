---
date:
title: Improved option name and documentation for Pulse block in Analytics Builder
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
ticket: PAB-3201
version:
---
To improve the user experience in Analytics Builder, the **On value change** option of the **Mode** parameter in the [Pulse](https://cumulocity.com/docs/streaming-analytics/block-reference/#pulse) block has been renamed to **On value change (excluding to false)**. In addition, the block reference has been updated to clarify that for a boolean input, a pulse is only sent when the input changes to `true` (not `false`).
