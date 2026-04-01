---
date: '2026-02-12'
title: Added AI Agent block in Public Preview
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5074
version: 27.40.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-12'
  - label: apj.cumulocity.com
    date: '2026-02-18'
  - label: jp.cumulocity.com
    date: '2026-02-18'
  - label: emea.cumulocity.com
    date: '2026-02-23'
  - label: us.cumulocity.com
    date: '2026-02-23'
  - label: cumulocity.com
    date: '2026-02-24'
---

A new AI Agent block has been added to Analytics Builder. This block queries an AI Agent Manager agent using its inputs and produces the agent's text response as output.

{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

*Note*: This block produces its output asynchronously after the input activation completes. If you wire this output alongside outputs from other blocks into the same downstream block, they will trigger that block in separate activations rather than being processed together.

This block has the following parameters:

* **Agent name**: The agent to use in the AI Agent Manager.
* **Prompt template**: The prompt template to use when querying the agent. The block inputs will be mapped into this template using variables like {{inputs[0]}}, {{inputs[1]}}.
