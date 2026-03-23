---
date: ""
title: Performance improvements for SCADA widget
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
ticket: MTM-66383
version: 1023.62.2
---
Fixed performance issues with SCADA widgets in dashboards with enabled template mode, particularly when widgets contained many placeholders or assigned devices had large managed objects. Dashboard templates with SCADA widgets now load faster and respond more smoothly.