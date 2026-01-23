---
weight: 5
title: Introduction
layout: redirect
---

This section details the mechanisms for integrating non-IP devices. {{< product-c8y-iot >}} provides native connectors for three major LPWAN connectivity providers including [Loriot](/lpwan-bundle/loriot-lora.md), [Actility](/lpwan-bundle/actility-lora), and [Sigfox](/lpwan-bundle/sigfox.md). These connectors abstract the vendor-specific APIs required for device provisioning and data retrieval.

This section documents the configuration and operation of the LPWAN agent, which performs the following core functions:

- **Ingestion** - Receives uplink messages from Sigfox, Loriot, or Actility (ThingPark) backends.
- **Normalization** - Decouples the connectivity provider from the device logic, allowing devices to be managed using standard {{< product-c8y-iot >}} interfaces.
- **Translation** - Routes binary payloads through user-defined device protocols to extract measurements, events, and alarms.
- **Downlink management** - Queues and forwards commands to the Network Server APIs for transmission to the device.