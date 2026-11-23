---
title: Frequently asked questions
description: "Find answers to frequently asked questions about Streaming Lake Ingestion."
weight: 60
layout: bundle
outputs:
  - html
  - json
  - markdown
sector:
  - data_analytics
---

### How can I configure Streaming Lake Ingestion? {#configure-streaming-lake-ingestion}

Streaming Lake Ingestion stores all incoming real-time data into your lake. It has no configuration options.

Depending on your use case, you can use a combination of options outside of Streaming Lake Ingestion to influence how data appears in your lake:

* Use Edge or Data Preparation to change data to more user friendly names, execute simple calculations or route data using processing modes.
* Use Digital Twin Manager to promote data points to asset level.
* Use Streaming Analytics to create new data in your desired output format.
* Use data broker to transfer data between tenants.
* Use a so-called "gold layer" to post-process IoT data together with your IT data into an joint and aggregated target format.

### Which tools can read the lake? {#which-tools-can-read-the-lake}

You can use any Apache Iceberg client that supports the Iceberg REST catalog, for example a query engine, a notebook, or a data platform. Clients differ in which features of the lake they handle. The [Iceberg client compatibility](https://github.com/Cumulocity-IoT/iceberg-client-compatibility) repository lists the tested clients, each with a connection example and the features it handles. For the connection settings, see [Connecting to the data lake](/streaming-lake-ingestion/connecting-to-the-data-lake/).

### How can I migrate from DataHub 1.0? {#migrating-from-datahub-1}

You can run the scheduled offloading jobs of [DataHub 1.0](/datahub/) and Streaming Lake Ingestion in parallel. To migrate your postprocessing or reporting to Streaming Lake Ingestion incrementally, subscribe to Streaming Lake Ingestion and port your queries or scripts as needed:

* Streaming Lake Ingestion does not include a query engine. Run your queries or scripts with the Iceberg client of your choice. For details, see [Connecting to the data lake](/streaming-lake-ingestion/connecting-to-the-data-lake/).
* Adapt your queries or scripts to the tables of Streaming Lake Ingestion. For details, see [Understanding the data lake](/streaming-lake-ingestion/understanding-the-data-lake/).

[Contact {{< company-c8y >}} support](https://cumulocity.atlassian.net/servicedesk/customer/portals) for questions on optimizing your data lake pipelines.

### I see a device, alarm, measurement, event or operation in the operational store but not in the lake. {#data-not-in-lake}

Only changes after subscription to Streaming Lake Ingestion are visible in the lake. If you have recently subscribed and the data was not changed since then, it will not be transferred to the lake.

If the data was changed and it is not visible, check the [Active alarms](/streaming-lake-ingestion/monitoring-streaming-lake-ingestion/#active-alarms) on the **Monitoring** page:

* A schema violation alarm means that data exceeded a limit. The service rejects such data and writes it to the `cdc_rejected.trash` table. For details, see [Rejected data](/streaming-lake-ingestion/understanding-the-data-lake/#rejected-data).
* An offloading failure alarm means that the service cannot write to the lake. While the alarm is active, no new data reaches the affected tables. For details, see [Offloading failure alarms](/streaming-lake-ingestion/monitoring-streaming-lake-ingestion/#offloading-failure-alarms).

### I see a device in the lake, but not in the operational store. {#device-not-in-operational-store}

After you delete a device, the device is removed from the operational store but remains visible in the historic data in the lake for long-term reporting.


### I see a device in `latest_inventory` but not in `cdc_inventory`. Is this expected? {#latest-inventory-not-in-cdc}

Yes. The `latest_inventory` tables are pre-populated with all managed objects that existed at the time of subscription, while the `cdc_inventory` tables only record changes that occur after subscription.

### My device, alarm … appears several times in the inventory in the lake. {#duplicate-records-in-lake}

The change data capture of the device inventory (`cdc_inventory`) records all changes to devices together with the kind of change that was applied. Inspect the `eventType` property and the `lastUpdated` to understand what change was applied when.

### How can I rotate a credential without interrupting my clients? {#rotating-credentials}

Replacing the credential in the **Connect to DataHub** dialog and rotating a principal with the API both end the old secret immediately. The clients that use it lose access until you update them. To rotate a credential without an interruption, move your clients to a second principal:

1. Create a new principal with the API. For details, see [Managing credentials with the API](/streaming-lake-ingestion/connecting-to-the-data-lake/#managing-credentials-with-the-api).
2. Configure the client ID and secret of the new principal in your clients.
3. After all clients use the new principal and all queries that use the old principal have finished, delete the old principal with the API. If the old credential is the `datahub` credential of the dialog, click **Replace** in the dialog instead.

### How can I end my subscription and obtain my data? {#ending-the-subscription}

When the subscription of your tenant ends, the data flow stops. Your data and your catalog credentials stay available for the next 30 days. During this period, you can copy your data out of the lake with an Iceberg client. For details, see [Connecting to the data lake](/streaming-lake-ingestion/connecting-to-the-data-lake/).

After this period, {{< company-c8y >}} deletes your data and your catalog credentials.

{{< c8y-admon-important >}}
Create the catalog credentials for your Iceberg client before the subscription ends. After it ends, you cannot create or rotate credentials. The credentials you already have stay valid until {{< company-c8y >}} deletes your data.
{{< /c8y-admon-important >}}
