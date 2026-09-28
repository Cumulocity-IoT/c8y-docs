---
weight: 50
title: Improving the performance
layout: redirect
sector:
  - platform_administration
---

The {{< product-c8y-iot >}} platform provides optimized UI performance for users with inventory roles access. In particular, requests for tenants with large inventory hierarchies are faster.

The performance of the following UI pages is improved:
* In the device details view, the tabs **Info**, **Measurements**, **Alarms**, **Events** and **Control**.
* Pages with aggregated alarm views from multiple devices, if the number of alarms in the system is low, for example, Cockpit > Home dashboard, Cockpit > Alarms and Device management & connectivity > Home.
* Pages with aggregated events from multiple devices, if the number of events is low, for example, Device management & connectivity > Events.
* Pages with aggregated operations from multiple devices, if the number of operations is low, for example, Device management & connectivity > Device control > Single operations.

As an administrator, you can disable the performance feature by doing the following:
- On platform level via the configuration file (only available for platform administrators, see the *{{< product-c8y-iot >}} - Operations guide* for details).
- On tenant level via a tenant option. The tenant option has 2 possible values: LEGACY/OPTIMIZED, where OPTIMIZED is the global default.

The option looks like the following in the REST API (see also the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#operation/postOptionCollectionResource)):

`{"category": "configuration", "key": "acl.algorithm-version", "value": "LEGACY"}`

The setting on tenant level has priority over the setting on platform level.

By default, this option is enabled.
