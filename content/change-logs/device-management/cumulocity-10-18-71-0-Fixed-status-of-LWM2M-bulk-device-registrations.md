---
date: 2023-12-06T16:00:00.758Z
title: Fixed status of LWM2M bulk device registrations
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-1951
version: 10.18.71.0
---
Bulk device registrations and other operations being executed on the LWM2M connector device now show the status FAILED if a problem occurs. Prior to this change, partial failures were reported as SUCCESSFUL.
