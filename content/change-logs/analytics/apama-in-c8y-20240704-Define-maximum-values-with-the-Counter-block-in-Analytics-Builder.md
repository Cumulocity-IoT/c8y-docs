---
date: 
title: Define maximum values with the Counter block in Analytics Builder
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
ticket: PAB-4093
version:
---
The **Counter** block in the Analytics Builder model editor has been updated to allow you to set a maximum value for each counter independently. This change was made because it was difficult and cumbersome to create periodic behavior in Analytics Builder, and it gives more control over counting in general.
The following new parameters are available for this purpose:

- **Maximum Count** (input field)
- **Loop Count** (check box)
- **Maximum Number Same** (input field)
- **Loop Number Same** (check box)

The counter in question can then loop. Depending on the setting of the corresponding check box, the counter either resets its corresponding output port (**Count** or **Number Same**) to zero when reaching the maximum value, or it stops counting when reaching the maximum value and must then be reset manually.
The existing behavior remains as the default.
Note that the **Reset** input port resets both counters. If this is a problem, you must use a separate **Counter** block for each counter.
See the description of the [Counter](https://cumulocity.com/docs/streaming-analytics/block-reference/#counter) block for detailed information on the new parameters.
