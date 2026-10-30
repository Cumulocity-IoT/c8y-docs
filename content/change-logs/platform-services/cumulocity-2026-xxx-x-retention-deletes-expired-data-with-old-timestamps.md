---
date:
title: Retention rules now delete expired data with timestamps far in the past
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68042
version:
---
Previously, retention rules did not delete all expired alarms, events, measurements, operations, and audit records. If the data that a retention rule matched had a gap of more than 10 years, the retention process stopped at this gap and kept all data older than the gap. This affected, for example, measurements with the time 1970-01-01 from devices with an unset clock.

Now, the retention process deletes all data that is older than the maximum age of the retention rule, independent of how far in the past the data is. For alarms, events, and measurements, the age of the data comes from the time that the device reports, not from the time when {{< product-c8y-iot >}} receives the data. This change does not affect time series measurements, because their retention already works this way.

{{< c8y-admon-caution >}}
The first retention run after the update deletes this old data in all tenants that have it. After that, the retention process deletes data from devices with an unset clock on the next run after the data arrives. To keep the existing data, export it before the update. To keep new data, set the correct time on the devices.
{{< /c8y-admon-caution >}}

For details, see [Retention rules](/standard-tenant/managing-data/#retention-rules).
