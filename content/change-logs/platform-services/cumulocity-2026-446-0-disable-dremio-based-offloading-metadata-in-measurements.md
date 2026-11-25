---
date:
title: Option to disable Dremio-based offloading metadata in measurements, available as public preview
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
With the new feature toggle `core.measurements.disable-created-at`, the platform no longer writes the metadata that is specific to Dremio-based DataHub offloading in new measurements. The toggle takes effect only when the tenant stores measurements in time series collections only. Existing measurements are not modified.

Do not enable the toggle if you use Dremio-based DataHub offloading, because it relies on this metadata.

The feature toggle is disabled by default. To try the feature, enable it for a tenant.
