---
date: ""
title: $PROVIDED placeholder has been replaced by an empty string value in the software repository
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
ticket: DM-5037
version: 1023.19.0
---
In **Software repository** users can define that a device is responsible for providing the software artifacts itself instead of the user uploading a binary or pointing to it via URL. In this case the created software object in inventory had `$PROVIDED` as a placeholder value for the software `url` property. From now on instead of this placeholder and empty string value will be used. Existing software items in inventory remain unchanged.