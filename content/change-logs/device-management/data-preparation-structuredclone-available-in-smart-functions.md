---
date: ""
title: "structuredClone now available in Data Preparation and Analytics Builder smart functions"
product_area: "Device management & connectivity"
change_type:
  - value: "change-QHu1GdukP"
    label: "Feature"
component:
  - value: "component-dPrp1xK9z"
    label: "Data Preparation"
build_artifact:
  - value: "tc-KXXmo2SUR"
    label: "apama-in-c8y"
ticket: "PAM-35442"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

Smart functions in Data Preparation and in the Analytics Builder Smart Function block can now use the standard `structuredClone` global function to make a deep copy of a value. Unlike a copy made with `JSON.parse(JSON.stringify(value))`, it keeps `Map`, `Set`, `Date` and typed array values, and objects that are referenced more than once or that refer to themselves. Values that cannot be copied, such as functions, cause a `DataCloneError` instead of an incomplete copy.

For details, see [structuredClone](/data-preparation/smart-functions/#structured-clone).
