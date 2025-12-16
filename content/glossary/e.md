---
weight: 60
title: E
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Edge Server {#edge-server}

Edge Server is an informal term for {{< product-c8y-iot >}} Edge. See [{{< product-c8y-iot >}} Edge](#edge).  


### {{< enterprise-tenant >}} {#enterprise-tenant}

An {{< enterprise-tenant >}} is a [tenant](#tenant) type in the {{< product-c8y-iot >}} [tenant hierarchy](#tenant-hierarchy) that provides advanced administrative capabilities, primarily focused on managing multiple [subtenants](#subtenant). An {{< enterprise-tenant >}} (sometimes also referred as “parent” tenant) can create, manage, and bill its own subtenants and enables features like custom [branding](#branding), custom domain names, and [user hierarchies](#user-hierarchy).

See also [Enterprise tenant administration](/enterprise-tenant/enterprise-tenant-introduction/) in the documentation.

{{< c8y-details title="Developer details" >}}
Enterprise tenants use specific administrative endpoints for detailed configuration such as a tenant domain or an email template. Subtenant management is performed via the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (POST /tenant/tenants). Application and branding subscriptions for subtenants are managed via POST /tenant/tenants/{tenantId}/applications. 
{{< /c8y-details >}}


### EPL (Event Processing Language) {#epl}

[Apama](#apama) EPL is a domain-specific, event-driven programming language with a syntax similar to Java, designed for writing programs that process [events](#event) in realtime. In {{< product-c8y-iot >}}, EPL logic is typically implemented as [EPL apps](#epl-apps) within the [Streaming Analytics](#streaming-analytics) application.  


### EPL Apps {#epl-apps}

EPL Apps is part of the [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics) application. It allows you to develop a single-file EPL application directly within {{< product-c8y-iot >}} using [Apama](#apama) [EPL](#epl), giving you a pro-code environment to define your streaming analytics applications.   

{{< c8y-details title="Developer details" >}}
EPL Apps are managed via the Streaming Analytics UI. The [Apama EPL Apps Tools GitHub repository](https://github.com/Cumulocity-IoT/apama-eplapps-tools) includes tools to help with testing and deploying EPL apps from the command line or a CI/CD environment.
{{< /c8y-details >}}


### Event {#event}

A {{< product-c8y-iot >}} event is a time-stamped informational record that transmits real-time information on any state change of a [device](#device) or [asset](#asset).
Next to {{< product-c8y-iot >}} events, the following types of events are used within the {{< product-c8y-iot >}} platform:
- In [Apama](#apama) ([Streaming Analytics](#streaming-analytics)), an "event" is the fundamental data structure for all interactions.
- [Alarms](#alarm) are a special type of event.
- [Audit logs](#audit-log) are security-relevant events.

{{< c8y-details title="Developer details" >}}
Events are managed via the [Event API](https://cumulocity.com/api/core/#tag/Events) (`/event/events`). Key properties include type, time, text, and source.
{{< /c8y-details >}}

### Export {#export}

Export is a feature of the [Cockpit application](#cockpit-application) that allows users to extract a limited amount of platform data, such as [measurements](#measurement), [alarms](#alarm), or [events](#event), into CSV or XLSX files. Exports can be configured with filters for specific [devices](#device), time ranges, and data fields. The scheduling of recurring exports is a key function, managed by the report-agent microservice and configured within the Cockpit application.

See also [Exports](/cockpit/exports/) in the documentation.

{{< c8y-details title="Developer details" >}}
Export configurations are managed as a special type of managed object via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). The object's JSON payload contains fragments defining the export parameters (filters, fields, file type) and schedule. The report-agent microservice reads these managed objects to execute scheduled exports. Manual exports triggered from the UI are also handled by this backend service, which sends the user an email with a download link.
{{< /c8y-details >}}

### Extensions {#extensions}

Extensions are official or community-supported packages that add new functionalities to the {{< product-c8y-iot >}} platform. They can include plugins, which add features to existing [applications](#application) at runtime, or blueprints, which are combinations of preconfigured UI functionalities for creating new applications.

For information about uploading extensions for Analytics Builder, see [Creating your own blocks](/streaming-analytics/analytics-builder/#creating-your-own-blocks).

{{< c8y-details title="Developer details" >}}
There is no central API for an "extensions library." Individual extensions are bundled into a package which is installed as an application via the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`/application/applications`) and contains an `isPackage` flag inside the manifest. Additionally, extensions use the Versioning API, to ensure compatibility when they are integrated into an application.
{{< /c8y-details >}}
