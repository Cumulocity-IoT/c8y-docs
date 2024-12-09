---
weight: 60
title: Analytics
---

{{< product-c8y-iot >}} offers powerful analytics capabilities that enable businesses to extract valuable insights from their data as well as to operationalize derived insights using real-time rules. 

For this, {{< product-c8y-iot >}} comes with real-time data streaming and processing capabilities, allowing businesses to process the incoming data and turn it into insights or actions. The predefined [smart rules](/cockpit/smart-rules/) offer a wizard-driven approach to get started with data analytics, whereas the [Streaming Analytics application](/streaming-analytics/introduction-analytics/#home) offers flexibility to create even more rules, ranging from simple data transformations to more advanced business metric calculations like uptime or utilization rate, either for individual devices & assets or aggregated over a subset of the entire connected fleet. Real-time rules also allow for both triggering external workflows (such as the creation of a service ticket) as well as sending operations back to the equipment, for example, to optimize machine operations based on analytical insights.

Not all metrics and insights are solely relying on real-time incoming data. Metrics like "remaining useful life" of a device or asset include some kind of benchmark or learning based on historical data from that same or from similar devices or assets, and that is where AI and Machine Learning (ML) come in. The [{{< product-c8y-iot >}} DataHub](/datahub/datahub-overview/) makes it easy for data analysts and data scientists to access the equipment data which is required to create and/or train any kind of AI model; the support for SQL via standard ODBC/JDBC interfaces allow for a seamless integration with the data science workbench or open source tooling of choice. 

Bear in mind that the real value of AI/ML comes with the operationalization of the created models. You need to close the loop onto the incoming IoT data and switch from historical insight generation to real-time insight generation. Here again does our [Streaming Analytics application](/streaming-analytics/introduction-analytics/#home) come into play to support you in orchestrating the flow of data towards the deployed model and afterwards working with the model output to, for example, raise an alarm of trigger a workflow. For more information on machine learning capabilities, refer to the [Machine Learning introduction](/machine-learning/ml-introduction/).

