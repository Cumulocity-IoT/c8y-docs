---
date: ""
title: Fix duplicate rendering of LwM2M device protocol details
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
version: 1021.22.18
---
In the LWM2M device protocol details view, some information was incorrectly shown twice, leading to confusion. This change fixes the issue by ensuring the protocol details are only rendered once. Users inspecting the details of LWM2M devices will now see a clear and concise view without duplicate information.