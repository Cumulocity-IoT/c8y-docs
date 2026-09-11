---
date: ""
title: Fixed delayed start of scheduled bulk operations after a platform restart
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-7013
version: 2026.313.0
---
A bulk operation scheduled to start at a future time could start significantly later than scheduled if the platform was restarted before its start time was reached, for example during a platform upgrade. This issue is now fixed, and scheduled bulk operations start at the time they were scheduled for.

Failover handling has also been improved for bulk operations that are interrupted while they are being carried out, so that their execution resumes noticeably faster.
