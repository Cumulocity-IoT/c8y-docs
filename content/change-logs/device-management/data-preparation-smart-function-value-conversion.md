---
date: 
title: "Data Preparation: smart functions send every number as a float and report values they cannot convert"
product_area: "Device management & connectivity"
change_type:
  - value: "change-VSkj2iV9m"
    label: "Fix"
component:
  - value: "component-dPrp1xK9z"
    label: "Data Preparation"
build_artifact:
  - value: "tc-KXXmo2SUR"
    label: "apama-in-c8y"
ticket: "PAM-35437"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

Data Preparation now converts the values your smart function returns more consistently, and drops the message with an error instead of sending a wrong value.

Data Preparation now sends every Javascript number to {{< product-c8y-iot >}} as a floating-point number. For example, `21` is now sent as `21.0`. To send an integer, return a `BigInt`, for example, `BigInt(21)`.

Data Preparation now drops the message with an error if your function returns any of the following:

- An object that contains itself.
- Objects nested more than 256 levels deep.
- A value larger than 256 MB once converted.
- A string containing a NUL character, for example, text decoded from a payload padded with zero bytes.
- Two keys that would become the same key.

Properties with symbol keys are now skipped, and unpaired surrogates in strings are replaced with U+FFFD.

For details, see [Value conversion](/data-preparation/smart-functions/#value-conversion).
