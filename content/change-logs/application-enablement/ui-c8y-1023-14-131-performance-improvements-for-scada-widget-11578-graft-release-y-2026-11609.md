---
date: ""
title: Improved performance of SCADA widgets in dashboard templates
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
version: 1023.14.131
---
This change fixes performance issues with SCADA widgets in dashboards with template mode enabled, particularly when widgets contain many placeholders or assigned devices have large managed objects. Dashboard templates with SCADA widgets now load faster and respond more smoothly.