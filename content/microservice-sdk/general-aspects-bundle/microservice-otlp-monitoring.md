---
weight: 95
title: Microservice monitoring
layout: redirect
---

Monitoring microservice behavior at runtime is crucial for ensuring the stability, reliability, and performance of the application.
{{< product-c8y-iot >}} allows you to export monitoring data to a customer-provided observability backend using OpenTelemetry.

The OpenTelemetry standard provides a holistic approach to collect and export application logs, metrics, and traces to monitoring systems of various vendors.
You can freely define which data is collected and to which endpoint it is sent.

OpenTelemetry is an open standard with implementations supporting several [languages](https://opentelemetry.io/docs/languages/) like Java, Python, Go, Ruby, C++.
{{< product-c8y-iot >}} provides the option of zero-code instrumentation for microservices developed with the Microservice SDK for Java. 
Refer to the [Microservice SDK for Java](/microservice-sdk/java/#otlp-configuration) section for details.


