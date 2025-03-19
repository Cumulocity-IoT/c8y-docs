---
date: ""
title:Added confirmation dialog when deleting a data broker connector
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62022
version: 1018.503.149
---
In the data broker connector configuration, there was no warning message displayed when attempting to delete a connector, which could lead to accidental deletions. This change introduces a confirmation dialog that is shown when trying to delete a data broker connector, ensuring that connectors are no longer unintentionally removed.