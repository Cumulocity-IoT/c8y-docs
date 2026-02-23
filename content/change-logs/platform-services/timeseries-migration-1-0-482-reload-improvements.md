---
date: ''
title: Improved reloading of displayed data in time series migration UI
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
ticket: MTM-62307
version: 1.0.482
---
The time series migration UI has been improved with the following enhancements:

- A duplicate **Reload** button has been removed to avoid confusion, leaving only one **Reload** button at the top of the page that reloads both the **Ongoing migration** and **Tenants** sections. The loading state is now indicated by the top loader bar, and the area being loaded becomes slightly transparent.
- The reload action no longer clears filters applied in the **Tenants** data grid.
