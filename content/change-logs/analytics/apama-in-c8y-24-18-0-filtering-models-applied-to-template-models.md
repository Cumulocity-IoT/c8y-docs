---
date: 2023-12-06
title: Filtering models applied to template models
product_area: Analytics
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4127
version: 24.18.0
---
In Analytics Builder, when filtering the models in the model manager by <b>Mode</b> and <b>Status</b>, the filter is now also applied to template models.
Prior to this fix, the filter was only applied to models without template parameters.