---
weight: 20
title: Subscribing to Streaming Lake Ingestion
layout: redirect
---

Streaming Lake Ingestion is an optional service in {{< product-c8y-iot >}}. To subscribe your tenant, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### Storage provided by {{< company-c8y >}} {#storage-provided-by-cumulocity}

{{< company-c8y >}} provides the object storage of your data lake. Your tenant needs no setup: when it subscribes, {{< company-c8y >}} creates its storage, and the data flow starts. To read your data, see [Using Streaming Lake Ingestion](/streaming-lake-ingestion/using-streaming-lake-ingestion/).

On dedicated environments, Streaming Lake Ingestion can write to object storage in your own cloud account instead. For details, see [Bringing your own storage](/streaming-lake-ingestion/bringing-your-own-storage/).

### Ending the subscription {#ending-the-subscription}

When the subscription of your tenant ends, the data flow stops and DataHub Query no longer shows your lake. Your data and your catalog credentials stay available for the next 30 days. During this period, you can copy your data out of the lake with an Iceberg client. For details, see [Reading the lake with an Iceberg client](/streaming-lake-ingestion/using-streaming-lake-ingestion/#reading-with-an-iceberg-client).

After this period, {{< company-c8y >}} deletes your data and your catalog credentials.

If your environment uses your own storage, {{< company-c8y >}} does not delete your data. For details, see [Bringing your own storage](/streaming-lake-ingestion/bringing-your-own-storage/).

{{< c8y-admon-important >}}
Create the catalog credentials for your Iceberg client before the subscription ends. After it ends, you cannot create or rotate credentials. The credentials you already have stay valid until {{< company-c8y >}} deletes your data. For details, see [Obtaining Iceberg catalog credentials](/streaming-lake-ingestion/using-streaming-lake-ingestion/#obtaining-iceberg-catalog-credentials).
{{< /c8y-admon-important >}}
