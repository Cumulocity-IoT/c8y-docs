---
date: ""
title: Dashboard templates available for typed assets and groups
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66560
version: 1025.3.0
---
You can now use a dashboard as a template for all assets or groups of the same type. In the dashboard settings of an asset or group that has a type, turn on the switch in the **Dashboard template** section. The dashboard then appears on every object of that type and shows each object's own data. Before, this was only possible for devices.

* A template dashboard shows widgets and data of the displayed asset or group only. References to child devices or subassets show the data of the displayed asset itself, or no data.
* The Cockpit assigns the types "Group" and "Subgroup" to plain groups. A template saved on a top-level group appears on all top-level groups, and a template saved on a subgroup appears on all subgroups.

For details, see [Dashboard template](/cockpit/working-with-dashboards/#dashboard-template). Application developers can turn the switch off again by setting the `hideTypeDashboardForAssets` option to `true`.