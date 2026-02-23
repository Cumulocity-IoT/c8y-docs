---
date: '2025-05-15'
title: Dropdown menus now always fully visible and accessible
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
ticket: MTM-63158
version: 1021.69.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
If a dropdown menu cannot be displayed below an element (the default) due to space limitations, it is usually displayed above the element following the drop-up directive. Previously, the drop-up directive did not check if there was sufficient space above the element, which could result in the menu being partially obscured or not visible at all. With this change, the drop-up directive now checks for available space before deciding whether to display the menu above or below an element. This improves the user experience by ensuring that dropdown menus are always fully visible and accessible.
