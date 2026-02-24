---
date: '2026-03-31'
title: Remote access tab only shows supported protocols
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2114
version: 1021.74.0
---
Previously, the **Remote access** tab in the device details showed all available protocols, even if the device did not support them. This could lead to confusion for users trying to remotely access devices.

With this change, the **Remote access** tab only shows the protocols that are actually supported by the selected device. This makes the interface clearer and improves the user experience by providing accurate information on each device’s remote access capabilities.

If no supported protocols are specified, all options will still be shown to maintain compatibility. Any invalid or duplicate entries in the list will be ignored.

Find more information on specifying supported protocols via [MQTT static templates](/smartrest/mqtt-static-templates/#150).
