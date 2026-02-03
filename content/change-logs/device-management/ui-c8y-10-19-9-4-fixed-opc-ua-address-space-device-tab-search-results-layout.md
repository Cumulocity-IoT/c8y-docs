---
date: 2024-04-08
title: Search results on OPC UA Address space tab no longer overflow on small screens
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2784
version: 1019.19.4
---
Previously, when performing a search in the **Address space** tab of OPC UA devices on small screen sizes, the search results would overflow the available space and extend beyond the visible area, making it difficult for users to view and interact with the results. This change addresses the overflow issue by ensuring the search results are properly contained within the available space on small screens. Users will now be able to easily view and navigate through the search results without any content being cut off, regardless of the screen size they are using.
