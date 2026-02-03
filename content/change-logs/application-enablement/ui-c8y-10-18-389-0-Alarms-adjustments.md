---
date: 2023-12-06T14:19:06.224Z
title: Alarms adjustments
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-54596
version: 10.18.389.0
---
The data points graph now displays alarms using either its <code>firstOccurrenceTime</code>, <code>time</code> or <code>creationTime</code> attribute instead of only using <code>creationTime</code>.
<br>Alarms are now displayed with a minimum width of one pixel, to assure that alarms with a very short duration, for example, alarms created with a CLEARED status, are displayed.
<br>The alarm tooltip in the data points graph now displays the <code>lastUpdated</code> timestamp in the user's timezone and format.
