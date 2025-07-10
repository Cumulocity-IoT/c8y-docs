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

Consumers using the microservice-based data broker will have no control over the microservice connection. Messages are handed off internally by the microservice.

Notifications 2.0 enforces a strict message backlog limit to prevent excessive resource usage and to ensure timely delivery of notifications.

Any unacknowledged messages will be automatically deleted if they have been on the backlog for longer than the TTL (Time to Live) limit. This policy helps to limit overall resource usage and reduces the need to process outdated data after a prolonged disconnection of a consumer or destination tenant.

The default backlog quota limit and Time to Live (TTL) is defined and found in the [service quotas](/service-terms/quotas/#realtime-apis) documentation for details of the default quotas and TTL used by the microservice-based data broker.

**When the backlog quota limit has been reached:**
* Older messages that have been unable to be delivered will continue to consume space in the backlog, causing eventual buildup.
* All messages in the backlog that are undelivered will be deleted once they reach their TTL to provide room for new messages.
* Client is unable to publish new messages if the backlog quotas is full.
* Consumers reconnecting after a disconnection may receive outdated messages that have been sitting on the queue waiting to be delivered.
*	The system may apply back-pressure - Requests in PERSISTENT mode will still update the database even if they cannot be published to the data broker and return a 500 response. The HTTP 500 response is the visible effect of this and will remain until the backlog pressure eases to accept new messages being published by the client.
* No messages sitting in the backlog will be dropped unless their TTL has reached.
* Messages are always delivered in the order the client sent them unless they can't be delivered.

**To avoid hitting the backlog limit and ensure reliable message consumption:**
* Ensure the destination tenant is working and receiving forwarded messages to reduce backlog build-up as the user has no control over the consumer connection or acknowledgement.
*	Monitor the level of free backlog space using the available metrics and alerting.
*	Avoid extended consumer downtime without reconnecting to prevent the backlog building up. Destination tenant that's disconnected is what causes the backlog to fill up.
*	If persistent disconnections are expected, consider requesting a bigger backlog - higher message rates might require bigger backlog sizes to cope with reasonable levels of outage/downtime of the destination {{< product-c8y-iot >}} system.
* Consumers connecting infrequently, consider requesting for a longer TTL to keep undelivered messages in the backlog longer.
* Slow down the publishing rate if the messages are not delivered fast enough to avoid filling up the backlog.

In addition to the backlog quota, all messages now have a time-to-live (TTL) expiry. Messages not consumed after this period will be discarded.

These limits are configurable on a per-tenant basis.
If your use case requires a different configuration, or if you have any concerns, please contact [product support](https://cumulocity.com/docs/additional-resources/contacting-support/).
