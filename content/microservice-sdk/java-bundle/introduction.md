---
weight: 10
layout: redirect
title: Introduction
---


This section describes how to develop and deploy microservices on top of {{< product-c8y-iot >}} using the Microservice SDK for Java. It also contains a [Hello world tutorial](#java-hello-world-tutorial) that you may follow to get the basics of developing microservices using Java. After you have successfully deployed your first microservice to {{< product-c8y-iot >}}, you may also continue with the section [Developing microservices](#developing-microservice) to learn more about other features and capabilities of the SDK.

{{< c8y-admon-info >}}
You can develop microservices for {{< product-c8y-iot >}} with any IDE and build tool that you prefer, but this section focuses on Maven and some troubleshooting for Eclipse.
{{< /c8y-admon-info >}}

These are some useful references to get started with the basic technologies underlying the SDK:

- The client libraries use the {{< product-c8y-iot >}} REST interfaces as underlying communication protocol as described in the section [Using the REST interface](/microservice-sdk/rest).
- All examples are open source and can be reviewed at the [{{< product-c8y-iot >}} microservices examples]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/microservices) repository.

{{< c8y-admon-important >}}
You must have at least version 11 of the [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed in your development environment as older versions of the JRE and JDK are not updated with the latest security patches and are not recommended for use in production.
{{< /c8y-admon-important >}}

If you face any issue or need technical support, refer to [{{< company-sag >}} {{< sag-dev-community >}}]({{< link-sag-dev-community >}}). You will find plenty of useful information there.
