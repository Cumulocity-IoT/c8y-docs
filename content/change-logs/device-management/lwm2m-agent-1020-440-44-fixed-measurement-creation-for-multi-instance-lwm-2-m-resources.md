---
date: 2025-07-17
title: Fixed measurement creation for multi-instance LWM2M resources
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
ticket: DM-4789
version: 1020.440.44
---
Mapping LWM2M multi-instance resources to {{< product-c8y-iot >}} measurements now correctly creates a separate measurement series for each instance. Previously, only a single series was generated regardless of the number of values.
