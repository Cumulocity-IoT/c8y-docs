---
date: "2024-02-06"
title: Fixed connection issues of LWM2M devices
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-3044
version: 10.18.589.0
---
Under certain rare conditions LWM2M devices were not able to connect due to an internal 409 conflict. The LWM2M agent is now more robust for such scenarios.
