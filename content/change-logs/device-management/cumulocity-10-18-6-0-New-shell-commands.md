---
date: 2023-12-06T12:59:36.209Z
title: New shell commands
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device management & connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2153
version: 10.18.6.0
---
Two new LWM2M shell commands have been added.

- The new <code>executelegacy</code> command allows LWM2M execute requests with non-standard LWM2M parameters. The behavior of this operation resembles the semantics of the existing <code>execute</code> operation until version 10.15.
- The new <code>coap</code> shell command enables making raw CoAP requests to devices to facilitate non-standard communication in exceptional cases.

For details, refer to <a href="/device-integration/lwm2m/#shell-commands" class="no-ajaxy">Handling LWM2M shell commands<a/>. 
