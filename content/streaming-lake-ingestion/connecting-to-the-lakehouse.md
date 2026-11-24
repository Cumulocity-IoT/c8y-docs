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
To create credentials, in the **Connect to DataHub** dialog or with the API, your {{< product-c8y-iot >}} user must have the ADMIN permission for "Offloading" (ROLE_OFFLOADING_ADMIN) or must be the initial tenant administrator.
{{< /c8y-admon-req >}}

You read the lakehouse with your own Apache Iceberg client, for example, a query engine, a notebook, or a business intelligence tool. The client connects to the Iceberg REST catalog of {{< product-c8y-iot >}} and signs in with a client ID and a client secret.

The [Iceberg client compatibility](https://github.com/Cumulocity-IoT/iceberg-client-compatibility) repository lists the clients that are tested against the lakehouse. For each client, it provides a connection example and shows which features of the lakehouse the client handles.

{{< c8y-admon-info >}}
Iceberg clients differ in the features of Iceberg that they support. {{< company-c8y >}} does not guarantee that the catalog works with every client and setup.
{{< /c8y-admon-info >}}

### To connect a client {#to-connect-a-client}

The **Connect to DataHub** dialog shows everything your client needs, with the values for your tenant and environment filled in.

1. In the Administration application, click **Monitoring** > **DataHub**.
2. Check in the **Health** tile that Streaming Lake Ingestion is set up for your tenant. For details, see [Summary tiles](/streaming-lake-ingestion/monitoring-streaming-lake-ingestion/#summary-tiles).
3. Click **Connect to DataHub**.
4. Next to the `credential` setting, click **Create** to create the credential, or **Replace** to replace it. The dialog masks the secret until you show it, and shows it only once: copy it before you close the dialog.
5. Copy the settings into the configuration of your client. For details, see [Catalog settings](#catalog-settings).

Your client can now read the tables of your lakehouse.

The dialog manages one credential, named `datahub`. Replacing the credential invalidates the current one, so the applications that use it lose access until you update them. To use one credential per application, see [Managing credentials with the API](#managing-credentials-with-the-api).

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

To use one credential per application, or to manage credentials from your own code, create named credentials, called principals, with the following API. Do not name one of your own principals `datahub`: replacing the credential in the **Connect to DataHub** dialog would invalidate its secret.

{{< c8y-admon-info >}}
You can create up to 100 principals per tenant.
{{< /c8y-admon-info >}}

#### To create a principal {#to-create-a-principal}

* Send a `POST` request with the name of the principal. Principal names must contain only letters and digits, without dashes or underscores, for example, `spark1` or `reporting`.

  ```shell
  curl -s -X POST \
    "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
    -u "<USER>:<PASS>"
  ```

The response contains the client ID and the client secret that your client needs to sign in to the Iceberg catalog. For details, see [Catalog settings](#catalog-settings).

```json
{
  "name":         "<NAME>",
  "clientId":     "<CLIENT_ID>",
  "clientSecret": "<CLIENT_SECRET>"
}
```

{{< c8y-admon-important >}}
The service returns the `clientSecret` only once and does not store it. Store the secret securely right after you create the principal. If you lose the secret, rotate the principal to get a new client ID and secret. For details, see [To rotate a principal](#to-rotate-a-principal).
{{< /c8y-admon-important >}}

#### To list principals {#to-list-principals}

* Send a `GET` request:

  ```shell
  curl -s \
    "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals" \
    -u "<USER>:<PASS>"
  ```

The response contains the names of all principals of your tenant.

#### To rotate a principal {#to-rotate-a-principal}

Rotate a principal to replace a lost or compromised secret. Rotating invalidates the previous secret immediately, so the clients that use it lose access until you update them. To rotate a credential without interrupting your clients, see [How can I rotate a credential without interrupting my clients?](/streaming-lake-ingestion/faq/#rotating-credentials).

* Send a `PUT` request with the name of the principal:

  ```shell
  curl -s -X PUT \
    "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
    -u "<USER>:<PASS>"
  ```

The response contains a new client ID and a new client secret.

#### To delete a principal {#to-delete-a-principal}

* Send a `DELETE` request with the name of the principal:

  ```shell
  curl -s -X DELETE \
    "https://<TENANT_DOMAIN>/service/offloading/api/v1/principals/<NAME>" \
    -u "<USER>:<PASS>"
  ```

The principal loses access to the catalog immediately.
