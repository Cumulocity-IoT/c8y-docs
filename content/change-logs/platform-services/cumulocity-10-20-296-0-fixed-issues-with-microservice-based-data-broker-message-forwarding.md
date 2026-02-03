---
date: 2024-04-04
title: "Data broker microservice resumes message forwarding after re-connecting to the Messaging Service"
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-V6J_FcOT2
    label: Data broker
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-57995
version: 1020.296.0
---
An issue has been resolved where the microservice-based data broker might fail to forward messages to the destination tenant after recovering from a temporary loss of connection to the Messaging Service. This connection loss could be caused by, for example, a transient network interruption or by maintenance on the Messaging Service.
