---
date:
title: Option to disable Dremio-based offloading metadata in measurements
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
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

With the new feature toggle `core.measurements.disable-created-at`, the platform no longer writes the metadata that is specific to Dremio-based DataHub offloading in new measurements. The toggle takes effect only when the tenant stores measurements in time series collections. Existing measurements are not modified.

Do not enable the toggle if you use Dremio-based DataHub offloading, because it relies on this metadata.

The feature toggle is disabled by default. To try the feature, enable it for a tenant.
