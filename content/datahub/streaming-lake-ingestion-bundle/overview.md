---
weight: 10
title: Overview
layout: redirect
---

{{< c8y-admon-preview >}}
Streaming Lake Ingestion is currently in Private Preview for selected customers. It is continuously being developed, hence features described in the documentation may not be fully available or differ from the documentation text. For more information on Private Previews, see [Previewing features](/service-terms/previews/#private-preview).
{{< /c8y-admon-preview >}}

The Streaming Lake Ingestion feature in DataHub bridges the gap between real-time IoT data and large-scale analytics and artificial intelligence needs. It takes the continuous stream of IoT data flowing into {{< product-c8y-iot >}} and automatically transforms it into a queryable and AI-ready format in your data lake. This fully managed process requires no configuration to start. When enabled, it processes your data transparently, continuously, reliably, and scalably, making it available for analysis within minutes.

### From live stream to analytics

At a high level, the service consists of three parts:

* **Data ingestion**: The service subscribes to the real-time data feed from the {{< product-c8y-iot >}} Messaging Service (powered by [Apache Pulsar](http://pulsar.apache.org/)).
* **Processing and optimization**: It intelligently batches, structures, and writes this data into [Apache Iceberg](https://iceberg.apache.org/) tables within your managed data lake.
* **Data access**: The structured data is almost immediately available for high-performance querying from multiple endpoints, such as the built-in capabilities of {{< product-c8y-iot >}} Cockpit, Jupyter notebooks, AI/ML platforms like TensorFlow or PyTorch, or Business Intelligence tools like PowerBI or Tableau.

### A foundation for advanced analytics and AI

While powerful for business intelligence and ad-hoc queries, the true long-term value of your IoT data lies in its potential to fuel AI and Machine Learning (ML) models. Training accurate models for tasks like predictive maintenance or anomaly detection requires a large, clean, and historically complete dataset. The service creates precisely this: a harmonized, long-term data archive that is invaluable for any data science workflow. By providing a reliable, single source of truth, it allows your data science teams to focus on model development instead of data preparation.

### Reliability, performance, and an open standard for your data

Apache Iceberg is the strategic choice of {{< product-c8y-iot >}} to provide you with a reliable and future-proof foundation for your data lake. It is an open source table format governed by the Apache Software Foundation that has rapidly become an industry standard supported by major data platforms such as Dremio, Databricks, and Snowflake. It ensures that all your data assets remain portable and valuable for years to come.

Besides being a widely adopted industry standard, it provides the following other key advantages:

* **Transactional reliability**: Using Apache Pulsar and Apache Iceberg, {{< product-c8y-iot >}} manages your data with database-like guarantees for reliability, ensuring that your data is complete and consistent.
* **Robust schema evolution**: When your IoT data changes its structure, {{< product-c8y-iot >}} adapts your Iceberg tables automatically. Using Iceberg, new types of measurements or additional device properties are added without compromising previously stored data, and without breaking your queries and BI dashboards. This makes your data pipeline resilient to change.
* **High performance analytics**: The Iceberg catalog embedded into {{< product-c8y-iot >}} tracks detailed information about your data, allowing the {{< product-c8y-iot >}} query engine to be much smarter. It only reads the files necessary to answer a query, returning results faster. This is further improved by running regular optimization on the data lake files to ensure that data is highly clustered for the many querying uses.

In summary, by building on Apache Iceberg, {{< product-c8y-iot >}} delivers a service that is not just powerful and reliable, but fundamentally open and interoperable. Ultimately, this breaks down the traditional barrier between operational IoT data and enterprise analytics. Your IoT data can now become a first-class citizen of your data lake initiatives, empowering your analytics and AI teams to combine it seamlessly with other business data and uncover insights that span your entire organization.
