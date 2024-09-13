---
date:
title: Alarm Input and Event Input blocks no longer use incorrect source time for alarm and event updates
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4559
version:
---
Previously, the **Alarm Input** and **Event Input** blocks did not use the the correct source time when the **Ignore Timestamp** checkbox was not selected. Instead, the creation time of the block was used to schedule the input events.
This has been fixed and update alarms and events are not missed by the model. When the **Ignore Timestamp** checkbox is not selected, the input blocks now use the last update time of the block to schedule the input events in case of update operations.
