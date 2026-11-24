---
date: ""
title: AI free trial for Cumulocity trial tenants (#711)
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
ticket: MTM-67390
version: 4.1.0
---
Cumulocity trial tenants without their own provider can run agents on a
Cumulocity-funded OpenAI key, with a cap on money and time. Each tenant
gets its own OpenAI project, and OpenAI enforces the spend limit for
that project.

- GET/POST/PATCH /trial: trial state, starting the trial, and the
  trial's model
- A tenant's own provider always wins over the trial, and a keyless
  local provider can only change the model
- Raw provider errors are turned into stable error codes, and API keys
  and prompts are no longer logged
- Control Panel: free trial card, activation modal, usage meter,
  warnings, and a "Talk to sales" link
- @c8y/ai-types: trial.model.ts (adds exports only)
- ADR-007 records the design decisions

The trial stays off until an OpenAI admin key is configured.