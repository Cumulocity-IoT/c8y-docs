---
date: 2025-03-31T12:00:00.000Z
title: Installed software packages are no longer emptied after restart of the Advanced software management microservice
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-TlhlHnKTa
    label: advanced-software-mgmt
ticket: DM-3475
version: 1.2.0
---
An old data model migration mechanism was erroneously removing installed software information from devices when the Advanced software management microservice was resubscribed or restarted. We have removed this mechanism entirely so that existing data is no longer modified.
