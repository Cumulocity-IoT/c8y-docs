---
date: '2026-11-11'
title: Observabiltiy and audit trails
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-11'
  - label: apj.cumulocity.com
    date: '2026-11-11'
  - label: jp.cumulocity.com
    date: '2026-11-11'
  - label: us.cumulocity.com
    date: '2026-11-11'
  - label: cumulocity.com
    date: '2026-11-11'
---
This change adds observability and audit trail for agent runs. Admins can now inspect every
run and tool call, and optionally ship OpenTelemetry traces to their
own tracing backend — while the built-in audit trail stays metadata-only by default.
