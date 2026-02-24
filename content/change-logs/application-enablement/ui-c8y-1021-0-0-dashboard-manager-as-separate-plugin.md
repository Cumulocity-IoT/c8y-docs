---
date: 2026-03-31
title: Dashboard manager extracted into a separate plugin
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: no-issue
version: 1021.0.0
---
In an upcoming version the dashboard manager module will be extracted from the Cockpit application and added as a separate plugin.
This change might be a breaking change as the dashboard manager module will no longer be part of `@c8y/ngx-components/context-dashboard`, but will be part of `@c8y/ngx-components/dasboard-manager`.

This change does not affect the layout and UX of the Cockpit application nor does it add any new functionalities.
As a side effect, a performance improvement might be noticed as the dashboard manager from now on will be loaded lazily (that is, only after main application is loaded).


