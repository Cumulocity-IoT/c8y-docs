---
date: 2025-07-21
title: MQTT Service will enforce device-level isolation
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
issue: MTM-64100
---

The Public Preview release of the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) currently enforces *tenant-level* isolation.
An MQTT client connected to the service can subscribe to any topic, and receive messages published by other clients connected to the same tenant.
That is, there is a tenant-wide topic space shared by all the MQTT clients using the the tenant.

For the upcoming Generally Available (GA) release, the MQTT Service will enforce *device-level* isolation.
A client (device) will still be able to subscribe to any topic, but it will **not** receive messages published by any other client.
In effect, each client will have its own private topic space that is not shared with other clients.

We are making this change to align the MQTT Service with the behavior of the existing [Core MQTT](/device-integration/mqtt/) capability, and to improve the out-of-the-box security for typical IoT applications where inter-device communication is not required.

This is a **breaking change** and affected applications **must** be updated to continue working after the GA release of the MQTT Service.
The change will affect any applications where MQTT clients communicate by publishing and subscribing to the same topics.
In particular it will affect applications where a {{< product-c8y-iot >}} microservice connects to the MQTT Service using MQTT rather than the client SDK, to receive messages from or send messages to MQTT devices.

Please note that breaking changes to the MQTT Service client SDK are also planned for the GA release.
These changes will be announced soon, and will allow messages to be sent to other clients, under the control of the application microservice.
Applications that will be affected by device-level isolation, and that are **not** currently using the client SDK, should wait for these changes to be announced before starting their migration activity.
Applications that are already using the client SDK may continue to do so until these changes are announced.

To allow applications to make a managed migration to the new behavior, it will be rolled out in several phases, as described below.
Dates refer to when the change will reach the `eu-latest` environment; other environments will be updated later following the usual CD deployment schedule.

#### Phase 1: Introduction of device-level isolation
On or soon after August 4, 2025:
* Tenants not currently using the MQTT Service will be switched to use device-level isolation.
* Tenants currently using the MQTT Service will continue to use tenant-level isolation.
* A public preview [feature toggle](https://cumulocity.com/api/core/#tag/Feature-toggles-API) will be introduced, allowing tenants to be switched between tenant- and device-level isolation under user control.

#### Phase 2: Migration during Public Preview
* Tenants starting to use the MQTT Service for the first time should develop their applications to work with device-level isolation.
* Tenants already using the MQTT Service should update their applications to work with device-level isolation.
The feature toggle will allow these tenants to switch between isolation modes while developing and testing changes to their applications.

#### Phase 3: General Availability
The GA date for the MQTT Service is not yet confirmed, but will be no earlier than December 1, 2025.
When the MQTT Service becomes Generally Available:
* All tenants will be switched to use device-level isolation.
Existing applications that have not migrated by this time may not function correctly.

Further announcements will be published before the start of phases 1 and 3.
