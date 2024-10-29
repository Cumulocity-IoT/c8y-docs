---
date: 
title: Resolved issue with double LWM2M bulk registration execution
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
ticket: DM-3994
version: 10.20.386.0
---
When uploading the LWM2M bulk registration file, there was a potential issue where the registration could be processed twice, causing the second attempt to fail and revert to PENDING, leading to repeated retries. This issue has now been resolved, ensuring that each operation is executed only once. In the event of a failure, the operation will no longer be retried.
