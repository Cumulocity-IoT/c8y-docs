---
date: '2023-12-06'
title: Alarm status and severity now case-insensitive
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-52515
version: 10.18.166.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The alarm status and severity are now case-insensitive. When searching by alarm status `active` the API also returns alarms with status `ACTIVE`. The same applies for the alarm severity, that is, searching for `critical` alarms also returns `CRITICAL` alarms. Alarms with status `active` and `acknowledged` are now subject of alarm deduplication.
