---
date: '2024-07-25'
title: Fixed sample asset model view issue
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
ticket: CTM-1440
version: 1020.1.12
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, on the **Asset model samples** page, if the selected sample asset model was already imported, clicking **View** would display a message indicating that the sample asset model had already been imported. With this fix, users can now click **View** to explore the hierarchy of the selected sample asset model.
