---
weight: 90
layout: redirect
title: Frequently Asked Questions
---
Q: How can I obtain device credentials for my MQTT devices?<br/>
A: The MQTT Service is not yet integrated with the {{< product-c8y-iot >}} device bootstrap process.
This support is planned for a future release.
In the meantime, follow the [Integration life cycle](/device-integration/mqtt/#integration-life-cycle) to bootstrap the device and obtain device credentials.
Once the device credentials are obtained, the device can use them to connect to the MQTT Service.

Q: Does the MQTT Service support the SmartREST 2.0 protocol?<br/>
A: Not yet.
Support for SmartREST 2.0 is planned for a future release.

Q: Why does the MQTT Service not use the standard MQTT ports 1883 and 8883?<br/>
A: Those ports are already used by {{< product-c8y-iot >}} Core MQTT.
While both MQTT implementations are operating in parallel, the MQTT Service must use different ports.
