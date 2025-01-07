---
date: 2024-09-21
title: Alarm Input and Event Input blocks no longer use incorrect source time for alarm and event updates
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
ticket: PAB-4559
version: 25.252.0
---
Previously, the **Alarm Input** and **Event Input** blocks did not use the the correct source time for an update operation when the **Ignore Timestamp** checkbox was not selected. Instead, the creation time of the block was incorrectly used to schedule the input events.
This has been fixed and alarm and event updates are no longer missed by the model. When the **Ignore Timestamp** checkbox is not selected, the input blocks now use the last update time of the block to schedule the input events in case of update operations.
