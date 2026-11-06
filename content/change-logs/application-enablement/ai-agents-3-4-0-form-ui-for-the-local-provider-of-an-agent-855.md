---
date: ""
title: form UI for the local provider of an agent (#855)
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-68295
version: 3.4.0
---
## TL;DR

The agent's **Local provider** tab was JSON only. It is now a **Model
configuration** tab laid out like the Control panel's model
configuration: one row per setting with an **Override** switch. A switch
that is off shows the inherited Control panel value, so it's clear what
the agent overrides and what it inherits.