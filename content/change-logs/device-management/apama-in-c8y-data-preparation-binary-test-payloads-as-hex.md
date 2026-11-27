---
date: ""
title: "Data Preparation test files accept binary payloads as hex"
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
ticket: "PAB-5471"
version: "27.327.0"
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

When you develop Data Preparation rules outside the platform with the [`@c8y/dataprep-types`](https://www.npmjs.com/package/@c8y/dataprep-types) npm package, the test files of a rule can now contain binary payloads as hex. Set `payloadFormat` to `binary` and enter the payload as pairs of hex digits, optionally separated by whitespace, for example, `"a2 64 74 65 6d 70 16"`.

Test files still accept `base64` payloads. A rule receives these payloads as already-decoded bytes, so the rule does not need to base64-decode `msg.payload` itself.

For details, see [Test file format](/data-preparation/external-development/#test-file-format).
