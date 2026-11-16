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

See the [service quotas](/service-terms/quotas/#realtime-apis) documentation for details on the default limits.
These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any questions or concerns, please contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).

#### Message backlog quota {#message-backlog-quota}

Persistent messages are stored in a “backlog” until they are delivered to the destination tenant.
The maximum size of a backlog is determined by the “backlog quota” limit, which directly affects the number of messages that can be stored and therefore the resource consumption of the platform.
If the quota limit is reached, no new messages can be added to the backlog until some older messages have been delivered, or deleted due to their TTL expiring.
A separate backlog exists for each data broker connector.

If the backlog for a data broker connector has reached its quota limit, any API request to the {{< product-c8y-iot >}} platform that would be forwarded by that connector will receive HTTP response code 500.
For example, a POST request to the `/measurement/measurements` API endpoint will return the 500 response code if there is a data broker connector that should forward the new measurement, but that cannot do so because its backlog is full. Note that for requests using the PERSISTENT or QUIESCENT [processing modes](https://cumulocity.com/api/core/#section/REST-implementation/HTTP-usage), the {{< product-c8y-iot >}} operational store will still be updated. This can lead to duplicated entries in the operational store if applications blindly retry failed requests.

#### Message time-to-live {#message-time-to-live}

Any undelivered messages will be automatically deleted if they have been on the backlog for longer than the TTL limit. This policy helps to limit overall resource usage and reduces the need to process outdated data after a prolonged disconnection of a consumer or destination tenant.

No message will ever be deleted from the backlog unless it reaches its TTL limit.
Messages will always be delivered to the destination tenant in the order they were received by the source tenant.

#### Best practices to ensure reliable data broker operation {# best-practices-for-reliable-data-broker-operation}

Applications using the microservice-based data broker do not have any direct control over the operation of the microservice.
These best practices will help to ensure that the microservice can reliably deliver messages to the destination tenant, and avoid requests failing due to reaching the backlog quota limit:

* A destination tenant that is unreachable, for example due to a network outage or changed credentials, is the most common reason for a data broker backlog to fill up.
  Therefore, monitor the destination tenant to ensure that it is reachable and receiving forwarded messages.
* Also monitor the alarms and `databroker-agent-server` microservice logs on the source tenant.
* If persistent or frequent disconnections are expected, consider requesting a larger backlog quota or TTL.
  Higher message rates might require a larger backlog to cope with reasonable levels of downtime of the destination tenant.
  Longer disconnections might require a larger TTL to prevent messages from being deleted before they can be delivered.
* Consider adjusting the filters on the data broker connector to send fewer messages to the destination tenant.