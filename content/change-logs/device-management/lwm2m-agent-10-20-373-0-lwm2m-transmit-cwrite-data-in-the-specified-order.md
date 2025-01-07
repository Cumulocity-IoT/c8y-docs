---
date: 2024-09-19
title: Composite Write transmits data to the device in the specified order
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-3622
version: 10.20.373.0
---
The Composite Write (cwrite) operation transmits resource-values data to the device in the exact order specified in the operation. For details, see [Handling LWM2M shell commands](/protocol-integration/lwm2m/#handling-shell-commands).
