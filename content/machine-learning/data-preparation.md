---
title: Prepare your device data (IoT DataOps)
layout: bundle
sector:
  - data_analytics
weight: 20
---

All AI/ML use cases start with defining the data requirements (next to defining the objective of the use case) and compiling a set of historical IoT data for training purposes. The IoT data, which is being ingested from the connected devices, machines or equipment is retained in the Operational Store of {{< product-c8y-iot >}} for a limited amount of time.  In order to develop and train AI/ML models, being able to easily access and leverage historical data is essential. For storing your data long-term as well as easy data extraction, we suggest using DataHub which provides you with offloading and data querying capabilities.

{{< product-c8y-iot >}} DataHub offers an **SQL-based Query Interface** for querying the data lake and enables you to connect arbitrary applications that support ODBC, JDBC, or REST protocols. As such, you can connect existing tools and applications to {{< product-c8y-iot >}}, such as:

* Business Intelligence/reporting tools (using ODBC, JDBC)  
* Data Science Workbenches (using ODBC, JDBC, python and others)   
* Arbitrary custom applications (using JDBC for Java applications, ODBC for .NET, Python, node.js, and others, or REST for web applications

![AI/ML - DataHub](/images/machine-learning-guide/ai-ml-datahub.png)

See the [DataHub documentation](/datahub/) for more information.
