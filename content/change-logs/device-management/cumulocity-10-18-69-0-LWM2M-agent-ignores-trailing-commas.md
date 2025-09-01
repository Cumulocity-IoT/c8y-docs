---
date: 2023-12-06T16:03:22.720000Z
title: LWM2M agent ignores trailing commas
change_type:
- value: change-VSkj2iV9m
  label: Fix
product_area: Device Management
component:
- value: component-1KLUzmqfe
  label: LWM2M
build_artifact:
- value: tc-QHwMfWtBk7
  label: cumulocity
ticket: DM-2342
version: 10.18.69.0
lastmod: '2025-09-01T10:40:41Z'
---
The LWM2M agent now ignores trailing commas at the end of object links in the registration request of a LWM2M client.
