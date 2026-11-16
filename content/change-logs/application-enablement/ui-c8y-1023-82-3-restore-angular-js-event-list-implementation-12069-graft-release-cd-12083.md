---
date: '2026-05-22'
title: Restored AngularJS event list
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-22'
  - label: apj.cumulocity.com
    date: '2026-05-25'
  - label: jp.cumulocity.com
    date: '2026-05-25'
  - label: us.cumulocity.com
    date: '2026-05-26'
  - label: cumulocity.com
    date: '2026-05-26'
---
The former AngularJS event list in @c8y/ng1-modules has been restored. It was removed during the migration to the new Angular event list. Its removal broke custom applications scaffolded before the migration that still reference the old module in their own bootstrap, causing build failures after a Web SDK upgrade.
