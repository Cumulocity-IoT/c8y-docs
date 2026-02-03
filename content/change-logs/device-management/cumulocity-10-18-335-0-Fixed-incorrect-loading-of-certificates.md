---
date: 2023-12-06T10:35:36.869Z
title: Fixed incorrect loading of certificates
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-55328
version: 10.18.335.0
---
Fixed an issue with incorrect loading of certificates to the trust store during core startup/restart, which caused errors in authenticating MQTT devices using certificates.
