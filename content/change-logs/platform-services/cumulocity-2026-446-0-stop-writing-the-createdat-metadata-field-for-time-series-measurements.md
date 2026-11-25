---
date:
title: Option to stop writing the createdAt metadata field for time series measurements, available as public preview
product_area: Platform services
change_type:
  - value: change-pXAlHAWka
    label: Preview
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68887
version: 2026.446.0
---
Every measurement in a time series collection carries a `createdAt` metadata field. It holds the creation time rounded to the hour and was used by Dremio offloading, which is end of life.

With the new feature toggle `core.measurements.disable-created-at`, the platform no longer writes `createdAt` for new measurements. The toggle takes effect only when the tenant stores measurements in time series collections only. In all other time series modes, the platform still writes `createdAt`. The field `sentAt` is not affected.

The platform does not change existing measurements, and measurements written with or without `createdAt` stay readable. Queries that filter on `createdAt`, such as those of the time series migration, do not match measurements written without it. Do not enable the toggle for a tenant that relies on this filter.

The feature toggle is disabled by default. To try the feature, enable it for a tenant.
