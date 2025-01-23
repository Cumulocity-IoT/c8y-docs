---
date: '2025-01-09'
title: Migrated and improved the devices map in the Device Management application
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3089
version: 1021.28.0
---
As part of ongoing improvements to the Device Management application, the device map component (Devices > Map) has been migrated to a new implementation. Besides improving the functionality, the goal of this migration is to keep the component up-to-date and maintainable. The following changes have been made:

- The limit of 100 devices displayed has been removed. 
- Areas with large density of devices are marked by clustering devices into a single marker displaying the number of devices in the area. 
- The world map is not wrapped and users can endlessly scroll to the east and to the west. 
- Automatic initial zoom and center based on the determined device positions has been introduced. 
- Auto-refresh with pause/resume functionality replaces realtime updates.
