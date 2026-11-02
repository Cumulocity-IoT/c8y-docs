---
date: ""
title: "Data Preparation: customize device creation with onDeviceCreate"
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
ticket: "APMF-2785"
version: ""
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

When a Data Preparation rule sends data for an external ID that does not exist, the platform creates a basic device with a fixed name and type. You can now control what the platform creates with an optional second smart function, `onDeviceCreate`, in the same file as `onMessage`.

The function can set the name, type, owner, fragments, and additional external IDs of new devices. It can also create assets and groups, place new devices under parent devices, assets, or groups, or create nothing for clients that you do not recognize. If creation fails, the platform raises an alarm of type `c8y_DataPrep_DeviceCreateFailure` on the rule. It writes each dropped output to the log of the rule.

Rules without `onDeviceCreate` create devices as before.

For details, see [Device onboarding](/data-preparation/device-onboarding/).
