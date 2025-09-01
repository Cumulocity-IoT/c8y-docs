---
weight: 60
title: E
layout: bundle
sector:
- getting_started
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
### {{< enterprise-tenant >}} {#enterprise-tenant}

A tenant type in the [{{< product-c8y-iot >}} tenant hierarchy](/glossary/t/#tenant-hierarchy).

{{< enterprise-tenant >}}s offer additional administrative functionality compared to a {{< standard-tenant >}}, the major difference being multi-tenancy. Using an {{< enterprise-tenant >}}, you can create and manage subtenants, manage the subscribed applications/features of the subtenants, and invoice subtenants based on usage statistics. Moreover, {{< enterprise-tenant >}}s offer individual customization features, such as Branding for the creation of an individual look & feel.

See also [{{< standard-tenant >}}](/glossary/s/#standard-tenant) and [{{< management-tenant >}}](/glossary/m/#management-tenant).


### Edge Server {#edge-server}
Edge Server is an informal term sometimes used to refer to {{< product-c8y-iot >}} Edge, a single-server variant of the {{< product-c8y-iot >}} platform, designed to run in factories on industrial PCs or local servers, that is, in the same site (“onsite”) in which the IoT assets are located. For details, see the [{{< product-c8y-iot >}} Edge documentation](/{{< c8y-edge-version-major >}}/sector/edge_server/).

See also [Thick Edge](/glossary/t/#thick-edge)


### Event Processing Language (EPL) {#epl}

On top of {{< product-c8y-iot >}} you can use the Apama streaming analytics engine to define business operations for real-time processing. The operation logic is implemented in [Apama’s Event Processing Language (EPL)](/streaming-analytics/epl-apps/).
EPL covers statements, which are organized into actions and monitors. EPL files can be edited directly from within {{< product-c8y-iot >}} using the [{{< product-c8y-iot >}} Streaming Analytics](/glossary/c/#streaming-analytics) application. Alternatively, you can develop them locally using the {{< apama-vscode >}}. You can deploy your EPL files as Apama applications to {{< product-c8y-iot >}}.

For more details see the [Apama documentation]({{< link-apama-webhelp >}}).


### EPL Apps {#epl-apps}

EPL Apps is part of the [{{< product-c8y-iot >}} Streaming Analytics](/glossary/c/#streaming-analytics) application. It allows you to develop EPL apps (that is, single \*.mon files) directly within {{< product-c8y-iot >}}, written in Apama EPL. You can also import existing \*.mon files as EPL apps into {{< product-c8y-iot >}}. When you activate an EPL app from the Streaming Analytics application, you deploy it to {{< product-c8y-iot >}}.

See also [Event Processing Language (EPL)](/glossary/e/#epl) and [Analytics Builder](/glossary/a/#analytics-builder).

For more details see [Analytics > Streaming Analytics > EPL Apps](/streaming-analytics/epl-apps).


### Event {#event}

In the context of {{< product-c8y-iot >}}:

Events contain real-time information from the sensor network, such as the triggering of a door sensor. Events can also be [alarms](/glossary/a/#alarm). In addition, security-related events are shown as audit logs.

In the context of Apama:

Conceptually, an event is an occurrence of a particular item of interest at a specific time.
Apama events are used for all interactions with {{< product-c8y-iot >}}, such as listening for and creating device measurements, alarms and ({{< product-c8y-iot >}}) events.
