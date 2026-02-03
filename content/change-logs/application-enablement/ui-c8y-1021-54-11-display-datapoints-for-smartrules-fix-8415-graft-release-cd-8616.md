---
date: '2025-04-10'
title: Improved the selection of data points in smart rules
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
ticket: MTM-62818
version: 1021.54.11
---
The datapoint selection functionality in the smart rules "On measurement threshold create alarm" and "On measurement explicit threshold create alarm" has been improved.
Both smart rules now use a more intuitive datapoint selector and the informational text in both rule modals has been modified to better explain the behavior and implications of each selection type.
Additionally, the smart rule "On measurement explicit threshold create alarm" now allows to select both datapoints and datapoint library entries (instead of only datapoint library entries).
