---
date: ""
title: Bookmark title now uses globalTitle if set
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
ticket: MTM-58925
version: 1020.31.1
---
In the past, bookmarks did not consider the globalTitle property when generating the title for a bookmark. With this change, if a globalTitle is specified, it will be used as the bookmark title instead of the default behavior. This improves the user experience by allowing more control over how bookmarks are named, ensuring bookmark titles can be set according to specific needs.