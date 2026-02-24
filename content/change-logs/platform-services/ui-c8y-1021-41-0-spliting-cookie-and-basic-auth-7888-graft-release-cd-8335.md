---
date: '2026-03-31'
title: Enhanced login process using OAI-Secure
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61832
version: 1021.41.0
---
OAI Secure has been enhanced by removing the need to call `/currentTenant` as part of the login. This is of interest to our customers who have written their own login interface. If you are unsure if the new approach is supported on your instance, check for the login option `tfaSupported` which indicates you no longer have to use `/currentTenant`.
