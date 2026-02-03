---
date: 2024-04-04
title: Help and Service widget no longer opens a new tab when redirecting to the current application
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-58086
version: 1019.17.1
---
The Help and Service widget, which provides helpful resources and links for users, previously opened a new browser tab whenever a user clicked a link that redirected to the current application they were using. This behavior could lead to multiple unnecessary tabs being opened. With this change, the widget now detects if the link points to the current application and opens it in the same tab instead. This improves the user experience by reducing tab clutter and making navigation within the application smoother.
