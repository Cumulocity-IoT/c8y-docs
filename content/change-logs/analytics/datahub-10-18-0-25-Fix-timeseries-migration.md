---
date:
title: Fixed offloading failures during time series migration
product_area: Analytics
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-H-tuq-8Es
    label: datahub
ticket: CDH-5357
version: 10.18.0.25
---
During execution of the time series migration, offloadings being executed in this timeframe could fail. This issue has been fixed so that offloadings rely on the old data model until the migration has completed and then automatically switch to the new time series data model.