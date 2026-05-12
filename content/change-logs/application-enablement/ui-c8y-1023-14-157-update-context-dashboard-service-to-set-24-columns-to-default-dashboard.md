---
date: ""
title: - update ContextDashboardService to set 24 columns to default dashboard configuration (#11987)
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
ticket: MTM-65903
version: 1023.14.157
---
Backport of #10896 to `release/y2026`.

Manual backport — automated backport failed due to merge conflict with
[DM-5463](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/10733).

**Conflict resolution:** `translateWidgetTitle` expectation was already
removed from the spec in `release/y2026`, so only the `columns: 24`
assertion was added.

[DM-5463]:
https://cumulocity.atlassian.net/browse/DM-5463?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ