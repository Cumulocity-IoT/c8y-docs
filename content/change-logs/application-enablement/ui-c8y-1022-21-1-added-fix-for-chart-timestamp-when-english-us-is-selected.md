---
date: '2026-03-31'
title: >-
  Fixed data point graph and data explorer chart timestamps for English US
  locale
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
ticket: MTM-64163
version: 1022.21.1
---
In some scenarios, when the English US language was selected in the platform, the data point graph and data explorer chart timestamps were incorrectly displayed, showing a 24-hour format instead of a 12-hour format. This issue has been resolved. The chart timestamps are now correctly shown when using the English US locale. This change ensures a consistent user experience across different locales.
