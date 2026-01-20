---
date: ""
title: Fixed untranslated texts with guide links (#10535) [GRAFT][release/cd] (#10798)
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
ticket: MTM-65540
version: 1023.22.1
---
[MTM-65540] Added unit test for the dynamic guide link case, added `ngNonBindable` where it was missing.

**Affected places:**

Administration:

- Tenants > Subtenants > [tenant] > Custom properties (when no tenant
properties defined in Properties library)

Cockpit:

- [dashboard] > Add widget > Data points graph > [preview when no data
point selected]
- [dashboard] > Add widget > Info gauge > [preview when no data point
selected]
- [dashboard] > Add widget > Linear gauge > [preview when no data point
selected]
- [dashboard] > Add widget > KPI widget > [preview when no data point
selected]
- [dashboard] > Add widget > Data points table > [preview when no data
point selected]
- [dashboard] > Add widget > Data points table > [preview when selected
data point has no measurements]