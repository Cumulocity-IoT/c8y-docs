---
date: '2026-08-31'
title: Fixed widgets not loading data in custom dashboards
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
ticket: MTM-67416
version: 1024.16.11
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-31'
  - label: apj.cumulocity.com
    date: '2026-09-01'
  - label: jp.cumulocity.com
    date: '2026-09-01'
---
In custom dashboards, widgets could stay on a loading skeleton and never request their data, because the widget header and the controls it contains were not always rendered. The header now renders whenever a widget provides controls, so the time, refresh and export controls appear again and widgets load as expected.
