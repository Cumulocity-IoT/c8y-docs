---
date: '2026-03-31'
title: Fixed reload icon spinning indefinitely in x509 certificates tab
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
ticket: MTM-63057
version: 1021.59.1
---
In certain situations, the reload icon in the **x509** tab in the device details spinned indefinitely, indicating that a reload operation was still in progress even though it had already completed. This issue has now been resolved. The reload icon stops spinning as soon as the reload is finished, providing clear feedback to the user.
