---
weight: 100
title: Benchmarks
layout: bundle
sector:
  - edge
---
{{< c8y-admon-caution >}}
The results in this section are to give a very rough impression of what can be achieved with a {{< product-c8y-iot >}} Edge installation, on given hardware. They are based on benchmark tests run internally that can never precisely mimic the variety of realistic applications for an Edge installation, nor mimic the exact hardware used in your environment.

When sizing your Edge installation, execute tests with realistic data against your actual application before committing to any specific hardware.
{{< /c8y-admon-caution >}}

These test scenarios drive a number of MQTT clients sending measurements into the platform. They are connecting to the [MQTT service](/device-integration/mqtt-service) using the [JSON via MQTT protocol](/smartrest/json-via-mqtt/). All measurements go into Streaming Analytics, and the test asserts that they are received at the rate they are sent into the platform.

The **Narrow** scenario features a small number of MQTT clients sending a very high rate of measurements into the platform. The **Wide** scenario features a very large number of devices sending 1 measurement/s into the platform. In both of these the test measures how far it can push the scenario just short of running out of CPU and RAM.

| Scenario                                       | CPU threads | RAM  | Maximum achievable result |
|------------------------------------------------|-------------|------|-----------------------------|
| **Narrow** - 10 clients connected              | 8           | 16GB | 2500 measurements per second per client |
|                                                | 16          | 32GB | 4750 measurements per second per client |
| **Wide** - Each client sending 1 measurement/s | 8           | 16GB | 1200 connected clients |
|                                                | 16          | 32GB | 2200 connected clients |
