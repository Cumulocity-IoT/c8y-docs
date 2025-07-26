---
date: ""
title: Fixed issue with wrong device source for alarms and events when using type dashboards.
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
ticket: MTM-63946
version: 1022.9.4
---
In some cases, alarms and events were incorrectly associated with the wrong device for device type dashboards, leading to confusion and difficulties in troubleshooting. This issue has now been resolved. Alarms and events will be correctly linked to the originating device, ensuring accurate tracking and analysis. This change improves the reliability and usability of the alarm and event management system for all users.