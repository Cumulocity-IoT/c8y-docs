---
date:
title: Handle passwords with special characters in JSON configuration
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-5142
version: 4.0.1
---
Resolved an issue that caused errors when passwords contained backslashes or control characters. Passwords with special characters no longer break authentication or configuration.
