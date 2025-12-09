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


### EPL (Event Processing Language) {#epl}

[Apama](#apama) EPL is a domain-specific, event-driven programming language with a syntax similar to Java, designed for writing programs that process [events](#event) in realtime. In {{< product-c8y-iot >}}, EPL logic is typically implemented as [EPL apps](#epl-apps) within the [Streaming Analytics](#streaming-analytics) application.  


### EPL Apps {#epl-apps}

EPL Apps is part of the [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics) application. It allows you to develop a single-file EPL application directly within {{< product-c8y-iot >}} using [Apama](#apama) [EPL](#epl), giving you a pro-code environment to define your streaming analytics applications.   


### Event {#event}

A {{< product-c8y-iot >}} event is a time-stamped informational record that transmits real-time information on any state change of a [device](#device) or [asset](#asset).
Next to {{< product-c8y-iot >}} events, the following types of events are used within the {{< product-c8y-iot >}} platform:
- In [Apama](#apama) ([Streaming Analytics](#streaming-analytics)), an "event" is the fundamental data structure for all interactions.
- [Alarms](#alarm) are a special type of event.
- [Audit logs](#audit-log) are security-relevant events.


### Export {#export}

Export is a feature of the [Cockpit application](#cockpit-application) that allows users to extract a limited amount of platform data, such as [measurements](#measurement), [alarms](#alarm), or [events](#event), into CSV or XLSX files. Exports can be configured with filters for specific [devices](#device), time ranges, and data fields. The scheduling of recurring exports is a key function, managed by the report-agent microservice and configured within the Cockpit application.   


### Extensions {#extensions}

Extensions are official or community-supported packages that add new functionalities to the {{< product-c8y-iot >}} platform. They can include plugins, which add features to existing [applications](#application) at runtime, or blueprints, which are combinations of preconfigured UI functionalities for creating new applications.
