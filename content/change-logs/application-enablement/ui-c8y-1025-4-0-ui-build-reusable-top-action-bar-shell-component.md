---
date: ""
title: Status bar hook is now available
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
The new status bar hook adds a bar between the header and the page tabs. It shows the state of the user’s work on every tab, along with the actions that control it. Unlike the action bar below the tabs, the status bar stays the same for all tabs.

The first page using it is the custom microservice detail page, which shows whether the microservice is healthy, unhealthy, down, or unknown, together with the counts of its running instances and tenant subscriptions, updated in real time.