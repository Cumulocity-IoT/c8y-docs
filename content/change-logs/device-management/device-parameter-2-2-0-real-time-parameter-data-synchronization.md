---
date: '2026-05-01'
title: Device parameter real-time data synchronization
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--LJtTuzaN
    label: Device Parameter
build_artifact:
  - value: tc-wfTX6sxsr
    label: device-parameter
ticket: DM-5919
version: 2.2.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-01'
  - label: apj.cumulocity.com
    date: '2026-05-06'
  - label: jp.cumulocity.com
    date: '2026-05-06'
---
The device parameter list now automatically synchronizes to ensure displayed data remains current during active configuration. The interface triggers a refresh during common actions - such as receiving an event, updating an operation status, or navigating through rows - and provides immediate interactive notifications to confirm when changes are complete. This update ensures a consistent and up-to-date view of device parameters without requiring manual refreshes.
