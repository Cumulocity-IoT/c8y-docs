---
date: '2026-03-31'
title: >-
  Custom properties tab in tenant details only shows tenant-relevant custom
  properties
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
ticket: MTM-62291
version: 1021.38.1
---
Previously, the **Custom properties** tab in the tenant details showed all custom properties, including those not relevant for tenants (for example, those for events or alarms), which could be confusing. With this change, only custom properties that are actually relevant for tenants are displayed in this tab. This improves clarity and usability for users managing tenant-specific custom properties.
