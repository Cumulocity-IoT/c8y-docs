---
date: ""
title: Syntax highlighting in configuration preview and new edit in repository option
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
ticket: DM-6359
version: 1024.1.0
---
In the Device management application, the read-only configuration preview on a device's **Configurations** tab now applies syntax highlighting. Snapshots retrieved from a device are shown in a syntax-highlighting editor, with the correct language applied automatically based on the file type, making them easier to read.

A new **Edit in repository** button lets you edit an available configuration and save it to the repository before it is sent to the device. It opens a drawer that is pre-filled with the selected configuration, where you can review and adjust it.

The **Save to repository** action now lets you edit the configuration retrieved from the device before it is saved to the repository, so you can adjust a snapshot on the way in instead of saving it as-is.