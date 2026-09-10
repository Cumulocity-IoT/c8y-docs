---
date: ""
title: Event list widgets without a date filter show all events again
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
ticket: MTM-67664
version: 1023.14.212
---
"Event list" widgets saved without a date configuration were migrated to a "Last hour" filter, so dashboards from earlier versions showed almost no events. They are now left unfiltered again, and custom ranges starting on 1 January 1970 are no longer rejected. Widgets that have already been re-saved with "Last hour" keep this setting until you reconfigure them.
