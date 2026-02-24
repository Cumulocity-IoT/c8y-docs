---
date: 2026-03-31
title: Alarms no longer triggered for existing LWM2M objects
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4752
version: 1021.10.18
---
The LWM2M agent incorrectly triggered alarms when devices reported data for LWM2M objects that already had a DDF representation on the platform. This issue has been fixed. Alarms are now only triggered when the reported objects are not present on the platform.
