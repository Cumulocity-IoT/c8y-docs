---
date: 2026-03-31
title: Improved handling of suspended tenants in time series migration UI
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-G8NchI7b1
    label: timeseries-migration
ticket: MTM-64650
version: 1.0.440
---
In the time series migration UI, a new column named "Tenant status" has been added to indicate whether a tenant is active or suspended. The existing "Status" column has been renamed to "Migration status" to provide clearer context. For suspended tenants, no actions are now enabled. This enhancement allows administrators to easily identify suspended tenants during the migration process and prevents invoking invalid operations on them.
