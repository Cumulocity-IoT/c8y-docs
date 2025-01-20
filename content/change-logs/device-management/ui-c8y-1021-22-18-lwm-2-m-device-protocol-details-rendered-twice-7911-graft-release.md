---
date: ""
title: lwm2m device protocol details rendered twice (#7911) [GRAFT][release/y2025] (#7994)
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
In the LwM2M device protocol details view, some information was incorrectly shown twice, leading to confusion. This change fixes the issue by ensuring the protocol details are only rendered once. Users inspecting the details of LwM2M devices will now see a clear and concise view without duplicate information.