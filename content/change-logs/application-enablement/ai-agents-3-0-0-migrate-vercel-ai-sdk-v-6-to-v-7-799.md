---
date: ""
title: AI agents upgraded to Vercel AI SDK 7 with stricter API validation (breaking changes)
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
ticket: MTM-67854
version: 3.0.0
---
Upgrades `ai` and all `@ai-sdk/*` providers from v6 to v7. A stored agent's `system` may now be a system message, or an array of them, so it can carry provider options such as Anthropic prompt caching.

BREAKING CHANGE: Request bodies of POST /agent/text/:name and POST /agent/object/:name are now validated: only `messages`, `prompt` and `variables` are accepted, and unknown fields are rejected with 400.
BREAKING CHANGE: `messages` may no longer contain a `role: 'system'` entry; set the system prompt in the agent definition's `system` field instead.
BREAKING CHANGE: `steps[].request.body` and `steps[].response.body` are no longer included in `fullResponse=true` responses.
BREAKING CHANGE: `start-step` stream events no longer include `request.body`; the model is available as `response.modelId` on `finish-step` events.
BREAKING CHANGE: Object agents' output is now validated against the agent's JSON schema, including string formats, and output that doesn't match is rejected with 400 instead of being returned.