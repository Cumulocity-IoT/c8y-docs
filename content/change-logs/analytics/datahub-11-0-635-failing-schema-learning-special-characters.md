---
date: 2025-08-07
title: Schema learning for columns using special characters or SQL keywords
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
ticket: CDH-5384
version: 11.0.635
---
The schema learning process derived the wrong data type for attributes whose name contains a special character or equals a SQL keyword. As a result the associated column in the data lake had the wrong type. This issue has been fixed so that the correct type is derived and used for the data lake schema.
