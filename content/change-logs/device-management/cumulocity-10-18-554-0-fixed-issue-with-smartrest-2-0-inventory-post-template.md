---
date: "2024-02-06"
title: Fixed issue with SmartREST 2.0 inventory POST template
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2910
jira: DM-2910
version: 10.18.554.0
---
The SmartREST 2.0 inventory POST template was breaking when parsing an empty "mandatoryValues" field. A check has been implemented to verify if the field is empty before processing the POST template.
