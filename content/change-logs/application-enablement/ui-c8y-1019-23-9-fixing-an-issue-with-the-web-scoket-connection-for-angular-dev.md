---
date: 2024-05-13
title: Fix websocket connection issue for Angular development server
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
ticket: MTM-57372
version: 1019.23.9
---
The Angular development server relies on a websocket connection to enable live reloading of the application during development. Previously, the websocket connection was unstable and would frequently disconnect, causing the live reloading feature to stop working. This change fixes the underlying issue with the websocket connection, making it more stable and reliable.
