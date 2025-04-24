---
weight: 20
title: A
layout: bundle
sector:
  - getting_started
---

### Administration application {#administration-application}

The Administration application is one of the default applications of {{< product-c8y-iot >}}.
The Administration application enables administrators to manage their tenants, users, roles and applications. It also allows them to configure various settings for their accounts.

For details see [Platform administration > {{< standard-tenant >}} administration](/standard-tenant/).


### Agent {#agent}

Agents are software components which translate the device-specific interface protocol into a single reference protocol and enable secure bi-directional communication in various network architectures.


### Alarm {#alarm}

An alarm represents an [event](/glossary/e/#event) that requires an intervention. The user or operator of the system must take action to resolve the alarm (like a power outage).


### Analytics Builder {#analytics-builder}

Analytics Builder is part of the [{{< product-c8y-iot >}} Streaming Analytics](/glossary/c/#streaming-analytics) application. It allows you to build analytic models that transform or analyze streaming data in order to generate new data or output events. The models are capable of processing data in real time.

See also [EPL Apps](/glossary/e/#epl-apps).

For details see [Analytics > Streaming analytics > Analytics Builder](/streaming-analytics/analytics-builder).


### Application {#application}

The {{< product-c8y-iot >}} User Interface (UI) is based on applications. By default, the {{< product-c8y-iot >}} UI consists of three main default applications: [Administration](/glossary/a/#administration-application), [Cockpit](/glossary/c/#cockpit-application) and [Device Management](/glossary/d/#device-management-application).

{{< product-c8y-iot >}} is designed to accommodate arbitrary vertical IoT applications in addition to its generic functionality. These applications can have two forms:

* web-based user interface applications (web applications)
* server-side business logic through microservices (microservices)

For details see [Getting started > Technical concepts > Application enablement](/concepts/applications/).


### Application switcher {#application-switcher}

The application switcher is a UI component which shows all {{< product-c8y-iot >}} applications the user has access to and allows switching between these applications.


### Asset {#asset}

Assets represent business objects in general like buildings, machines, production units or cars.
In {{< product-c8y-iot >}}, assets are organized in hierarchies which are composed of two types of objects:

* Groups: Objects which group single devices or other groups.
* Devices: Devices which can be linked into the asset hierarchy, after being connected to {{< product-c8y-iot >}}.

For details see [Application enablement & solutions > Cockpit > Managing assets](/cockpit/managing-assets).
