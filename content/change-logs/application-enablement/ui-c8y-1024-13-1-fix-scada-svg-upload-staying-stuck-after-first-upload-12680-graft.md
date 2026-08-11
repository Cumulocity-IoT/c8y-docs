---
date: ""
title: Fixed SVG upload issues in SCADA widget
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67282
version: 1024.13.1
---
When uploading an SVG file in the SCADA widget, the upload process got stuck after the first successful upload, preventing you from uploading another file without reopening the widget configuration. This issue has been fixed. You can now upload another SVG file without encountering any stuck states or having to reopen the widget configuration.