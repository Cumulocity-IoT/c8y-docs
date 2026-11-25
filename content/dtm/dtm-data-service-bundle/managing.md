---
weight: 30
title: Managing the service
layout: redirect
---

### To manage the DTM Data Service {#enable-measurement-propagation}

In the default mode `auto`, the first data point linked to a source device enables the DTM Data Service for your tenant. It stays enabled while your tenant has data points linked to a source device, and turns off a few minutes after the last link is removed. You can disable or enable it at any time. The setting applies to all assets of your tenant.

To view or change the state of the DTM Data Service:

1. Select an asset from the hierarchy on the **Assets** page and switch to the **Data points** tab.
2. Click **Manage DTM Data Service** at the top right. The dialog shows whether the DTM Data Service is enabled for your tenant.
3. If the DTM Data Service is enabled, click **Disable for all assets** to stop measurement propagation. If it is disabled, click **Enable for all assets** to start it.

![Manage DTM Data Service button](/images/dtm/data-points/asset-data-points-manage-button.png)

![Manage DTM Data Service](/images/dtm/data-points/asset-data-points-manage-data-service.png)

Disabling stops the propagation of new device measurements. Your data point links and the measurements already propagated are kept. Device measurements received while the DTM Data Service was disabled are not propagated afterwards.

If the DTM Data Service is not enabled, the **Data points** tab can show a notification that points you to **Manage DTM Data Service**.

![DTM Data Service not enabled](/images/dtm/data-points/asset-data-points-service-not-enabled.png)

The **Data points** tab shows the **Manage DTM Data Service** button if the DTM Data Service is enabled, or if it is disabled and your tenant has at least one linked data point. The button is not shown in the following cases:

- Your tenant is not subscribed to the DTM Data Service.
- You do not have the permission to get the state of the DTM Data Service, see [To manage the DTM Data Service using the REST API](#manage-rest-api).
- The platform operator has set the DTM Data Service for all tenants. In this case, you cannot change the setting for your tenant.

When you link the first data point of your tenant to a source device and the DTM Data Service is not enabled yet, the dialog opens automatically after you save the link, see [On creating the first linked data point](/dtm/asset-hierarchy/#first-link-dialog). If you disabled the DTM Data Service before, the dialog asks you to enable it. You can create data point links while the DTM Data Service is disabled, but no measurements are propagated until you enable it.

![Enable DTM Data Service](/images/dtm/data-points/asset-data-points-enable-data-service.png)

{{< c8y-admon-info >}}
Only users with the ADMIN permission for the permission type "Digital twin" can enable or disable the DTM Data Service. For other users, the dialog only shows the state of the DTM Data Service and a **Close** button. If the DTM Data Service is disabled, contact your tenant administrator.
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

Changing the mode requires the ADMIN permission for "Digital twin", as described above. Getting the current state also works with the CREATE, UPDATE, or ADMIN permission for the permission type "Digital twin assets" or "Digital twin linking".
