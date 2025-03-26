---
date: ""
title: Fixed an issue with selecting data points for smart rules
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
Datapoint selection functionality in smart rules "On measurement threshold create alarm" and "On measurement explicit threshold create alarm" has been improved.
In case of "On measurement explicit threshold create alarm" smartrule only datapoint library entries could be selected. Now both datapoints and datapoint library entries can be selected.
Both smart rules now use a new, more intuitive datapoint selector, informational text in both rule modals are clarified to better explain the behavior and implications of each selection type.