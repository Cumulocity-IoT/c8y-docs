---
date: ""
title: Duplicate operations no longer appear in the Device Management Control page
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
ticket: DM-5997
version: 1023.85.2
---
In the Device Management application, the **Control** page uses real-time notifications to keep the operations list up to date. When a new operation was created while the **Control** page was open, the real-time update could occasionally cause the operation to appear twice in the list. 

The `c8yFor` directive now correctly ignores duplicate entries delivered via real-time notifications, so each operation appears only once in the list without requiring a page reload.