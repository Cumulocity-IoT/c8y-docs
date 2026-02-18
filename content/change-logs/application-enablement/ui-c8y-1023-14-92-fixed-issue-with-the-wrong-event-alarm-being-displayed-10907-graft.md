---
date: ""
title: fixed issue with wrong event or alarm text being displayed in data graph or data explorer chart.
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65902
version: 1023.14.92
---
When viewing events or alarms in the data explorer or data graph chart, there was an issue where incorrect events or alarms text could be displayed to users, potentially causing confusion when monitoring device data or troubleshooting issues. This has been corrected, and the chart now properly displays the correct event or alarm text corresponding to the selected item.