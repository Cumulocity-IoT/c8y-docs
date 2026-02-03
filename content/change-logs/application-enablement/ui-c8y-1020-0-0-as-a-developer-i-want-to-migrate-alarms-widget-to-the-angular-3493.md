---
date: 2024-06-06
title: Redesign of the alarms feature
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-52646
version: 1020.0.0
---
As announced earlier, a redesign of the alarms feature has been introduced with both visual and functional enhancements.

**Visual and UX enhancements**:

* The way alarms are displayed in the alarms view and widgets has been redesigned.

**Functional improvements**:

* The alarms view now only shows one single list of alarms, in which filters can be applied.
* A details section has been introduced which contains all information related to the alarm.
* The functionalities of the "Alarm list", "All critical alarms", and "Recent alarms" widgets have been merged into a single, comprehensive widget called "Alarm list".
* The "Alarm list" widget has been migrated to Angular.
* The real-time functionality has been replaced with an auto-refresh functionality.
* Already existing widgets: "Alarm list", "All critical alarms", and "Recent alarms" will be automatically updated and migrated to the new version of the "Alarm list" widget.