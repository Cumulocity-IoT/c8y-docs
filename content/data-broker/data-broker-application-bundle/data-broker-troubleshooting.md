---
weight: 40
title: Troubleshooting
layout: bundle
sector:
  - platform_administration
---

If the data broker is not able to connect to a destination tenant, a CRITICAL alarm is raised, showing the connector which is affected.

#### Queue overflow {#queue-overflow}

On the source tenant, data broker queues data that cannot be forwarded immediately to the destination tenant. The amount of data that can be queued is limited. If {{< product-c8y-iot >}} cannot queue any further data, the oldest queued data is dropped. In this case, a MAJOR alarm is raised in the tenant, showing the connector which is affected.

Similarly, an alarm is raised when the input queue is overflown.

To reduce the number of alarms, alarms are not triggered more often than once per minute.
