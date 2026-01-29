---
date: 
title: Accept Loriot platform connectivity credentials with special characters
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
An issue has been resolved that caused errors when [Loriot connection passwords](/device-integration/lpwan/#creating-a-loriot-lns-connection-in-cumulocity) contained backslashes or control characters. Passwords with special characters no longer break the authentication or the configuration.
