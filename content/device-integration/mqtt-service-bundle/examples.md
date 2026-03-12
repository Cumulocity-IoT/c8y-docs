---
weight: 50
layout: redirect
title: Example MQTT Service clients
---

Source code for several example clients for the MQTT Service can be found in the <a href="https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service" target="_blank" rel="noopener noreferrer">cumulocity-examples GitHub repository</a>.
These examples may be good starting points for developing your own clients.
In addition, the <a href="https://community.cumulocity.com" target="_blank" rel="noopener noreferrer">{{< product-c8y-iot >}} Tech Community</a> is an excellent source of advice and examples for all aspects of {{< product-c8y-iot >}} development.

Refer to the *README.md* files included with each example for more information on how to build and run it.

A complete <a href="https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/java-simple-pulsar-client" target="_blank" rel="noopener noreferrer">example Java client</a> based on the code snippets in the [Integrating with microservices and external applications](#pulsar-client) section is available.
Alongside this, there is a simple <a href="https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/python-simple-mqtt-client" target="_blank" rel="noopener noreferrer">Python MQTT client</a> that can be used to simulate an MQTT device and test the operation of the Java client.
Start the Python client first to ensure messages sent to a device are received, then start the Java client.

For microservice developers, two examples are available.
The <a href="https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/java-pulsar-microservice" target="_blank" rel="noopener noreferrer">example Java microservice</a> uses the {{< product-c8y-iot >}} demonstrates how to connect to Pulsar from a Java-based microservice, consume messages from the MQTT Service, and transform messages into {{< product-c8y-iot >}} Measurements.
Likewise, there is an <a href="https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/python-pulsar-microservice" target="_blank" rel="noopener noreferrer">example Python microservice</a> that implements similar functionality using the Python language.
Both microservice examples also demonstrate how to determine the external id of a device from the MQTT messages, map this to a {{< product-c8y-iot >}} Managed Object, and create the Managed Object if it does not already exist.

The examples repository is maintained continuously, and additional examples may have been added since this documentation was written.
