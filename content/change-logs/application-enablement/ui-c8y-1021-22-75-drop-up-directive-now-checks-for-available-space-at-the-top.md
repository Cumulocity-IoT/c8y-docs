---
date: ""
title: The drop-up directive checks for available space at the top
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
version: 1021.22.75
---
The drop-up directive is used to display a dropdown menu above an element when there is not enough space below it. Previously, the directive did not check if there was sufficient space above the element before displaying the menu, which could result in the menu being partially obscured or not visible at all. With this change, the drop-up directive now checks for available space at the top of the element before deciding whether to display the menu above or below it. This improves the user experience by ensuring that dropdown menus are always fully visible and accessible, regardless of the available space around the triggering element.