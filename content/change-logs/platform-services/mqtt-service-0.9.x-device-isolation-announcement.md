---
date: 2025-07-21
title: MQTT Service will enforce device isolation
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
issue: MTM-64099
---

### Introduction

The Public Preview release of the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) currently enforces *tenant* isolation.
An MQTT device (client) connected to the MQTT Service can subscribe to any topic, and receive messages published by other devices to that topic on the same tenant.
That is, there is a tenant-wide topic space shared by all the MQTT devices using the tenant.

When the MQTT Service transitions from Public Preview to General Availability (GA), the MQTT Service will enforce *device* isolation.
An MQTT device will still be able to subscribe to any topic, but it will not **automatically** receive messages published to that topic by any other MQTT device.
However, microservices will be able to explicitly route messages between different devices.
In effect, each MQTT client identifier will have its own private topic space that is not shared with other clients, but can be accessed by microservices.

We are making this change to align the MQTT Service with the behavior of the existing [Core MQTT](/device-integration/mqtt/) capability, and to improve out-of-the-box security for typical IoT applications where direct inter-device communication is not required.

### Impact on MQTT devices and microservices connecting to the MQTT Service

This is a **breaking change** and affected applications **must** be updated to continue working after the GA version of the MQTT Service is deployed.

This change affects any application where MQTT devices exchange messages by publishing and subscribing to the same topics.
In particular it affects applications where a {{< product-c8y-iot >}} microservice connects to the MQTT Service using the MQTT protocol to exchange messages with connected MQTT devices.

Microservices that are affected by this change should **not** immediately migrate to the existing Java client SDK, as this will not be supported in the GA version.
Instead, these microservices should wait for the new MQTT Service API to be released and migrate directly to this API.
See the next section for more details of the new API.

### Impact on microservices using the MQTT Service client SDK

The existing Java client SDK for the MQTT Service will not be supported in the GA version.
It will be replaced by a new language-neutral API giving direct access to the {{< product-c8y-iot >}} Messaging Service topics used by the MQTT Service.
Details of the new API and how to use it in microservices will be announced soon.

Microservices that are affected by device isolation, and that are **not** currently using the client SDK, should wait for the new API to be available before starting their migration activity.

Microservices that are already using the Java client SDK may continue to do so until the new API is available.

### Roll-out plan

To allow customers to plan a managed migration to the new device isolation behavior, it will be rolled out in several phases, as described below.

Dates refer to when the change will reach the `eu-latest` environment; other environments will be updated later following the usual CD deployment schedule.

#### Phase 1: Introduction of device isolation
On or soon after August 4, 2025:
* Tenants currently using the MQTT Service will continue to have tenant isolation by default.
* Tenants **not** currently using the MQTT Service will have device isolation enabled if they later start to use the MQTT Service.
* A public feature toggle will be introduced, allowing tenants to be switched between tenant and device isolation under user control.

#### Phase 2: Migration during Public Preview
* Tenants starting to use the MQTT Service for the first time should develop their applications to work with device isolation.
* Tenants already using the MQTT Service should update their applications to work with device isolation.
  The feature toggle will allow these tenants to switch between isolation modes while developing and testing changes to their applications.

#### Phase 3: General Availability
The General Availability date for the MQTT Service is not yet confirmed, but will be no earlier than December 1, 2025.

When the MQTT Service becomes Generally Available:
* All tenants will be switched to use device isolation.
* Existing applications that have not migrated by this time may not function correctly.

Further announcements will be published before the start of phases 1 and 3.
