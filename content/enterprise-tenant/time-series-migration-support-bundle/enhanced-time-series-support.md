---
weight: 10
title: Enhanced time series support
layout: redirect
helpcontent:
  - label: enhanced-time-series-support
    title: Time series migration
    content: "The **Time series migration** page displays the migration status for the current tenant and its subtenants. From this page, you can schedule the selected tenants for migration. Migrated tenants require user approval and their legacy measurement collections are removed after seven days.\nNote that you might observe difficulties during migration if the DataHub application is subscribed. To learn more refer to [Analytics > DataHub](https://cumulocity.com/docs/datahub/datahub-overview/)."
---

The {{< product-c8y-iot >}} Operational Store provides an enhanced time series support (so-called time series collections) for measurements data. The following section summarizes how to enable/disable this feature.

{{< c8y-admon-info >}}
The enhanced time series support might be enabled for new tenants by default from a platform administrator.
{{< /c8y-admon-info >}}

### To configure time series support {#to-configure-time-series-support}

The enhanced time series support can be configured via a REST API as a tenant configuration.
The following example illustrates how to **enable** time series collections for a subtenant:

```http request
POST {sub-tenant-url}/tenant/options
Content-Type: application/json
{
    "category": "configuration",
    "key": "timeseries.mongodb.collections.mode",
    "value": "ENABLED"
}
```

The following example illustrates how to **disable** time series collections for a subtenant:

```http request
POST {sub-tenant-url}/tenant/options
Content-Type: application/json
{
    "category": "configuration",
    "key": "timeseries.mongodb.collections.mode",
    "value": "DISABLED"
}
```
{{< c8y-admon-info >}}
Tenant options are not inheritable from the parent tenant, that is, enabling the property on the {{< enterprise-tenant >}} does not affect the subtenants.
{{< /c8y-admon-info >}}

### Implications of the configuration {#implications-of-the-configuration}

The configuration affects the collection that stores measurement data.
By enabling or disabling the property, the system switches collections in the background.
This might lead to a situation where data resides in multiple collections.
To prevent such situations, configure the property only at the beginning of a tenant setup, ideally when no measurement data is stored yet.
Migration and seamless configuration will be part of future releases.

{{< c8y-admon-important >}}
Once enabled, avoid switching the property back to `DISABLED` as this can lead to experience data loss. Do this only in case of an issue or emergency.
{{< /c8y-admon-important >}}

### Unsupported APIs {#unsupported-apis}

The following APIs are not supported and do not have a replacement:

* `GET /measurement/measurements/{id}`
* `DEL /measurements/measurement/{id}`

The following API is partially supported:

* `DEL /measurements/measurement/`

In release 10.16+ the parameters `dateFrom` and `dateTo` are supported and must be truncated to full hours (for example, `2022-08-19T14:00:00.000Z`), otherwise an error is returned.

### To check whether time series collections are enabled {#to-check-whether-time-series-collections-are-enabled}

With the following request, you can check the value of the time series collections property:

```http request
GET /tenant/options/configuration/timeseries.mongodb.collections.mode
Content-Type: application/json
```

An example response if the configuration is enabled:

```JSON
{
"category": "configuration",
"key": "timeseries.mongodb.collections.mode",
"value": "ENABLED"
}
```

If the configuration is not set for the tenant at all, you will get a 404 response code for the request above.
