---
date: ""
title: Make the message banner form branding dismissable
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65885
version: 1023.23.0
---
Message banner provides two ways of dismissal- 'Close' and 'Acknowledge and close'. If 'Close' is used, message banner will be displayed again once app is refreshed. If 'Acknowledge and close' if clicked, message banner id will be stored in local storage and message banner won't be shown unless browser cache is cleared, user change browser or different message banner is applied in branding.