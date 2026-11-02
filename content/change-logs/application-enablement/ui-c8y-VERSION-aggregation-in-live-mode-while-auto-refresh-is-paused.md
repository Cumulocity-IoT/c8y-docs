---
date: 'YYYY-MM-DD'
title: Aggregation in live mode while auto-refresh is off
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66642
version: VERSION
---
Previously, dashboards and widgets in live mode always showed raw data. Now, when you turn off auto-refresh in live mode, you can select an aggregation (None, Minutely, Hourly, Daily, or Auto), both in the dashboard time context and in the time context of a widget. While an aggregation is active, the collapsed time context toolbar shows it. When you turn auto-refresh on again, the aggregation is removed. For details, see [Global time context](/cockpit/global-time-context/#to-change-data-aggregation).
