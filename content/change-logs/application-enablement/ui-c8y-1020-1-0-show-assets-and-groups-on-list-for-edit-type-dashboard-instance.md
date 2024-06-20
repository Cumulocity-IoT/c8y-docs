---
date: ""
title: Assets and groups are now shown when editing dashboard instances
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
ticket: MTM-59255
version: 1020.1.0
---
The dashboard manager shows dashboards for both devices and groups/assets type dashboards. Groups/assets type dashboards could be created with the application option `hideTypeDashboardForAssets` set to false, but on clicking **Edit**, the new modal showed target assets only for device dashboards, while the groups/assets list was empty. Now, when you click **Edit**, the list is always populated with devices and groups/assets.