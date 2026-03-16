---
date: ''
title: Added configuration option to strip control characters during JSON deserialization in Java SDK
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-4974
version: 2025.0.18
---

A new configuration option has been in the Java SDK that allows stripping control characters from JSON strings when deserializing responses from the API.
This option can be enabled by adding the property `c8y.svenson.stripControlCharacters=true` to the configuration file.
The default value is false to maintain backward compatibility.


