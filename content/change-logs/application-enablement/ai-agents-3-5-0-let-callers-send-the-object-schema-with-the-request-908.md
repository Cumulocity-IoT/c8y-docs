---
date: ""
title: Object agents can now take the schema from the request
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
ticket: MTM-68133
version: 3.5.0
---
An object agent, which returns structured data, no longer needs its own schema. If the agent has none, the caller sends the schema in the `schema` field of each `POST /service/ai/agent/object/{name}` request, so one agent can extract data in different shapes instead of needing one agent per schema.

The request schema follows the same rules as an agent schema and must not allow fields that the schema does not define. An agent uses either its own schema or the one from the request, never both. A request that sends a schema to an agent that already has one fails with HTTP status 400, and so does a request without a schema to an agent without one.

In the AI Agent Manager, you can now leave the **Schema** tab of an object agent empty. Agents that already have a schema work as before.