---
weight: 90
layout: redirect
title: Frequently Asked Questions
---
Q: How can I obtain device credentials for my MQTT devices?<br/>
A: The MQTT Service is not yet integrated with the {{< product-c8y-iot >}} device bootstrap process.
This support is planned for a future release.
In the meantime, follow the [Integration lifecycle](/device-integration/mqtt/#integration-life-cycle) to bootstrap the device and obtain device credentials.
Once the device credentials are obtained, the device can use them to connect to the MQTT Service.

Q: Does the MQTT Service support the SmartREST 2.0 protocol?<br/>
A: Not yet.
Support for SmartREST 2.0 is planned for a future release.

Q: Why does the MQTT Service not use the standard MQTT ports 1883 and 8883?<br/>
A: Those ports are already used by {{< product-c8y-iot >}} Core MQTT.
While both MQTT implementations are operating in parallel, the MQTT Service must use different ports.

Q: What other ways are there to map my MQTT device payloads to {{< product-c8y-iot >}}, other than a Streaming Analytics app or a custom microservice?<br/>
A: One option is to use the <a href="https://github.com/Cumulocity-IoT/cumulocity-dynamic-mapper/" target="_blank">Dynamic Mapping Service for Cumulocity</a>.
This is a community-supported open-source component that allows many different payload formats and encodings to be mapped to the {{< product-c8y-iot >}} domain model.
Mappings can be configured using a graphical UI or by writing JavaScript code.
