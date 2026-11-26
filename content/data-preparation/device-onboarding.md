---
weight: 55
title: Device onboarding
layout: bundle
sector:
  - device_management
---

When a data preparation rule produces a message containing an external ID that does not yet exist in {{< product-c8y-iot >}}, the platform automatically creates a new device and associates that external ID with it. This ensures that data flowing through your rules is never lost due to a missing device.

### Automatically created devices {#automatically-created-devices}

Each automatically created device is configured with the following properties:

| Property | Value |
|----------|-------|
| `name` | `Auto generated device for {externalIdType}/{externalId}` |
| `type` | `c8y_GeneratedDeviceType` |
| `c8y_IsDevice` | `{}` |
| `com_cumulocity_model_Agent` | `{}` |

The external ID that triggered the creation is registered as an external identity for the new device.

{{< c8y-admon-info >}}
The properties of automatically created devices cannot be customized.
{{< /c8y-admon-info >}}

{{< c8y-admon-important >}}
Every external ID that a rule produces must contain the client ID of the message. If a rule takes the external ID only from the payload or the topic, any device that can publish to the rule's topic can create devices, and can send data as another device. See [External IDs must contain the client ID](/data-preparation/smart-functions/#external-ids).
{{< /c8y-admon-important >}}
