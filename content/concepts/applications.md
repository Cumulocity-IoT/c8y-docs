---
title: Developing applications
layout: bundle
weight: 40
sector:
  - getting_started
---

{{< product-c8y-iot >}} is designed to accommodate arbitrary vertical IoT applications in addition to its generic functionality.

{{< product-c8y-iot >}} includes the following application types:

 * [Web applications or extensions](#web-applications) - web-based user interface applications
 * [Microservices](/microservice-sdk/general-aspects/) - server-side business logic

Web applications are HTML5 single page applications, that appear in the {{< product-c8y-iot >}} application switcher and that are hosted in the {{< product-c8y-iot >}} platform. You can either develop your own web application or extend existing applications with plugins.

Microservices are Docker containers, hosted by {{< product-c8y-iot >}} and exposing a REST API.

Applications regardless of their form are identified by a so-called *application key*. The application key enables {{< product-c8y-iot >}} to associate a REST request from an application with the particular application. The application key is the unique identifier of the application and should remain unchanged in all versions of that application. See the section on [Application management](https://{{< domain-c8y >}}/api/core/#tag/Application-API) in the {{< openapi >}}.

Super tenants ({{< management-tenant >}}s or {{< enterprise-tenant >}}s) can subscribe subtenants to {{< product-c8y-iot >}} applications deployed by them. This provides a basic application marketplace.
