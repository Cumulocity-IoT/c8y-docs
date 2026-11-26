---
date:
title: AI Agent block in Analytics Builder is now generally available
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5481
version: <FIRST apama-in-c8y VERSION THAT CONTAINS THE GA CHANGE>
---

The [AI Agent Prompt](/streaming-analytics/block-reference/#ai-agent-prompt) block, previously released in [Public Preview](/change-logs/?component=.component-M5-cepIIS#apama-in-c8y-20260205-add-ai-agent-block-in-public-preview), is now Generally Available (GA).

The block no longer requires the preview blocks feature to be enabled. It is available in the Analytics Builder palette only for tenants that have the AI Acceleration bundle. The block has moved from the **Calculation** section of the palette to the new **AI/ML** section, which holds the blocks for artificial intelligence and machine learning.

The block now behaves differently in the following ways:

- The block has one input instead of five. Each value that arrives at the input starts one call to the agent, so the block has no separate trigger input. To control when the block calls the agent, put a Rate Limiter or a Gate block in front of it.
- The prompt template no longer uses the placeholders `{{inputs[0]}}` to `{{inputs[4]}}`. The value of the input is a variable. The new optional **Value name** parameter sets its name, which is `value` by default. Each property of the input, `source` (the device), and `timestamp` are variables as well. For example, `{{temperature}}`, `{{source}}`, and `{{timestamp}}`.
- The **Prompt template** parameter is still required and now has a default, `Follow your instructions for this input: {{value}}`. The default suits an agent whose system prompt holds all the instructions. The variables are replaced in the system prompt of the agent as well as in the prompt template.
- The block has an `error` output in addition to the `result` output. For an agent that returns an object, `result` is a pulse with the fields of the reply as its properties. For an agent that returns text, `result` is a string as before.
- If the agent does not exist, the AI Agent Manager is not available, or a similar problem prevents the block from working, the model does not activate or fails and shows the reason. Failures of single calls, such as an overloaded LLM provider, come out of the `error` output.
- The block makes one call at a time for each device and keeps only the latest input that arrives meanwhile. A call has a time limit of 110 seconds, which you can lower with the tenant option `aiAgent.timeoutSecs`. The block does not repeat a failed call and makes no calls in simulation mode.
- The block denies every request of the agent for approval of a tool call, because no person is available to approve it. The agent then continues without that tool. To let a tool run from a model, set **User approval** of the tool to **Never** in the AI Agent Manager.

Models that were saved during the Public Preview must be updated. A model that has a wire to the second to the fifth input, or a prompt template with the placeholders `{{inputs[0]}}` to `{{inputs[4]}}`, does not activate. Connect one input, and replace each placeholder with the name of a variable. To pass several values, combine them with a Set Properties block. A model that has only the first input wired and no such placeholders continues to work.

See [Using AI agents in models](/streaming-analytics/analytics-builder/#using-ai-agents-in-models) for the prerequisites, the data that leaves {{< product-c8y-iot >}}, the costs, and how to build a prompt and handle errors.
