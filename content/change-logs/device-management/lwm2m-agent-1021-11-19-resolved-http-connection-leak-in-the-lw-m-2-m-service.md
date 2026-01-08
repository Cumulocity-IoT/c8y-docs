---
date: ""
title: Resolved HTTP connection leak in the LwM2M service
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
ticket: DM-5449
version: 1021.11.19
---
Under certain conditions, HTTP connections were not being properly closed, which could eventually lead to connection pool exhaustion. This issue has been fixed, ensuring that connections are now correctly released and system stability is improved.