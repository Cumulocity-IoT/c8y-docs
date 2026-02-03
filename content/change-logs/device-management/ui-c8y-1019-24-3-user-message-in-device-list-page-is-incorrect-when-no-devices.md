---
date: '2024-06-06'
title: Improved layout and content of empty state messages
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-1214
version: 1019.24.3
---
The layout of the empty state message displayed in data grids across all standard applications has been adjusted and unified. Moreover, grids that did not differentiate between no data available and no filter matches or search results do now display a more precise corresponding empty state message.

For developers the `emptyStateContext` directive was introduced that injects data source statistics variable into template context.
