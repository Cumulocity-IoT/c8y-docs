---
date: 2024-03-14T14:35:11.175Z
title: Fixed file download behavior
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
ticket: MTM-57256
version: 10.19.4.1
---
If a user navigated to an asset which had a file attached, the file was immediately downloaded. Now the file is only downloaded on clicking the download button.
