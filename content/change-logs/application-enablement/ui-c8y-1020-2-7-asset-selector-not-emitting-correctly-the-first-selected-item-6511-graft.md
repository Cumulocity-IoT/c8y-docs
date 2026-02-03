---
date: '2024-07-04'
title: Asset selector now correctly emits the first selected item
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
ticket: MTM-59543
version: 1020.2.7
---
The asset selector component is used to allow users to select an asset from a list. Previously, the first item in the list was not automatically selected. This had been changed, but the first selected item was not properly emitted to other components. In some cases this led to data points not showing up in the data points selector. This has now been fixed so that the asset selector component will always emit the selected item. This change ensures that the selected asset is properly communicated and depending components can be used as expected.
