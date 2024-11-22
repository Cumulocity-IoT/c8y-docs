---
date:
title: LWM2M device deprecated content format support in LWM2M agent
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
ticket: DM-3620
version: 10.18.540.246
---
From 2024.10 version, the deprecated content format TLV with ID 1542 and JSON with ID 1543 support was disabled in the LWM2M agent. This is now re-enabled and LWM2M device data coming with this content formats are being recognized by default.