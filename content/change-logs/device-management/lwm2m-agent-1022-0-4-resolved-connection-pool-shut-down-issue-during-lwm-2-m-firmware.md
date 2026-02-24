---
date: '2026-02-12'
title: Resolved connection pool shutdown issue during LWM2M firmware update
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
ticket: DM-5580
version: 1022.0.4
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-12'
  - label: emea.cumulocity.com
    date: '2026-02-23'
  - label: us.cumulocity.com
    date: '2026-02-23'
---
A rare scenario in the LWM2M firmware update process has been addressed that could trigger an infinite call loop, resulting in the shutdown of the connection pool. This issue caused the LWM2M agent to lose connectivity with the core system. The underlying problem has been identified and resolved, ensuring stable firmware updates and reliable agent connectivity.
