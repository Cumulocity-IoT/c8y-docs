---
date: '2026-02-06'
title: Tenant policy is now preselected with "None" when creating a new tenant
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
ticket: MTM-65935
version: 1023.28.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-06'
  - label: apj.cumulocity.com
    date: '2026-02-09'
  - label: jp.cumulocity.com
    date: '2026-02-09'
  - label: emea.cumulocity.com
    date: '2026-02-10'
  - label: us.cumulocity.com
    date: '2026-02-10'
  - label: cumulocity.com
    date: '2026-02-10'
---
When creating a new tenant, users previously had to manually select a tenant policy from the available options. The tenant policy dropdown now comes preselected with the "None" option, reducing the number of required steps during tenant creation. This change streamlines the tenant setup process by providing a sensible default selection that users can either accept or change to a different policy if needed.
