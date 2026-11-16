---
weight: 18
title: Using storage provided by Cumulocity
layout: redirect
---

On some environments, {{< company-c8y >}} provides the object storage for your lake. Your tenant then needs no setup: when it subscribes to Streaming Lake Ingestion, {{< company-c8y >}} creates its storage and the data flow starts. To read your data, see [Using Streaming Lake Ingestion](#using).

### Ending the subscription {#ending-the-subscription-with-provided-storage}

When the subscription of your tenant ends, the data flow stops and DataHub Query no longer shows your lake. Your data and your catalog credentials stay available for at least 30 days. During this period, you can copy your data out of the lake with an Iceberg client. For details, see [Reading the lake with an Iceberg client](#reading-with-an-iceberg-client).

After this period, {{< company-c8y >}} deletes your data and your catalog credentials.

{{< c8y-admon-important >}}
Create the catalog credentials for your Iceberg client before the subscription ends. After it ends, you cannot create or rotate credentials. The credentials you already have stay valid until {{< company-c8y >}} deletes your data. For details, see [Obtaining Iceberg catalog credentials](#obtaining-iceberg-catalog-credentials).
{{< /c8y-admon-important >}}

If your tenant subscribes again before the period ends, your data stays and the data flow resumes.
