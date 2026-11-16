---
date: '2024-09-26'
title: Corrected display of key-value pairs of Location property
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-1422
version: 1020.1.16
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, on the **Asset Properties** page, viewing the default location property after viewing a complex property with three or more key-value pairs resulted in the altitude key-value pair being displayed multiple times. Now, the key-value pairs are displayed correctly.
