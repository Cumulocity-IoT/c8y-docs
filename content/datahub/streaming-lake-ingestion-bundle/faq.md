---
weight: 60
title: Frequently asked questions
layout: redirect
---

### How can I configure Streaming Lake Ingestion?

Streaming Lake Ingestion has no configuration options and stores all incoming realtime data into your lake. Depending on your use case, you can use a combination of options outside of Streaming Lake Ingestion to influence how data appears in your lake:

* Use Edge or Data Preparation to change data to more user friendly names, execute simple calculations or route data using processing modes.
* Use Digital Twin Manager to promote data points to asset level.
* Use Streaming Analytics to create new data in your desired output format.
* Use Data Broker to transfer data between tenants.
* Use a so-called "gold layer" to post-process IoT data together with your IT data into an joint and aggregated target format.

### Is DataHub Query (Dremio) required for Streaming Lake Ingestion?

DataHub Query is optional if you want to post-process or query data using own tools. Note that views are currently only generate for engines compatible with Dremio and Spark SQL. While we designed the service to be as compliant as possible with common tool restrictions, we cannot guarantee compliance with all Iceberg tools.

### I see a device, alarm, measurement, event or operation in the operational store but not in the lake.

Only changes after subscription to Streaming Lake Ingestion are visible in the lake. If you have recently subscribed and the data was not changed since then, it will not be transferred to the lake.

If the data was changed and it is not visible, check the "Alarms" overview page in the Cockpit application for warnings. You may have breached a limit. In this case, data breaching the limit is insert into the `trash` table.

### I see a device in the lake, but not in the operational store.

After you delete a device, the device is removed from the operational store but remains visible in the historic data in the lake for long-term reporting.


### I see a device in `latest_inventory` but not in `cdc_inventory`. Is this expected?

Yes. The `latest_inventory` tables are pre-populated with all managed objects that existed at the time of subscription, while the `cdc_inventory` tables only record changes that occur after subscription.

### My device, alarm … appears several times in the inventory in the lake.

The change data capture of the device inventory (`cdc_inventory`) records all changes to devices together with the kind of change that was applied. Inspect the `eventType` property and the `lastUpdated` to understand what change was applied when.
