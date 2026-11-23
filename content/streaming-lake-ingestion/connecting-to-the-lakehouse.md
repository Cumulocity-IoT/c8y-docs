---
title: Connecting to the lakehouse
description: "Create a credential for your Apache Iceberg client in the Connect to DataHub dialog or with the API, and connect the client to the lakehouse of Streaming Lake Ingestion."
weight: 20
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - data_analytics
---

{{< c8y-admon-req >}}
To create credentials, in the **Connect to DataHub** dialog or with the API, your {{< product-c8y-iot >}} user must have the ROLE_OFFLOADING_ADMIN or ROLE_TENANT_ADMIN permission.
{{< /c8y-admon-req >}}

You read the lakehouse with your own Apache Iceberg client, for example a query engine, a notebook, or a business intelligence tool. The client connects to the Iceberg REST catalog of {{< product-c8y-iot >}} and signs in with a client ID and a client secret.

The [Iceberg client compatibility](https://github.com/Cumulocity-IoT/iceberg-client-compatibility) repository lists the clients that are tested against the lakehouse. For each client, it provides a connection example and shows which features of the lakehouse the client handles.

{{< c8y-admon-info >}}
While Iceberg is widely supported, the degree of support currently still varies and we cannot guarantee the catalog to be interoperable with all setups and applications.
{{< /c8y-admon-info >}}

### To connect a client {#to-connect-a-client}

The **Connect to DataHub** dialog shows everything your client needs, with the values for your tenant and environment filled in.

1. In the Administration application, click **Monitoring** > **DataHub**.
2. Check in the **Health** tile that Streaming Lake Ingestion is set up for your tenant. For details, see [Summary tiles](/streaming-lake-ingestion/monitoring-streaming-lake-ingestion/#summary-tiles).
3. Click **Connect to DataHub**.
4. Next to the `credential` setting, click **Create** to create the credential, or **Replace** to replace it. The dialog masks the secret until you show it, and shows it only once: copy it before you close the dialog.
5. Copy the settings into the configuration of your client. For details, see [Catalog settings](#catalog-settings).

Your client can now read the tables of your lakehouse.

The dialog manages one credential, named `datahub`. Replacing the credential ends the current one, so the applications that use it lose access until you update them. To use one credential per application, see [Managing credentials with the API](#managing-credentials-with-the-api).

#### Catalog settings {#catalog-settings}

The dialog shows the following settings of the Iceberg REST catalog:

| Setting | Value |
| ------- | ----- |
| `type` | `rest` |
| `uri` | `https://iceberg.<INSTANCE>/api/catalog` |
| `warehouse` | `<TENANT_ID>` |
| `credential` | `<CLIENT_ID>:<CLIENT_SECRET>` |
| `oauth2-server-uri` | `https://iceberg.<INSTANCE>/api/catalog/v1/oauth/tokens` |
| `scope` | `PRINCIPAL_ROLE:ALL` |
| `header.X-Iceberg-Access-Delegation` | `vended-credentials` |

If you create the credential with the API, fill in the values yourself. Replace `<INSTANCE>` with the domain of your environment, `<TENANT_ID>` with your tenant ID, and `<CLIENT_ID>` and `<CLIENT_SECRET>` with the `clientId` and `clientSecret` of the principal. For example, if your tenant is `mytenant.cumulocity.com`, the catalog URI is `https://iceberg.cumulocity.com/api/catalog`. Some clients use other names for these settings. For the names your client uses, see its connection example in the [Iceberg client compatibility](https://github.com/Cumulocity-IoT/iceberg-client-compatibility) repository.

The `header.X-Iceberg-Access-Delegation` setting is required. With it, the catalog gives your client a short-lived, read-only storage credential for each table. Without it, tables load but reading data fails.

### Managing credentials with the API {#managing-credentials-with-the-api}

To use one credential per application, or to manage credentials from your own code, create named credentials, called principals, with the following API. Do not name one of your own principals `datahub`: replacing the credential in the **Connect to DataHub** dialog would end its secret.

**Creating a principal**

Send a `POST` request to create a named principal. Principal names must contain letters and digits only, no dashes or underscores (for example, `spark1` or `reporting`). The response contains the `clientId` and `clientSecret` required to authenticate against the Iceberg catalog. To use them in your client, see [Catalog settings](#catalog-settings).

```shell
curl -s -X POST \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

```json
{
  "name":         "<NAME>",
  "clientId":     "<CLIENT_ID>",
  "clientSecret": "<SECRET>"
}
```

{{< c8y-admon-important >}}
The `clientSecret` is returned only once and is never stored by the service. Store it securely immediately after creation. If the secret is lost, rotate the principal with a `PUT` request to issue a new client ID and secret. Rotating invalidates the previous secret immediately.
{{< /c8y-admon-important >}}

**Listing principals**

To list the names of all principals for your tenant:

```shell
curl -s \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals" \
  -u "<USER>:<PASS>"
```

**Rotating credentials**

To replace a lost or compromised secret. The response contains a new client ID and secret, and the previous secret is invalidated immediately. To rotate a credential without interrupting your clients, see [How can I rotate a credential without interrupting my clients?](/streaming-lake-ingestion/faq/#rotating-credentials).

```shell
curl -s -X PUT \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

**Deleting a principal**

To revoke a principal's catalog access immediately:

```shell
curl -s -X DELETE \
  "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
  -u "<USER>:<PASS>"
```

{{< c8y-admon-info >}}
A maximum of 100 principals can be created per tenant by default.
{{< /c8y-admon-info >}}
