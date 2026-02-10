---
date: '2026-02-06'
title: >-
  Fixed inability to save or cancel new Cockpit home dashboard settings after
  removal
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
ticket: MTM-65914
version: 1023.28.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-06'
  - label: apj.cumulocity.com
    date: '2026-02-09'
  - label: jp.cumulocity.com
    date: '2026-02-09'
---
When the Cockpit home dashboard was removed and a user navigated to the home page, the default dashboard settings dialog could not be closed using either the save or cancel button, leaving users unable to proceed. This issue has been resolved, and users can now successfully save or cancel dashboard settings regardless of the dashboard's state. The dashboard settings dialog will now respond correctly to user interactions and allow proper navigation away from the settings view.
