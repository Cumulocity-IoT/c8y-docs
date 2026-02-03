---
date: 2024-04-04
title: Status can be changed from FAILED for operations with "failureReason"
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-51764
version: 10.20.285.0
---
Previously, the status for operations with a "failureReason" fragment could not be changed from FAILED, since the "failureReason" fragment was not allowed for other statuses.
Now "failureReason" is automatically removed when moving an operation from the FAILED status.
