---
date: ""
title: Improved OPC UA gateway behavior on HTTP queue overflow
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
ticket: DM-4224
version: 1021.3.1
---
When the HTTP queue is overflowed, the OPC UA gateway now temporarily disables the server communication until the queue is recovered. This improvement helps prevent potential system overloads and ensures more stable performance during high traffic conditions. Before disabling the OPC UA communication, an alarm is triggered to notify that the gateway is disabling communication. Once the queue and communication are restored, the previously triggered alarm is cleared.
