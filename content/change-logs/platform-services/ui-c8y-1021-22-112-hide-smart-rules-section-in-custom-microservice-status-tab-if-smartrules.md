---
date: ""
title: Hide Smart rules section in custom microservice Status tab if smartrules microservice is not available
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
version: 1021.22.112
---
In custom microservice "Status" tab, Smart rules section was always visible, even if Smartrules microserivce was unavailable, causing alerts to be thrown. After fix, Smartrules microservice availability is checked before displaying its section and if microservice is not subscribed, section is not displayed at all.