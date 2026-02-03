---
date: 2023-12-06T14:35:11.175Z
title: Location view migrated to Angular
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-49947
version: 10.18.482.12
---
The location view in the Device management and Cockpit application has been migrated to Angular. The map provider, the location search, and the map layers are now configurable via application options or tenant options. The angular.js module <code>@c8y/ng1-modules/devicemanagement-location</code> for location was removed and must be migrated or at least removed on update of a custom build application.
