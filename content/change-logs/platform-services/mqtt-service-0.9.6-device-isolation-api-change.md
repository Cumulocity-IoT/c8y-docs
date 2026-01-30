---
date: 2025-08-07
title: MQTT Service device isolation is enabled by default
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
issue: MTM-64099
version: 0.9.6
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

### Introduction

As [previously announced](/change-logs/#mqtt-service-0.9.x-device-isolation-announcement), when the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) transitions from Public Preview to General Availability (GA), the MQTT Service will enforce **device** isolation.
MQTT devices will be able to subscribe to any topic, but will not automatically receive messages published to that topic by other devices.
Microservices will be able to explicitly route messages between different devices.
In effect, each MQTT client identifier will have its own private topic space that is not shared with other clients, but can be accessed by microservices.

{{< c8y-admon-info >}}
Device isolation is enabled by default for any tenant using the MQTT Service for the first time.
{{< /c8y-admon-info >}}

Tenants already using the MQTT Service can continue to use the deprecated tenant isolation approach, but should migrate their applications to work with device isolation as soon as possible.
A feature toggle is available to allow these tenants to switch between isolation models while updating their applications.

We are making this change to align the MQTT Service with the behavior of the existing [Core MQTT](/device-integration/mqtt/) capability, and to improve out-of-the-box security for typical IoT applications where direct inter-device communication is not required.

### Device versus tenant isolation

The difference between the two isolation models can be explained using a simple example.

Assume that a tenant has two MQTT clients connected to the MQTT Service, with client identifiers `publish-client` and `subscribe-client`, and that `subscribe-client` has subscribed to the topic `my-topic`.

Then, `publish-client` publishes a message to `my-topic`:
* If the tenant is using _device_ isolation, `subscribe-client` **will not** receive that message.
* If the tenant is using _tenant_ isolation, `subscribe-client` **will** receive the message.

A microservice can receive all messages published by all MQTT clients, and choose whether to forward messages to other clients.

### Impact on MQTT devices and microservices connecting to the MQTT Service

This is a **breaking change** and affected applications **must** be updated to continue working after the GA version of the MQTT Service is deployed.

This change affects any application where MQTT devices exchange messages by publishing and subscribing to the same topics.
In particular it affects applications where a {{< product-c8y-iot >}} microservice connects to the MQTT Service using the MQTT protocol to exchange messages with connected MQTT devices.

Existing microservices that are affected by this change should **not** immediately migrate to the existing Java client SDK, as this will not be supported in the GA version.
Instead, these microservices should wait for the new MQTT Service API to be released and migrate directly to this API.
Details of the new API and how to use it in microservices will be announced soon.

### Switching between isolation models

Tenants can switch between the device and tenant isolation models using the `mqtt-service.tenant.isolation` [feature toggle](https://cumulocity.com/api/core/#tag/Feature-toggles-API).

The feature toggle is set to `true` by default for tenants that are already using the MQTT Service, to maintain the deprecated tenant isolation behavior.
These tenants can use the feature toggle to switch between isolation modes while developing and testing their migration to device isolation.

For all other tenants, the feature toggle is set to `false` and **should not be changed**.

To set the feature toggle to `false`, the following HTTP PUT request must be sent to the tenant.
This example uses the _curl_ command, but any equivalent tool that can send HTTP requests can be used:
```shell
curl --location --request PUT "https://<TENANT_DOMAIN>/features/mqtt-service.tenant.isolation/by-tenant" \
--header "Authorization: Basic <AUTHORIZATION>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data-raw '{ "active":false }'
```

Where `<TENANT_DOMAIN>` is the domain name of the tenant, for example `my-tenant.cumulocity.com`, and `<AUTHORIZATION>` is a Base64-encoded HTTP Basic Authentication token for the tenant, constructed as described in the [API documentation](https://cumulocity.com/api/core/#section/Authentication/Basic).

A similar request can be sent to set the feature toggle back to `true`:
```shell
curl --location --request PUT "https://<TENANT_DOMAIN>/features/mqtt-service.tenant.isolation/by-tenant" \
--header "Authorization: Basic <AUTHORIZATION>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data-raw '{ "active":true }'
```
