---
date: ""
title: Avoid violating CSP by setting `base` URL when parsing SVG in legacy SCADA widget (#10025) [GRAFT][release/cd] (#10060)
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
ticket: MTM-64731
version: 1022.40.1
---
This change fixes an issue with SCADA widget that could have triggered browser's warning about suspicious behavior of the Cockpit (or other app where SCADA widget is displayed in a dashboard).