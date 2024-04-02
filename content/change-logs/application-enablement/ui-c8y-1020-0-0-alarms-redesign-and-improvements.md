---
date: 2024-03-28
title: Alarms redesign and improvements
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
ticket: MTM-52611
version: 1020.0.0
---
In the upcoming version, a redesign of the alarms feature will be introduced with both visual and functional enhancements.

**Visual and UX enhancements**:

* We have redesigned the way alarms are displayed in the "Alarms" view and widgets.

**Functional improvements**:

* The "Alarms" view now only shows one single list of alarms, in which filters can be applied.
* A details section has been introduced which contains all information related to the alarm.
* The functionalities of the "Alarm list", "All critical alarms", and "Recent alarms" widgets have been merged into a single, comprehensive widget called "Alarm list".
* The "Alarm list" widget has been migrated to Angular.
* The real-time functionality has been replaced with an auto-refresh functionality.
* Already existing widgets: "Alarm list", "All critical alarms", and "Recent alarms" will be automatically updated and migrated to the new version of the "Alarm list" widget.
