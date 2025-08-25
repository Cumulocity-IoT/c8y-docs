---
date: ""
title: Edit button for Asset Properties widget not working when specific property is added in the configuration
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61692
version: 1022.21.6
---
Edit button for Asset Properties widget was not working when nested property with dot in the middle meant to be displayed. It is fix now and nested property is displayed and edit button is functional.