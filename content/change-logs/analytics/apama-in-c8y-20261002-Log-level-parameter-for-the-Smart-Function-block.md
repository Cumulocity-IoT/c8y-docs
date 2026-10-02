---
date: ""
title: New Log level parameter for the Smart Function block
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
ticket: PAB-5353
version: ""
---

To keep the log of the Apama-ctrl microservice readable, you can now control how much `console` output the [Smart Function](/streaming-analytics/block-reference/#smart-function) block writes to the log. The block, which is in Public Preview, has a new **Log level** parameter with the values `OFF`, `ERROR`, `WARN`, `INFO`, and `DEBUG`.

{{< c8y-admon-important >}}
The default is `WARN`. In existing models, the `console.log`, `console.info`, and `console.debug` output of the block is therefore no longer written to the log. To see the `console.log` and `console.info` output again, set the **Log level** parameter to `INFO`. Uncaught errors are always written.
{{< /c8y-admon-important >}}

For details, see [Viewing logs in the Streaming Analytics application](/streaming-analytics/troubleshooting/#logs-view).
