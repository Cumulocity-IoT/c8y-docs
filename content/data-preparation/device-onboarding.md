---
weight: 50
title: Device onboarding
layout: bundle
sector:
  - device_management
---

When a data preparation rule processes an inbound message, it produces output containing an external ID that identifies the source device. If that external ID does not yet exist in {{< product-c8y-iot >}}, the platform automatically creates a new device and associates the external ID with it.

### Automatic device creation {#automatic-device-creation}

A device is created automatically whenever a data preparation rule produces a message referencing an external ID that is not already registered in the platform. This ensures that data flowing through your rules is never lost due to a missing device.

### Device properties {#device-properties}

Each automatically created device is configured with the following properties:

| Property | Value |
|----------|-------|
| `name` | `Auto generated device for {externalIDType}/{externalID}` |
| `type` | `c8y_GeneratedDeviceType` |
| `c8y_IsDevice` | `{}` |
| `com_cumulocity_model_Agent` | `{}` |

The external ID that triggered the creation is registered as an external identity for the new device.

{{< c8y-admon-info >}}
The properties of automatically created devices cannot be customized at this time.
{{< /c8y-admon-info >}}
