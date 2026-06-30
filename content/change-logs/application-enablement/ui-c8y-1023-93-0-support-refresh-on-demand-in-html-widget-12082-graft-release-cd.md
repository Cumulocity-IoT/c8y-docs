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
HTML widgets in the Cockpit application previously did not support the manual refresh functionality of the global time context feature, which meant that users could not update the widget content on demand when the automatic refresh was paused. HTML widgets now include a functional refresh button that allows users to manually refresh the widget content. This change gives you more control when widget data is updated.