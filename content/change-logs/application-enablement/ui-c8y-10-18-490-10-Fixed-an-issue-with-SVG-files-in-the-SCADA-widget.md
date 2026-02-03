---
date: 2023-12-06T15:38:37.132Z
title: Fixed an issue with SVG files in the SCADA widget
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Application enablement & solutions
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-55990
version: 10.18.490.10
---
Fixed an issue with SVG files in the SCADA widget, where <code>animate</code> or <code>animateTransform</code> tags worked properly in the configuration preview, but did not work in a dashboard.
