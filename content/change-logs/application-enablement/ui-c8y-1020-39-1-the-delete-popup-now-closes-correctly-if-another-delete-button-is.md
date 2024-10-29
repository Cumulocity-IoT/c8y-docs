---
date: ""
title: Delete popup now closing correctly when hitting another delete button in the bookmark edit view
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
ticket: MTM-60830
version: 1020.39.1
---
In the bookmark edit view, clicking on a delete button while the delete confirmation popup was already open would lead to unexpected behavior and the popup not closing properly. This issue has now been resolved. The delete confirmation popup will now always close correctly when clicking on another delete button, allowing users to smoothly continue their workflow without any interruptions. This change improves the overall user experience and consistency when working with delete confirmations.