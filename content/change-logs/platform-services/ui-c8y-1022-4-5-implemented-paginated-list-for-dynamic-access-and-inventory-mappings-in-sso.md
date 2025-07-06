---
date: '2025-07-03'
title: Paginated list for dynamic access and inventory mappings in SSO configuration
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
ticket: MTM-63482
version: 1022.4.5
---
To improve the performance of the Single sign-on configuration form in the Administration app, pagination has been introduced for the lists of dynamic access mappings and inventory roles mappings. This change addresses potential performance degradation or page crashes that could occur when displaying a large number of mappings all at once. The introduction of pagination ensures a smoother user experience and better overall performance when configuring SSO settings with extensive mapping lists.
