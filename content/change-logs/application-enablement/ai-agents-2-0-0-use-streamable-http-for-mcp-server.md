---
date: '2026-05-08'
title: >-
  AI Agent Manager now uses Streamable HTTP transport for internal MCP server
  instead of HTTP with SSE
product_area: Application enablement & solutions
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc--gWykZ78v
    label: ai-agents
ticket: MTM-66714
version: 2.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-08'
  - label: apj.cumulocity.com
    date: '2026-05-13'
  - label: jp.cumulocity.com
    date: '2026-05-13'
  - label: us.cumulocity.com
    date: '2026-05-18'
  - label: cumulocity.com
    date: '2026-05-19'
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The AI Agent Manager has previously offered an MCP server that used the "HTTP with SSE" transport.
The "HTTP with SSE" transport has been superseded by the "Streamable HTTP" transport in the MCP specification.

Therefore, we no longer offer the "HTTP with SSE" transport and only provide the MCP server via "Streamable HTTP".

External clients that made direct use of the MCP server may need to adjust for the changed transport and endpoint.
