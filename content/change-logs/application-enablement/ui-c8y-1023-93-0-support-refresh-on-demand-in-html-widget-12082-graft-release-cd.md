---
date: ""
title: Support for on-demand refresh in the HTML widget
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66887
version: 1023.93.0
---
HTML widgets in Cockpit previously did not support manual refresh functionality of the global time context feature, which meant users could not update widget content on demand when the automatic refresh was paused. HTML widgets now include a functional refresh button that allows you to manually refresh the widget content. This gives you more control over when widget data is updated.