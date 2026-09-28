---
date: '2023-12-06'
title: Erroneous audit log entries fixed
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2852
version: 10.18.497.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when ID collisions occurred, unrelated audit log entries could appear incorrectly in the "History of changes" view for bulk operations. This has now been resolved. In <code>c8y/ngx-components</code> the <code>c8y-audit-log</code> component now accepts a <code>type</code> input.
