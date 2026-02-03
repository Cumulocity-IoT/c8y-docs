---
date: 2023-12-06T14:23:44.260Z
title: Locale of web app can be set via URL parameter
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-48676
version: 10.18.317.0
---
The locale of the web app can be set via the URL parameter <code>lang</code>, for example, <code>/apps/administration/index.html?lang=zh-cn</code>. The locale code is case-insensitive and must have 2 letters or 4 letters, separated by a hyphen "-" or an underscore "_". If the provided locale code is not supported, the web app is displayed in English.
