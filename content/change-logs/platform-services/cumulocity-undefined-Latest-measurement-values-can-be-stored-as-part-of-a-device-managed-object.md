---
date: 2024-03-26T15:56:48.325Z
title: Latest measurement values can be stored as part of a device managed object
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and maybe subject to change in the future.
{{< /c8y-admon-preview >}}

Support of automated persistence of measurement values under the `c8y_LatestMeasurements` fragment has been introduced. If a measurement is created with a series that matches the configuration the device managed object is updated with the last series sent to the platform.

For details on how this feature is enabled and how it works, refer to the [Cumulocity IoT OpenAPI Specification](https://www.cumulocity.com/api/).
