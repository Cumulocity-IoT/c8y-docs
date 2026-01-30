---
weight: 180
title: W
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Web application {#web-application}

A {{< product-c8y-iot >}} web application is a browser-based [application](#application) hosted on the {{< product-c8y-iot >}} platform. This includes the official {{< product-c8y-iot >}} applications (such as [Cockpit](#cockpit-application), [Device Management](#device-management-application), [Administration](#administration-application), and [Streaming Analytics](#streaming-analytics)), as well as custom applications built by customers, optionally using the [{{< product-c8y-iot >}} Web SDK](#web-sdk).

{{< c8y-details title="Developer details" >}}
Web applications are managed via the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`/application/applications`) with type: HOSTED. They are uploaded as ZIP archives containing at least an *index.html* file and optionally a *cumulocity.json* file.
{{< /c8y-details >}}

### Web SDK {#web-sdk}

The {{< product-c8y-iot >}} Web SDK is a development framework that enables users to build extensions or [web applications](#web-application) for deployment on the {{< product-c8y-iot >}} platform. It provides secure API access, access to default UI components, and support for custom [branding](#branding), allowing developers to create tailored [applications](#application) that seamlessly integrate with the platform's ecosystem and maintain a consistent user experience.

See also [Web SDK](/web/introduction/) in the documentation and the [Cumulocity Developer Codex](#developer-codex).

{{< c8y-details title="Developer details" >}}
The Web SDK is a development toolkit (primarily Angular-based, `@c8y/ngx-components`, `@c8y/client`) for building web applications. It is not an API itself but enables API usage from frontend applications. All packages can be found on npm in the @c8y scope.
{{< /c8y-details >}}

### Widget {#widget}

A widget is a configurable UI component that can be added to a {{< product-c8y-iot >}} [dashboard](#dashboard) to visualize IoT data. Widgets can display maps, images, graphs, tables, and other information such as [alarms](#alarm), [measurements](#measurement), and [events](#event).

{{< c8y-details title="Developer details" >}}
Widgets are UI components configured within a dashboard's managed object. The configuration for each widget is stored as a JSON object within the dashboard's data. Custom widgets are developed using the Web SDK. There is no dedicated API for widgets.
{{< /c8y-details >}}

### Wire (Analytics Builder) {#wire}

In [Analytics Builder](#analytics-builder), wires are used to connect two or more [blocks](#block) with each other for data transfer between the output port of one block and the input port of another block.
