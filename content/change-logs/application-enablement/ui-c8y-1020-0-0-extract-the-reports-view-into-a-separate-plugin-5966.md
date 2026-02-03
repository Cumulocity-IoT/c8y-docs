---
date: '2024-06-06'
title: Reports page extracted into a separate plugin
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58448
version: 1020.0.0
---
As announced earlier, the report module has been extracted from the Cockpit application and added as a separate plugin.
This is a first step towards removing the reports module entirely and replacing it with the dashboard manager.
This change might be a breaking change as the reports module is no longer a part of `@c8y/ngx-components/context-dashboard`, but is be part of `@c8y/ngx-components/report-dashboard`.

This change does not affect the layout and UX of the Cockpit application nor does it add any new functionalities.
As a side effect, a performance improvement might be noticed as reports from now on will be loaded lazily (that is, only when users navigate to the **Reports** page).
