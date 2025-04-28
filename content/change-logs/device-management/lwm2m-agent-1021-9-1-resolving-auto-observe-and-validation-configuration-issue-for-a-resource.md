---
date: '2025-04-24'
title: Resolved auto-observe and validation configuration issue for certain resources
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
ticket: DM-4586
version: 1021.9.1
---
Resources that were supposed to have auto-observe in the LWM2M device protocol configuration activated could not be properly set up. The auto-observe fragment was either always set to false or completely missing from the object. As a result, automatic observation was not executed. The auto-observe fragment is now correctly set in the object, resolving the issue and ensuring that automatic observation works as expected. In addition, we addressed an issue where the empty validation rules configuration is saved for the resource. This caused issues for validations of write operation values before sending it to a LWM2M device. This issue has been resolved to ensure proper validation behavior.
