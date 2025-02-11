---
weight: 20
title: Troubleshooting
layout: bundle
sector:
  - platform_administration
---

### Subscription alert {#subscription-alert}

The {{< management-tenant >}} cannot be used as a data broker source tenant and this alarm is raised when trying to subscribe a {{< management-tenant >}} to the data broker agent.

### Data broker connection error {#data-broker-connection-error}

The data broker agent is pre-configured to monitor each connector for the number of failed forwarding requests sent. If this number reaches a pre-configured threshold a CRITICAL alarm is raised in the tenant.
If this happens the data will be stored until the connection is restored and it can be forwarded again.
Failed requests can happen in the event the data broker subscriber tenant becomes unreachable.

### Data broker slow processing alert {#data-broker-slow-processing-alert}

The data broker agent is pre-configured to monitor the rate at which events are being delivered to their destination. If events cannot be delivered fast enough, slow processing alarms will be raised. A slow processing alarm includes a connector ID to help identify which destination tenant is affected.

#### Queue backlog {#queue-backlog}

This alarm is raised when latency for message delivery crosses a specified threshold. This usually happens if there is a backlog of undelivered events to the destination tenant due to various factors.

#### Average request bytes sent per second {#average-request-bytes-sent-per-second}

The data broker monitors the data rate at which events are being forwarded. If this rate is lower than a pre-configured threshold, a slow processing alert will be raised. This can occur due to a slow network.

![New Data-Broker Alarms](/images/users-guide/enterprise-tenant/et-new-data-broker-alarms.png)
