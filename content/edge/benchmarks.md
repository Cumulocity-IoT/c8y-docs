---
weight: 100
title: Benchmarks
layout: bundle
sector:
  - edge
---
{{< c8y-admon-caution >}}
These internal benchmark results are for illustrative purposes only and cannot precisely replicate your specific hardware or application behavior.

Validate your sizing requirements by testing your actual application with realistic data and measuring the actual resource requirements.
{{< /c8y-admon-caution >}}

These end-to-end test scenarios drive a number of MQTT clients sending measurements into the platform. The clients are connecting to the [MQTT service](/device-integration/mqtt-service) and sending measurements using the [JSON via MQTT protocol](/smartrest/json-via-mqtt/). The measurements are sent in PERSISTENT [processing mode](https://cumulocity.com/api/core/#section/REST-implementation/HTTP-usage) and stored in the operational store. All measurements are received and processed by Streaming Analytics at the rate they are sent into the platform.

The **Narrow** scenario features a small number of MQTT clients, each of them sending an equal and high rate of measurements per second into the platform, recording the aggregate throughput across all clients. The **Wide** scenario features a very large number of devices each of them sending 1 measurement per second into the platform. The maximum achievable result is the best result that could be achieved without Edge running out of CPU and RAM.

| Scenario                                       | CPU threads | RAM  | Maximum achievable result |
|------------------------------------------------|-------------|------|-----------------------------|
| **Narrow** - 10 clients connected              | 8           | 16GB | 25000 measurement/s |
|                                                | 16          | 32GB | 47500 measurement/s |
| **Wide** - Each client sending 1 measurement/s | 8           | 16GB | 1200 connected clients |
|                                                | 16          | 32GB | 2200 connected clients |
