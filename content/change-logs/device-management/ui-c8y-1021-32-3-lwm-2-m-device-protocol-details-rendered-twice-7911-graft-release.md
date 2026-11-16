---
date: '2025-02-06'
title: Fixed duplicate rendering of LWM2M device protocol details
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4332
version: 1021.32.3
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the LWM2M device protocol details view, some information was incorrectly shown twice, leading to confusion. This has now been fixed by removing the redundant rendering. Users viewing the protocol details for LWM2M devices will now see a clean and concise view without any duplicate information.
