---
date: '2025-07-03'
title: >-
  Paginated lists for dynamic access and inventory role mappings in SSO
  configuration
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To improve the performance of the single sign-on (SSO) configuration page in the Administration application, pagination has been introduced for the lists of dynamic access mappings and inventory role mappings. This change addresses potential performance degradation or page crashes that could occur when displaying a large number of mappings all at once. The introduction of pagination ensures a smoother user experience and better overall performance when configuring SSO settings with extensive mapping lists.
