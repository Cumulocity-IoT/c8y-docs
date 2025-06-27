---
date: ""
title: Implemented paginated list for dynamic access and inventory mappings in SSO configuration to improve performance (#9223) [GRAFT][release/cd] (#9465)
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
This introduces pagination for the lists of dynamic access mappings and inventory roles mappings in Single sign-on configuration form in the Administration app. This improves the performance of the form in case there are a lot of mappings to be displayed, otherwise displaying them all at once could significantly degrade the performance or even crash the page.