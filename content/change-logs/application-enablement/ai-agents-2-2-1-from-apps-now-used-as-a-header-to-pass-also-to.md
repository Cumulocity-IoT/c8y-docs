---
date: '2026-07-28'
title: Agent-to-agent calls now use x-from-app header for proper agent routing
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-VtytA3d55
    label: AI Agents
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-66754
version: 2.2.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-28'
  - label: apj.cumulocity.com
    date: '2026-07-29'
  - label: jp.cumulocity.com
    date: '2026-07-29'
  - label: us.cumulocity.com
    date: '2026-07-30'
  - label: cumulocity.com
    date: '2026-07-30'
---
When making agent-to-agent calls with subscribed agents, the system was unable to locate the target agent because the `fromApps` information was not being passed along in follow-up requests. The `fromApps` parameter has been changed from a URL parameter to an `x-from-app` header, which is automatically included in subsequent requests and ensures proper agent routing. The URL parameter still exists for backward compatibility but is now deprecated. Your agent-to-agent calls with subscribed agents now work as expected without requiring manual parameter passing.
