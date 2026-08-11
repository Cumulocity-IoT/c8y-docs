---
date: '2026-08-10'
title: Deprecation of device availability views
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-7021
version:
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
**Context**

The Device Management application currently provides two views for monitoring device availability based on raised and cleared critical alarms: the **Availability** tab on individual device detail pages, and the **Availability** page under the **Devices** menu in the navigator. Both views are powered by the legacy AngularJS `c8y.parts.availability` module.

**Change**

The per-device **Availability** tab and the fleet-wide **Devices > Availability** page are now deprecated. The underlying AngularJS module `c8y.parts.availability` (including the `availabilityReportCtrl` controller and associated views) is marked as deprecated in the codebase. The feature will remain available through y2027 and is planned for removal thereafter.

**Consequence**

Existing tenants and users will continue to see the availability views until the removal date. No immediate action is required. After removal, the views will no longer be accessible in the Device Management application. The underlying alarm-based availability data remains available via the [{{< product-c8y-iot >}} REST API](https://{{< domain-c8y >}}/api/core/#tag/Alarms).

**Persona**

This deprecation affects **Device Management application users** who rely on the availability views for operational monitoring, as well as **developers** who have built custom applications referencing the `c8y.parts.availability` AngularJS module from the `@c8y/ng1-modules` package.

**Action**

- **End users**: No action required before the removal date. After removal, use alarm-based monitoring via the REST API or build custom dashboards using the data.
- **Developers** who import or extend the `c8y.parts.availability` module from `@c8y/ng1-modules`: plan to remove those dependencies before y2027.

**Documentation**

See [Availability](/device-management-application/monitoring-and-controlling-devices/#availability) in the Device Management documentation.
