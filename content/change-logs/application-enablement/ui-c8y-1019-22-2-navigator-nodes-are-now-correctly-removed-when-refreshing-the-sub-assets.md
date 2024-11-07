---
date: 2024-05-13
title: Group navigation tree in navigator now refreshes correctly after removing groups via subassets view
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
ticket: MTM-58562
version: 1019.22.2
---
In the {{< product-c8y-iot >}} user interface, the navigator did not always update correctly after removing a group or device via the subassets view. This caused the navigator to still show the removed groups or devices and made the UI inconsistent. With this fix, the navigator now correctly refreshes after a group or device has been removed through the subassets view, ensuring the user interface stays in sync and provides an accurate view of the current inventory.
