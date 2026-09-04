---
date: 
title: Fix problems with the identification of Core MQTT topics
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
ticket: MTM-67722
version: 3000.0.19
---
The [MQTT Service documentation](/device-integration/mqtt-service/#core-mqtt-topics) describes the set of MQTT topic names that will be treated as Core MQTT topics.
These topics can only be used with Core MQTT protocols and must not be used by "generic" MQTT devices.

Previously, topic names that were documented as being *prefixes* for Core MQTT topics were incorrectly matching any topic name *containing* the Core MQTT prefix.
For example, the topic name `sensors/12345` was treated as a Core MQTT topic because it contained the reserved topic prefix `s/`.

In addition, some Core MQTT reserved topic names were incorrectly treated as prefixes when they are specific names for single topics.
For example, the topic name `errortopic` was treated as a Core MQTT topic because it begins with the reserved topic name `error`.

Both of these issues have now been corrected.
The documentation has been updated to clarify which topic names are matched as prefixes and which as complete topic names.
