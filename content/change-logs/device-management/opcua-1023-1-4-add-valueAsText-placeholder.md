---
date: '2026-04-21'
title: New valueAsText placeholder for OPC UA custom actions
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-591
version: 1023.1.4
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-20'
  - label: apj.cumulocity.com
    date: '2026-04-29'
  - label: jp.cumulocity.com
    date: '2026-04-29'
---
A new `${valueAsText}` placeholder is now available in the body template for OPC UA custom actions. Unlike the existing `${value}` placeholder which inserts the JSON-serialized value, `${valueAsText}` provides a plain text representation of the node value. This is useful for embedding values directly in strings without JSON formatting. The placeholder is available for both HTTP POST custom actions and MQTT forwarding custom actions.
