---
date: '2026-03-31'
title: >-
  Smart rules section in the Status tab of custom microservices only displayed
  if Smartrules microservice is available
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64173
version: 1022.13.1
---
In the **Status** tab of custom microservices, the smart rules section was always visible, even if the Smartrules microservice was unavailable, causing alerts to be displayed. This issue has been resolved. The availability of the Smartrules microservice is now checked, and the smart rules section is only displayed if the Smartrules microservice is available. 
