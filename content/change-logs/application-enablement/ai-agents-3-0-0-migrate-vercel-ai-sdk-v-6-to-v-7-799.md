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
The AI Agents microservice now uses version 7 of the Vercel AI SDK. You can now define an agent's system prompt as a single system message or as a list of system messages. This lets you set provider-specific options on the system prompt, for example, to enable Anthropic prompt caching and reduce cost and latency for repeated requests.

This release contains breaking changes to the agent API. If you call agents directly through the API, review the following changes and update your integrations accordingly:

* Requests to `POST /agent/text/{name}` and `POST /agent/object/{name}` now accept only the `messages`, `prompt` and `variables` fields. Requests that contain any other field are rejected with HTTP status 400.
* The `messages` field can no longer contain messages with `role: "system"`. Define the system prompt in the `system` field of the agent definition instead.
* Full responses (`fullResponse=true`) no longer include the raw request and response bodies of each step (`steps[].request.body` and `steps[].response.body`).
* In streamed responses, `start-step` events no longer include `request.body`. To identify the model that was used, read `response.modelId` from the `finish-step` event.
* The output of object agents is now validated against the agent's JSON schema, including string formats such as `date-time` or `email`. If the output does not match the schema, the request fails with HTTP status 400 instead of returning the invalid output.