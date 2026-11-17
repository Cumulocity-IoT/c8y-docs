---
date: ""
title: Reusable top action bar shell component for UI builds
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67840
version: 1025.4.0
---
The status bar hook adds a bar between the header and the page tabs that keeps the state of what the user is working on visible on every tab, along with the actions that control it. It stays in place while the action bar below the tabs changes from tab to tab. 

The first page to use it is the custom microservice detail page, which shows whether the microservice is healthy, unhealthy, down, or unknown, together with the counts of its running instances and tenant subscriptions, updated in realtime.