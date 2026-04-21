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

