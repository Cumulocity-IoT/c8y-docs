---
weight: 10
title: Overview
layout: redirect
---

{{< c8y-admon-preview >}}
Streaming Lake Ingestion is currently in preview. It is continuously being developed. Features described in the documentation may not be fully available in your tenant, or differ from the documentation text. For more information on previews, see [Previewing features](/service-terms/previews/). For limitations of the preview, see [Current preview limitations](#limitations).
{{< /c8y-admon-preview >}}

The Streaming Lake Ingestion feature in DataHub bridges the gap between real-time IoT data and large-scale business analytics and artificial intelligence needs. It takes the continuous stream of IoT data flowing into {{< product-c8y-iot >}} and automatically transforms it into a queryable and AI-ready format in your data lake. This fully managed process requires no configuration to start. When enabled, it processes your data transparently, continuously, reliably, and scalably, making it available for analysis within minutes.

### From live stream to analytics

At a high level, the service consists of three parts:

* **Data ingestion**: The service subscribes to the real-time data feed from the {{< product-c8y-iot >}} Messaging Service (powered by [Apache Pulsar](http://pulsar.apache.org/)).
* **Processing and optimization**: It intelligently batches, structures, and writes this data into [Apache Iceberg](https://iceberg.apache.org/) tables within your data lake.
* **Data access**: The structured data is almost immediately available for high-performance querying from multiple endpoints, such as the built-in capabilities of {{< product-c8y-iot >}} Cockpit, Jupyter notebooks, AI/ML platforms like TensorFlow or PyTorch, or Business Intelligence tools.

### A foundation for advanced analytics and AI

While powerful for business intelligence and ad-hoc queries, the true long-term value of your IoT data lies in its potential to fuel AI and Machine Learning (ML) models. However, raw device data alone is not enough. Technical data from your devices—such as PLC registers or sensor values—exists as cryptic identifiers (for example, `register_012f` or `sensor_4a2b`). These identifiers are typically associated with sensors and machine components, not with business-level assets. For AI and ML models to be useful, this raw data must be transformed into understandable, business-meaningful information.

{{< product-c8y-iot >}} and Streaming Lake Ingestion provide precisely this functionality:
* To automatically maintain cleaned, harmonized and historically complete data in a long-term data archive for any data science workflow, so that your data science team can focus on model development instead of data preparation.
* To contextualize it into business-relevant assets through **Digital Twin Manager**'s **Data Service** so that AI models can understand what the data represents and extract meaningful insights.

### Reliability, performance, and an open standard for your data

Apache Iceberg is the strategic choice of {{< product-c8y-iot >}} to provide you with a reliable and future-proof foundation for your data lake. It is an open source table format governed by the Apache Software Foundation that has rapidly become an industry standard supported by major data platforms such as Dremio, Databricks, and Snowflake. It ensures that all your data assets remain portable and valuable for years to come.

Besides being a widely adopted industry standard, it provides the following other key advantages:

* **Transactional reliability**: Using Apache Pulsar and Apache Iceberg, {{< product-c8y-iot >}} manages your data with database-like guarantees for reliability, ensuring that your data is complete and consistent.
* **Robust schema evolution**: When your IoT data changes its structure, {{< product-c8y-iot >}} adapts your Iceberg tables automatically. Using Iceberg, new types of measurements or additional device properties are added without compromising previously stored data, and without breaking your queries and BI dashboards. This makes your data pipeline resilient to change.
* **High performance analytics**: The Iceberg catalog embedded into {{< product-c8y-iot >}} tracks detailed information about your data, allowing query engines and analytics tools to be much smarter. They can only read the files necessary to answer a query, returning results faster. This is further improved by running regular optimization on the data lake files to ensure that data is highly clustered for the many querying uses.

In summary, by building on Apache Iceberg and its standard REST catalog APIs, {{< product-c8y-iot >}} delivers IoT data as an open, vendor-neutral asset. Rather than forcing you into a proprietary ecosystem, your IoT data can be accessed and queried through the same tools and infrastructure you already use for your corporate data lake — whether that is Snowflake, Databricks, Dremio, or other platforms. This makes IoT data a true first-class citizen in your enterprise data initiatives. Your data science and analytics teams can seamlessly integrate IoT data with other business data sources without architectural compromises, breaking down the traditional barrier between operational IoT data and enterprise analytics to uncover insights that span your entire organization.
