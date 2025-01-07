---
date: 2024-09-19
title: LWM2M agent bulk registration no longer fails when using an Excel-generated CSV file
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management & Connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-2452
version: 10.20.348.0
---

When an Excel-generated CSV file was submitted to the LWM2M bulk device registration, the process failed due to the inability to parse the UTF-8 with a BOM marker present at the beginning of the file. This issue has been addressed, and the LWM2M bulk device registration system now successfully accepts CSV files encoded in UTF-8 with BOM format.
