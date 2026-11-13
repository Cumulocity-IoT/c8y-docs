---
date: ""
title: let callers send the object schema with the request (#908)
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
Fixes [MTM-68133](https://cumulocity.atlassian.net/browse/MTM-68133): an
object agent can now get its schema from the POST request, so one agent
can extract different shapes without defining one agent per schema.

## Behavior

| Agent schema | Request schema | Result |
|---|---|---|
| set | none | Uses the agent schema (unchanged) |
| none | set | Uses the request schema |
| set | set | 400: the agent defines its own schema |
| none | none | 400: send a schema, define one on the agent, or call it
as a text agent |

The request schema is validated like an agent schema, so it must not
allow additional properties. `system` is still rejected in the request.

## Changes

- **`ai-agents`:** `schema` is optional in `TalkObjectCompletionDto`.
`AgentImplementation` picks the schema in `resolveObjectSchema` and no
longer rejects object agents without one. Swagger has a new
`with-schema` example.
- **`ai-types`:** `ObjectCompletion.schema` is optional. This is not a
breaking change.
- **`ai-plugins`:** the schema tab can be left empty, which saves
`schema: null`. A new hint explains that the caller then sends the
schema with each request. Reset restores an empty editor for agents
without a schema. The new string goes through Crowdin with the next
translation sync.

## Verification

- `ai-agents`: typecheck and build pass, 343 Jest tests pass. New tests
cover all four cases above and the DTO validation.
- `ai-plugins`: build passes, 102 Karma tests pass
- `ai-types` and `ai-workbench` pass
- New Cypress test in `e2e/no-llm/agent-management.cy.ts`: create an
agent with an empty schema. Not run locally, left to CI.


[MTM-68133]:
https://cumulocity.atlassian.net/browse/MTM-68133?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ