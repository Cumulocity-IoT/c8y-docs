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

The consumer under the microservice-based data broker is within the microservice and therefore have no control over the microservice connection. Messages are also handed off internally by microservice.

See [service quotas](/service-terms/quotas/#realtime-apis) for details of the default quotas and TTL used by the microservice-based data broker.

**When the backlog quota limit has been reached:**
*	Older messages will be discarded once they reach their TTL to provide room in the backlog until for new messages until the space is filled again.
* Client is unable to publish new messages if the backlog quotas is full.
* Consumers reconnecting after a disconnection may receive outdated messages that have been sitting on the queue waiting to be delivered.
*	The system may apply back-pressure - the HTTP 500 response is the visible effect of this and will remain until the backlog pressure eases to accept new messages being published by the client.
* Message ordering may be affected if backlog pruning occurs.
* No messages will be dropped unless TTL has reached and will remain on the backlog queue.
* Messages will always be delivered in the order they were sent by the client.

**To avoid hitting the backlog limit and ensure reliable message consumption:**
* Ensure the destination tenant is working and receiving forwarded messages to reduce backlog build-up as the user has no control over the consumer connection or acknowledgement.
*	Monitor the level of free backlog space using the available metrics and alerting.
*	Avoid extended consumer downtimes without reconnecting to prevent the backlog building up.
*	If persistent disconnections are expected, consider requesting a bigger backlog - higher message rates might require bigger backlog sizes to cope with reasonable levels of outage/downtime of the destination Cumulocity system.
* Consumers connecting infrequently, consider requesting for a longer TTL.
* Slow down the publishing rate if the messages are not delivered fast enough to avoid filling up the backlog.

In addition to the backlog quota, all messages now have a time-to-live (TTL) expiry. Messages not consumed after this period will be discarded.

These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any concerns, please contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).
