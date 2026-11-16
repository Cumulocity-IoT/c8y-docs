---
date: '2024-04-25'
title: >-
  Command output of shell operations in the Shell tab now correctly includes
  newline characters
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3505
version: 1019.20.4
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the **Shell** tab in the device details, the result of commands executed through the shell operation was previously displayed with missing new line characters, making it difficult to read. This issue has now been resolved. The shell operation now correctly includes newline characters in the command output as expected.
