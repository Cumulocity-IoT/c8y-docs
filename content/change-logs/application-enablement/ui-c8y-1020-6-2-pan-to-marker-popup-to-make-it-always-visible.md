---
date: '2024-07-25'
title: Pan map to ensure marker popup is always visible
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
ticket: MTM-58511
version: 1020.6.2
---
In the Map component, when a marker popup was opened, it could sometimes be positioned outside the visible area of the map, making it difficult for users to view the popup content. With this change, the map now automatically pans to the position of the opened marker popup, ensuring that it is always fully visible within the map viewport. This improves the user experience when interacting with marker popups, as the relevant information is now consistently accessible and readable.
