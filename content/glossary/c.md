---
weight: 40
title: C
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### CCU ({{< product-c8y-iot >}} Compute Unit) {#ccu}

CCU (Cumulocity Compute Unit) is a standardized measure for computational resources consumed by custom [microservices](#microservice) deployed by a customer. 1 CCU typically equates to 1 CPU core and 4 GiB of memory. CCUs are calculated based on daily average resource usage and used for billing purposes. The CCU calculation takes into account the resources denoted in the [microservice manifest](#microservice-manifest) and the subscribed time for each microservice.   

### Change logs {#change-logs}

Change logs are the official record of {{< product-c8y-iot >}} product changes and announcements, published for all cloud deployments ([Continous Deployment](#continuous-deployment)), detailing updates such as new features, improvements, and API changes or deprecations. Corresponds to the [release notes](#release-notes) in the [Yearly releases](#yearly-release).


### Child asset {#child-asset}

Child assets denote a relationship type within the {{< product-c8y-iot >}} [inventory](#inventory)'s [domain model](#domain-model) used to establish parent-child links between [managed objects](#managed-object). This relationship forms the [asset hierarchy](#asset-hierarchy), connecting a parent asset or [group](#group) to its subordinate [assets](#asset) or [devices](#device) from a business or logical perspective.  


### Child device {#child-device}

Child devices denote a relationship type within the {{< product-c8y-iot >}} [inventory](#inventory)'s [domain model](#domain-model) used to establish parent-child links that reflect the [communication hierarchy](#communication-hierarchy), connecting a parent device (often an agent or a gateway) to the downstream [devices](#device) it manages.  

### Cockpit application {#cockpit-application}

The Cockpit application is one of the default [applications](#application) of {{< product-c8y-iot >}}. It provides a self-service UI to manage and monitor IoT assets and data from a business perspective, like managing [assets](#asset), visualizing data, working with [dashboards](#dashboard) and managing [reports](#report).   

For details, see [Cockpit](/cockpit/) in the documentation.


### Communication hierarchy {#communication-hierarchy}

The communication hierarchy models how [devices](#device) are connected to the platform from a network communication perspective. It is built using the [child devices](#child-device) relationship, with agents or gateways typically forming the root of the hierarchy. This structure reflects the physical or network topology, as opposed to the logical business structure represented by the [asset hierarchy](#asset-hierarchy).  


### Configuration management {#configuration-management}

The configuration management feature allows administrators and [applications](#application) to remotely manage the settings of a [device](#device). This is typically achieved by creating and applying a configuration operation, often containing the `c8y\_Configuration` [fragment](#fragment) with the desired configuration text or a reference to a configuration file stored as a binary.  


### Connection monitoring {#connection-monitoring}

The connection monitoring feature allows identifying [devices](#device) that have stopped communicating with the {{< product-c8y-iot >}} platform. The connection status (ONLINE/OFFLINE) is determined by monitoring device heartbeats or tracking the status of a persistent push connection.  

### Continuous Deployment model {#continuous-deployment}

In the {{< product-c8y-iot >}} Continuous Deployment (CD) model, the different components of the {{< product-c8y-iot >}} platform are updated on a continuous basis. This means a frequent deployment of small incremental improvements. The changes are communicated via the [change logs](#change-logs).

See also [Private Preview](#private-preview), [Public Preview](#public-preview) and [General Availability](#ga).


### {{< product-c8y-iot >}} CLI (Command Line Interface) {#cumulocity-cli}

The {{< product-c8y-iot >}} CLI (Command Line Interface) is a software tool provided by {{< product-c8y-iot >}} that offers a command-line interface for interacting with the platform. It enables developers, administrators, and automation scripts to manage platform resources directly from a terminal. See also the [CLI documentation](https://goc8ycli.netlify.app/docs/introduction/).



### {{< product-c8y-iot >}} Core {#core}

{{< product-c8y-iot >}} Core is the foundation of the {{< product-c8y-iot >}} platform. It comprises all major components such as the default [applications](#application) ([Administration](#administration-application), [Cockpit](#cockpit-application) and [Device Management](#device-management-application)), the [{{< product-c8y-iot >}} operational store](#operational-store), [microservices](#microservice), security, [REST API](#rest-api), MQTT API, and smart rules.  


### {{< product-c8y-iot >}} DataHub {#datahub}

{{< product-c8y-iot >}} Datahub is a {{< product-c8y-iot >}} [application](#application) for offloading a large amount of data from the [{{< product-c8y-iot >}} operational store](#operational-store) to a [data lake](#data-lake) and querying the data lake contents.

For details, see [Analytics > DataHub](/datahub/datahub-overview/) in the documentation.


### {{< product-c8y-iot >}} Developer Codex {#developer-codex}

The [{{< product-c8y-iot >}} Developer Codex](https://cumulocity.com/codex/) is {{< product-c8y-iot >}}'s comprehensive design system aimed at developers building custom [web applications](#web-application). The {{< product-c8y-iot >}} Developer Codex provides a set of UI guidelines, a library of reusable Angular components ([Web SDK](#web-sdk)), and styling utilities to ensure that custom [applications](#application) maintain a consistent look and feel, and user experience with standard {{< product-c8y-iot >}} applications.  


### {{< product-c8y-iot >}} Edge {#edge}

{{< product-c8y-iot >}} Edge is the onsite solution of {{< product-c8y-iot >}} intended to run as a local software application on industrial PC’s or local servers.

For details, see [Edge](/{{< c8y-edge-version-major >}}/edge-kubernetes/k8-edge-introduction/) in the documentation.


### {{< openapi >}} {#openapi-specification}

The {{< openapi >}} is a complete OpenAPI specification (following the OpenAPI 3.0 standard) for the {{< product-c8y-iot >}} [REST API](#rest-api), available at [https://cumulocity.com/api/](https://cumulocity.com/api/). It describes the entire REST API, including available endpoints, operations on each endpoint, input and output for each operation, and authentication methods.  


### {{< product-c8y-iot >}} operational store {#operational-store}

The {{< product-c8y-iot >}} operational store is an internal datastore where all data (such as [alarms](#alarm), [events](#event), [inventory](#inventory), and [measurements](#measurement)) are stored in base collections.  


### {{< sensor-app >}} {#sensor-app}

The {{< sensor-app >}} is a free smartphone [application](#application) for iOS and Android that turns a smartphone into a managed IoT [device](#device), enabling the real-time collection of sensor data from the phone, connected Bluetooth devices, and supported OBD sensors. It securely transmits this data to the {{< product-c8y-iot >}} platform and supports device registration, live data visualization, [event](#event) and [alarm](#alarm) triggering, and remote device operations, providing an easy entry point for exploring {{< product-c8y-iot >}}’s IoT capabilities.  

For details, see [{{< sensor-app >}}](/sensor-app/sensorapp-introduction/) in the documentation.


### {{< product-c8y-iot >}} Streaming Analytics {#streaming-analytics}

The {{< product-c8y-iot >}} Streaming Analytics application allows users to add their own logic for the immediate, real-time processing of incoming data. Users can build [Analytics Builder](#analytics-builder) [models](#model) or write custom [EPL Apps](#epl-apps) to analyze data streams, generate new data, create [alarms](#alarm), or trigger [operations](#operation) on [devices](#device).  

For details, see [Analytics > Streaming Analytics](/streaming-analytics/introduction-analytics/) in the documentation.
