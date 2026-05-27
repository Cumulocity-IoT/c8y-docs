---
weight: 55
title: Device onboarding
layout: bundle
sector:
  - device_management
---

### Automatically created devices {#automatically-created-devices}

When a data preparation rule produces a message containing an external ID that does not yet exist in {{< product-c8y-iot >}}, the platform automatically creates a new device and associates that external ID with it. This ensures that data flowing through your rules is never lost due to a missing device.

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
