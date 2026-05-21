---
date: ""
title: Restored AngularJS Event list implementation
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
ticket: MTM-66883
version: 1023.82.3
---
Restored the AngularJS event list in @c8y/ng1-modules, removed during the migration to the new Event list. Its removal broke custom applications scaffolded before the migration that still reference the old module in their own bootstrap, causing build failures after a Web SDK upgrade.