---
date: ""
title: Fix pre-selection of nested properties in asset property selector
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
ticket: MTM-65890
version: 1023.22.10
---
The asset property selector allows you to pre-select properties that will be highlighted when the selector opens. Previously, nested properties (properties that are children of complex properties) were not pre-selected correctly, even when they were included in the pre-selection list. This issue has been fixed, and nested properties now display as pre-selected in the asset property selector, making it easier to work with hierarchical property structures.