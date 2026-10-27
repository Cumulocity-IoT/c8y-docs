---
date: ""
title: observabiltiy and OTel integration
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
ticket: MTM-67396
version: 3.1.0
---
## Summary

This branch adds **observability / audit trail** for agent runs, and
refactors the Control Panel around them. Admins can now stop all agent
activity instantly, inspect every run and tool call, and optionally ship
OpenTelemetry traces to their own tracing backend — while the built-in
audit trail stays metadata-only by default. It also de-duplicates
provider names between frontend and backend.