---
date: ""
title: Fixed data point synchronization error and date lag when switching out
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
ticket: MTM-65579
version: 1023.81.1
---
In some cases, when a chart became out of sync, a warning was displayed to indicate that timestamps or data points might be outdated. However, once synchronization was restored, the warning was not cleared correctly, causing stale sync warnings to persist even though the data was up to date.

The synchronization logic has been improved to ensure that warnings are automatically removed when a the chart returns to a synchronized state.