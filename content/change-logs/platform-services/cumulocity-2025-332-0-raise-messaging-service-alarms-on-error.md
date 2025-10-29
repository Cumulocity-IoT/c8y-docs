---
date: 2025-10-03
title: "Raising Messaging Service alarms on common errors"
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-2Yri1-l3n
    label: Messaging Service
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62614
version: 2025.332.0
---
From now on the Platform will raise a Messaging Service alarm when messages will fail to be processed (e.g. by Notification 2.0 feature) due to common issues. Those issues initially are about reaching backlog quota or topic limit, so issues where the customer should take the action to resolve it.
