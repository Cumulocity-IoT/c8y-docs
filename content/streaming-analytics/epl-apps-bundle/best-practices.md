---
weight: 40
title: Best practices and guidelines
layout: redirect
---

### EPL monitors {#epl-monitors}

**Symptom: Your event processing rules are disabled automatically**

If a monitor throws an exception from `onload` or a listener and the exception is not caught, then the monitor will be terminated. Catch exceptions or avoid the reason for them occurring.

Similarly, if a monitor completes processing an event and has no listeners left active, then it cannot be triggered again, and will automatically remove itself.

**Avoid excessive memory usage per monitor**

Make sure that your event processing rules do not leak listeners. For example, when doing request-response operations, ensure that no listeners are left active after the response is processed, or if a timeout occurs and there is no response.

### Number formats {#number-formats}

{{< product-c8y-iot >}} measurements use the float type. Note that the timestamps are stored as floats (seconds since 1 Jan 1970, 00:00 UTC).

### Subscribing to channels and contexts {#subscribing-to-channels-and-contexts}

A context is a parallel processing unit within Apama. Monitor instances can be deployed to multiple contexts using the `spawn...to` syntax. When subscribing to a channel, all monitor instances within a context will receive events for that subscription. So it is recommended practice to put different subscriptions in different contexts. The use of contexts can prevent part of the application being overloaded from affecting other parts of the application.

Contexts are created with a user-friendly name, and each individual instance of the context object corresponds to different contexts, even if they have the same name.

For example:

```java
action onload() {
   context subContext := context("Worker");
   spawn worker() to subContext;
}
action worker() {
   monitor.subscribe(Measurement.SUBSCRIBE_CHANNEL);
   on all Measurement() as m {
      ...
   }
}  
```

### Apama limitations in {{< product-c8y-iot >}} {#apama-limitations-in-platform}

Using Apama within the {{< product-c8y-iot >}} environment necessarily has some restrictions to the capabilities available when Apama is used standalone.

There are a number of ways that assets may be deployed to Apama within {{< product-c8y-iot >}} and the restrictions vary according to those mechanisms:

* EPL apps - the simplest mechanism to deploy Apama assets into a fully managed Apama correlator, see [Deploying apps](/streaming-analytics/epl-apps/#deploying-apps).
* Custom microservice - where more complex Apama projects can be built using {{< product-c8y-iot >}}'s Microservice SDK, see [Microservices](/concepts/applications#microservices).

When designing an Apama solution to be deployed within any form of {{< product-c8y-iot >}} environment, consider the following points.

#### General Apama limitations when using EPL apps or a custom microservice {#general-apama-limitations-when-using-epl-apps-or-a-custom-microservice}

* For scalability, a correlator may move between hosts and therefore does not have access to a persistent file system. It is a standard {{< product-c8y-iot >}} constraint that all microservices (either provided by the platform, or custom) must be stateless, see [Microservices](/concepts/applications#microservices).
	The Apama features affected by this include:
	* Correlator persistence.
	* MemoryStore persistence.
* Non-HTTP/REST connections to an external system or process are mostly impractical. Although if a service is available over the internet, then it can be used (for example, an HTTP client inside Apama could connect to publicly accessible HTTP servers).
	The Apama features affected by this include:
	* Apama Database Connector (ADBC).
	* Correlator-integrated support for the Java Message Service (JMS).
	* Distributed memory stores.
	* Connections between correlators.
* For security and implementing user access control, {{< product-c8y-iot >}} does not make the correlator port available to external processes, see [Microservices](/concepts/applications#microservices).
	The following capabilities require access to the correlator port and hence are not compatible with this access control:
	* Command line tools such as engine_connect, engine_management, engine_send, engine_receive.
	* Engine Management API, Event Service API, Scenario Service API.
	* Connecting to adapters running out-of-process in an IAF.
	* Dashboards (provided in-the-box with Apama).
	* Debugging from {{< apama-plugin >}}. Instead, debug your app running in a local correlator.
	* Correlator REST interface.
* To reduce both the memory usage of an application during startup and the application's startup time,
  ensure the application is completely initialized before injecting monitors that automatically unload,
  and before running time-consuming queries.

#### Specific Apama limitations when using EPL apps {#specific-apama-limitations-when-using-epl-apps}

* For ease of use, the correlator startup is controlled by {{< product-c8y-iot >}}. Thus, features that require you to change configuration files or command line options are not accessible.
	The Apama features affected by this include:
	* Persistence.
	* Connectivity plug-ins.
* For security, the file system used by the correlator is not accessible.
	The Apama features affected by this include:
	* Accessing the input log.
	* Using custom plug-ins.
	* Using file system assets for enrichment.
* For simplicity, it is only possible to make independent EPL injections. Each monitor is managed independently and so dependencies between different monitors cannot be created.
	The Apama features affected by this include:
	* A \*.mon file must not contain a package statement (to do so is an error).
	* It is not possible to share event definitions between separate \*.mon files.
	* It is not possible to use Apama queries.
	* You can only use the bundles listed in [Developing apps with {{< apama-plugin >}}](/streaming-analytics/epl-apps/#apama-plugin).

All of these restrictions are implemented to ensure the smooth and secure operation of EPL apps within {{< product-c8y-iot >}}.
