---
weight: 40
title: C
layout: bundle
sector:
  - getting_started
---

### Cockpit application {#cockpit-application}

The Cockpit application is one of the default applications of {{< product-c8y-iot >}}. It provides options to manage and monitor IoT assets and data from a business perspective, like managing assets, visualizing data, working with dashboards and managing reports.

For details see [Application enablement & solutions > Cockpit](/cockpit/).

### Component {#component}

In the change logs (or release notes for yearly releases respectively) changes can be filtered for various parameters one of which is the component. Components reflect functional subcategories from a user perspective, for example, "Administration" or "Authentication".

See also [Product area](/glossary/c/#product-area).


### Continuous Deployment model {#continuous-deplyoment-model}

In the {{< product-c8y-iot >}} Continuous Deployment (CD) model, the different components of the {{< product-c8y-iot >}} platform are updated on a continuous basis. This means a frequent deployment of small incremental improvements. Continuous updates provide customers with a steady stream of enhancements, bug fixes, and new functionalities as they become available.

See also [Private Preview](/glossary/p/#private-preview), [Public Preview](/glossary/p/#public-preview) and [General Availability](/glossary/g/#ga).


### {{< product-c8y-iot >}} Core {#core}

{{< product-c8y-iot >}} is the foundation of the {{< product-c8y-iot >}} platform. It comprises all major components such as the default [applications](/glossary/a/#application) (Administration, Cockpit and Device Management), the [{{< product-c8y-iot >}} operational store](/glossary/c/#operational-store), [microservices](/glossary/m/#microservices), [REST API](/glossary/r/#rest-api), [MQTT API](/glossary/m/#mqtt), and [smart rules](/glossary/s/#smart-rules).


### {{< product-c8y-iot >}} DataHub {#datahub}

{{< product-c8y-iot >}} Datahub is a {{< product-c8y-iot >}} application for offloading data from the operational store of {{< product-c8y-iot >}} to a data lake and querying the data lake contents.

For details see [Analytics > DataHub](/datahub/datahub-overview/).


### {{< product-c8y-iot >}} Edge {#edge}

{{< product-c8y-iot >}} Edge is the onsite solution of {{< product-c8y-iot >}} intended to run as a local software application on industrial PC’s or local servers.

For details see [Edge](/edge/edge-introduction/).


### {{< product-c8y-iot >}} operational store {#operational-store}

Internal datastore of {{< product-c8y-iot >}} where all data (such as [alarms](/glossary/a/#alarm), [events](/glossary/e/#event), [inventory](/glossary/i/#inventory), and [measurements](/glossary/m/#measurement)) are stored in so-called base collections.


### {{< sensor-app >}} {#sensor-app}

The {{< sensor-app >}} is a free smartphone application available for iOS and Android smartphones. The app is designed to collect measurements from your smartphone, nearby Bluetooth device sensors, and vehicle On-board Debug (OBD) sensors, and send them to the {{< product-c8y-iot >}} platform. It has a straightforward registration workflow to get you up and running quickly and provides an easy way to get data into {{< product-c8y-iot >}}.

For details see [{{< sensor-app >}}](/sensor-app/sensorapp-introduction/).


### {{< product-c8y-iot >}} Streaming Analytics {#streaming-analytics}

Using the Streaming Analytics application, you can add your own logic to your IoT solution for immediate processing of incoming data from devices or other data sources. These user-defined operations can, for example, alert applications of new incoming data, create new operations based on the received data (such as sending an alarm when a threshold for a sensor is exceeded), or trigger operations on devices. The operation logic is based on [Apama’s Event Processing Language (EPL)](/glossary/e/#epl).

See also [Analytics Builder](/glossary/a/#analytics-builder) and [EPL Apps](/glossary/e/#epl-apps).

For details see [Analytics > Streaming Analytics](/streaming-analytics/introduction-analytics/).
