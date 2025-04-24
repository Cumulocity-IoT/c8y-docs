---
weight: 10
title: Using the microservice-based data broker
layout: bundle
sector:
  - platform_administration
---

The microservice-based data broker is powered by the {{< product-c8y-iot >}} Messaging Service that enables reliable, scalable and high-performance movement of IoT data. The microservice-based data broker is similar to the existing data broker in its functionality, except that a microservice, the `databroker-agent-server`, must be enabled to make use of it.

{{< c8y-admon-req >}}
The {{< product-c8y-iot >}} Messaging Service is an optional component of the {{< product-c8y-iot >}} platform that may need to be enabled before the microservice-based data broker can be used.
The original data broker will continue to operate alongside the microservice-based data broker for the time being, and users can choose which data broker to use on a per-tenant basis.

For the shared public cloud instances of the {{< product-c8y-iot >}} platform, the Messaging Service is enabled by default on release 10.13 and above, and the microservice-based data broker can be enabled on request for individual tenants that already have access to the original data broker.
For dedicated and self-hosted instances, the Messaging Service and microservice-based data broker are available for release 10.10 and above, but will need to be explicitly enabled.

Please [contact product support](/additional-resources/contacting-support/) to inquire about using the Messaging Service and microservice-based data broker capabilities in your {{< product-c8y-iot >}} environment.
See the *Messaging Service Installation & operations guide* for further technical details of the configuration required, but note that these tasks can only be performed by a {{< product-c8y-iot >}} platform operator, not by a normal user.

In summary, to work with the microservice-based data broker, the following requirements must be met:
  * The {{< product-c8y-iot >}} Messaging Service should be available on your {{< product-c8y-iot >}} platform.
  * Your tenant must be subscribed to the application “feature-broker”.
  * Your tenant must be subscribed to the microservice “databroker-agent-server”.

{{< /c8y-admon-req >}}


### To enable the microservice-based data broker {#to-enable-the-microservice-based-data-broker}

The microservice-based data broker must be enabled from the {{< management-tenant >}}. Contact your Operations team for further support.


### Data connectors {#data-connectors}

See [Data connectors](/data-broker/data-broker-application/#data-connectors) for details on how to manage data connectors.


### Data subscriptions {#data-subscriptions}

See [Data subscriptions](/data-broker/data-broker-application/#data-subscriptions) for details on how to manage data subscriptions.


### Migrating existing data connectors to the microservice-based data broker {#migrating-existing-data-connectors-to-the-microservice-based-data-broker}

After enabling the microservice-based data broker, your existing data connectors should continue to work without any additional configuration.


### Service quotas for the microservice-based data broker {#microservice-based-data-broker-service-quotas}

The microservice-based data broker stores messages persistently using the {{< product-c8y-iot >}} Messaging Service until they are successfully delivered to the destination tenant.
To optimize resource usage, the Messaging Service imposes storage limits and a message time-to-live (TTL) on persistently stored messages.
See [service quotas](/service-terms/quotas/#realtime-apis) for details of the default quotas used by the microservice-based data broker.

These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any concerns, please contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).
