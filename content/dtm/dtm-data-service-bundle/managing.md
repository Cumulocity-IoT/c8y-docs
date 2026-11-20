---
weight: 30
title: Managing the service
layout: redirect
---

### To manage the DTM Data Service {#enable-measurement-propagation}

In the default mode `auto`, the first data point linked to a source device enables the DTM Data Service for your tenant. It stays enabled while your tenant has data points linked to a source device. You can disable or enable it at any time. The setting applies to all assets of your tenant.

To view or change the state of the DTM Data Service:

1. Select an asset from the hierarchy on the **Assets** page and switch to the **Data points** tab.
2. Click **Manage DTM Data Service** at the top right. The dialog shows whether the DTM Data Service is enabled for your tenant.
3. Select one of the following:
   - If the DTM Data Service is enabled, click **Disable for all assets** to stop measurement propagation, or click **Close** to keep it enabled.
   - If the DTM Data Service is disabled, click **Enable for all assets** to start measurement propagation, or click **Skip for now** to keep it disabled.

![Manage DTM Data Service](/images/dtm/data-points/asset-data-points-manage-data-service.png)

When you disable the DTM Data Service, it stops propagating new device measurements to the assets. Disabling does not delete your data point links or the measurements already propagated to the assets. When you enable the DTM Data Service again, it does not propagate the device measurements received while it was disabled.

The **Data points** tab shows the **Manage DTM Data Service** button if the DTM Data Service is enabled for your tenant, or if it is disabled and your tenant has at least one linked data point. The tab hides the button in the following cases:

- Your tenant is not subscribed to the DTM Data Service.
- You do not have the permission to get the state of the DTM Data Service, see [To manage the DTM Data Service using the REST API](#manage-rest-api).
- The platform operator has set the DTM Data Service for all tenants. In this case, you cannot change the setting for your tenant.

When you link the first data point of your tenant to a source device and the DTM Data Service is not enabled yet, the dialog opens automatically after you save the link, see [On creating the first linked data point](/dtm/asset-hierarchy/#first-link-dialog). If you disabled the DTM Data Service before, the dialog asks you to enable it. You can create data point links while the DTM Data Service is disabled, but no measurements are propagated until you enable it.

{{< c8y-admon-info >}}
Only users with the ROLE_DIGITAL_TWIN_ADMIN permission can enable or disable the DTM Data Service. For other users, the dialog only shows the state of the DTM Data Service and a **Close** button. If the DTM Data Service is disabled, contact your tenant administrator to enable it or to get the ROLE_DIGITAL_TWIN_ADMIN permission.
{{< /c8y-admon-info >}}

#### To manage the DTM Data Service using the REST API {#manage-rest-api}

You can also disable or enable the DTM Data Service using the following API:

```
PUT /service/dtmdata/enabled/measurements
Content-Type: application/json

{ "mode": "off" }
```

The following modes are available:

| <span style="display: inline-block; width: 100px;">Mode</span> | Description
| ---------- | -----------
| `auto` | Default. Measurements are propagated while the tenant has data points linked to a source device.
| `on` | Measurements are always propagated.
| `off` | Measurements are not propagated. Linked data points are kept, but no asset measurements are created.

In the **Manage DTM Data Service** dialog, **Disable for all assets** sets the mode `off`. **Enable for all assets** sets the mode `auto`, or the mode `on` if the mode is already `auto`.

To get the current state of the DTM Data Service, use `GET /service/dtmdata/enabled`.

Changing the mode requires the ROLE_DIGITAL_TWIN_ADMIN permission, as described above. Getting the current state also works with the CREATE, UPDATE or ADMIN permission for permission type "Digital twin assets" or "Digital twin linking".
