---
date: 2024-03-27T09:47:57.877Z
title: Advance notice of reduced storage limits for Notifications 2.0 and microservice-based data broker
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-2Yri1-l3n
    label: Messaging Service
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---

Messages processed by Notifications 2.0 are stored persistently by the {{< product-c8y-iot >}} Messaging Service until they have been delivered to, and acknowledged by, all interested consumers. Likewise, messages processed by the microservice-based data broker are stored persistently until they have been delivered successfully to the destination tenant.

The current persistent storage limits for these services are considered too large for typical use cases, which can lead to excessive resource consumption and consumers being forced to process outdated messages after a disconnection.

Therefore, these limits will be lowered to better align with the expected usage patterns of the services.

These changes will take place not less than three months from the date of this announcement, on or after July 1st, 2024.

**Message backlog quota**

Persistent messages are stored in a “backlog” until they are received and acknowledged. The maximum size of a backlog is determined by the “backlog quota” limit, which directly affects the number of unacknowledged messages that can be stored and therefore the resource consumption of the platform. If the quota limit is reached, no new messages can be added to the backlog until some older messages have been consumed and acknowledged.

For Notifications 2.0, a separate backlog exists for every unique `subscription` name used with the `/notification2/subscriptions` API.  This backlog is shared by all subscriptions using the same subscription name, and by all consumers attached to that subscription. For the microservice-based data broker, a separate backlog exists for each data broker connector.

<u>Summary of changes to message backlog quota limits:</u>

| Service | Current Limit | New Limit | 	   	
|---------|---------------|-----------|
| Notifications 2.0 | 2 GiB | 25 MiB |
| Microservice-based data broker | 2 GiB | 50 MiB |

For example, assuming an average message size of 200 bytes, each Notifications 2.0 subscription will be able to retain approximately 130,000 unacknowledged messages in its backlog. Similarly, each microservice-based data broker connector will be able to retain approximately 260,000 messages.

**Message time-to-live**

Alongside the backlog quota reduction, a new default message “time-to-live" (TTL) limit will be introduced. Any unacknowledged messages will be automatically deleted if they have been on the backlog for longer than the TTL limit. This policy helps to limit overall resource usage and reduces the need to process outdated data after a prolonged disconnection of a consumer or destination tenant.

<u>Summary of changes to message TTL limits:</u>

| Service | Current Limit | New Limit | 	   	
|---------|---------------|-----------|
| Notifications 2.0 | ∞ (no limit) | 36 hours |
| Microservice-based data broker | ∞ (no limit) | 36 hours |

**Additional details**

The message backlog quota and TTL are configurable for each {{< product-c8y-iot >}} tenant. Message backlog usage will be monitored during the three-month transition period, to identify tenants that may exceed the new limits when they are enabled. The owners of such tenants will be contacted to understand their use cases and whether a non-default limit could be appropriate.

Please contact [product support](/additional-resources/contacting-support/) if you have any questions or concerns about these changes.
