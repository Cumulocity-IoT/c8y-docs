---
date: ""
title: User preferences now retrieved from local storage with inventory storage as fallback
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
ticket: MTM-65477
version: 1023.10.0
---
The retrieval logic of the user preferences contained an issue. For the affected user the user preferences were correctly stored in the local storage, but the retrieval logic was looking for the corresponding values only inside of the inventory.
This caused the stored user preferences to not take any effect for certain users.