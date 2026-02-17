---
date: '2026-02-13'
title: Added option to automatically adjust to bounds in the Map widget
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
ticket: MTM-65814
version: 1023.36.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-13'
  - label: apj.cumulocity.com
    date: '2026-02-13'
  - label: jp.cumulocity.com
    date: '2026-02-13'
  - label: emea.cumulocity.com
    date: '2026-02-13'
  - label: us.cumulocity.com
    date: '2026-02-13'
  - label: cumulocity.com
    date: '2026-02-13'
---
The "Map" widget in the {{< product-c8y-iot >}} application now includes a "fit to bounds" option in its settings. Previously, users had limited control over how the map viewport was adjusted when displaying multiple locations or markers. With this improvement, you can now configure the map to automatically adjust its zoom level and center position to fit all markers and features within the visible bounds of the map. This provides better control over the initial map view and improves the user experience when working with location-based data, allowing you to ensure all relevant map content is visible without manual zoom adjustments.
