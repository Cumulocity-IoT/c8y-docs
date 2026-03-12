---
date: '2025-11-28'
title: Prevent blank screen when preferred language is stored in an invalid format
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65299
version: 1023.4.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In some cases, the user's preferred language was stored in an unexpected format in the user object (as an object instead of a string). The UI implementation expected a string and couldn't handle an object. As a result, initializing of the UI application failed, and the user ended up on a blank screen.

This behavior has been adjusted and the application will initialize in these cases as expected.
