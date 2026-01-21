---
date: 
title: Changing probes setting in microservice manifests 
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65302
version: 2025.400.0
---


Previously, the host of a liveness or readiness probe of a microservice could be set in the microservice manifest. 
To avoid possible security implications, we have disabled this possibility. 

This change does not affect setting the path in the liveness and readiness probe of the microservice that is typically used.
