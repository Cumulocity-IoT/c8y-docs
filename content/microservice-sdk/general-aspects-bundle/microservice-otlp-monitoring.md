---
weight: 95
title: Microservice monitoring
layout: redirect
---

### Current situation and limitatations {#current-situation-and-limitatations}

Monitoring microservice behavior at runtime is crucial for ensuring the stability, reliability, and performance of the application.
Monitoring of microservices on the {{< product-c8y-iot >}} platform is already possible to some extent, however with additional effort and some limitations:

- Server runtime metrics like memory and CPU consumption are not directly logged (if not written to the log by the application).

- All logging data is sent to the standard output and persisted temporarily by the infrastructure. 
You can access logging data via the Rest interface but limited to the last 35 MB. Logs are lost in case of a restart. 

- Although [log aggregation](https://community.cumulocity.com/t/log-aggregation-for-cumulocity-iot-microservices/7477) is possible already, 
you have to program your microservices against a specific technology like Grafana. 

The OpenTelemetry standard provides a holistic approach to collect and export application logs, metrics, and traces to monitoring systems of various vendors.
The customer can freely define which data is to be collected and to which endpoint it is to be sent to.

OpenTelemetry is an open standard with implementations supporting several [languages](https://opentelemetry.io/docs/languages/) like Java, Python, Go, Ruby, C++.
{{< product-c8y-iot >}} provides the option of zero-code instrumentation for microservices developed with the Microservice SDK for Java. 
The so-called OpenTelemetry Java agent JAR file gets attached to the JVM, and the only configuration data needed is the access information of the monitoring system. 
Detailed instructions can be found in the [Microservice SDK for Java](/microservice-sdk/java/#otlp-configuration) section.


