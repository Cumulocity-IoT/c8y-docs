---
weight: 10
title: Introduction
layout: redirect
---

{{< product-c8y-iot >}} Microservices are server-side applications fully integrated into {{< product-c8y-iot >}}'s hosting, security and API management, optionally providing high availability, scalability and multi-tenancy. You can develop your own microservices to, for example, integrate IoT-related processes into your back office software, running batch analytics on IoT data with your custom analysis logic, writing message decoders for message from your devices and many other backend use cases.

Microservices use standard REST APIs with full authentication and authorization to communicate with {{< product-c8y-iot >}}. They are, in most cases, multi-tenant, meaning they must be able to strictly separate tenants and connect to multiple tenants at the same time.

Microservices may offer their own endpoints that can be used by {{< product-c8y-iot >}} and {{< product-c8y-iot >}}-based applications, for example, for system integration purposes. Examples of such microservices are the Jasper Control Center integration and the SMS integration for sending SMS notifications to end users.

{{< product-c8y-iot >}} microservices have the following properties:

- By default, they provide REST or Websocket APIs.
- Inbound REST and Websocket endpoints are secured by {{< product-c8y-iot >}} core built-in API gateway functionality.
- Requests from one microservice to the {{< product-c8y-iot >}} REST API can be executed by either using the original user account (of the inbound request) or by using a [service user](/microservice-sdk/general-aspects/#users-and-roles).
- Multi-tenant support.

The following management features are supported:

- Microservices can be registered to individual tenants and super-tenants (that is, tenants with subtenants).
- Multi-tenant microservices can be subscribed to other tenants.

Technically, microservices are Docker containers hosted by {{< product-c8y-iot >}} and they follow specific conventions. They are typically accessed using {{< product-c8y-iot >}} REST API available under <kbd>/service/&lt;microservice-name&gt;</kbd>. They typically access {{< product-c8y-iot >}} using the documented REST API.

Developers are not restricted to any programming language when developing a microservice for {{< product-c8y-iot >}}. However, a microservice must serve as an HTTP server working on port 80 and must be encapsulated in a Docker image.

The hosting of the microservice is provided by {{< product-c8y-iot >}}. This way developers can focus on business logic and leave scaling, security, high availability and monitoring to {{< product-c8y-iot >}}. Microservices can be built on top of the API exposed by the {{< product-c8y-iot >}}. This way, {{< product-c8y-iot >}} microservices are a comfortable means to provide new functionality and extend existing ones.

![Microservice infrastructure](/images/concepts-guide/microservice_infrastructure.png)

For detailed information on developing and deploying microservices on top of {{< product-c8y-iot >}} refer to the following chapters in this section, which provide information on the general concept of microservices in {{< product-c8y-iot >}} as well as specific guidance and examples for various programming languages.
