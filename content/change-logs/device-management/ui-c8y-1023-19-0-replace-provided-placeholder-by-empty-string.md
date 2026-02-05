---
date: ""
title: Placeholder $PROVIDED has been replaced by an empty string value in the software repository
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
When creating a software item, users can define a device as responsible for providing the software artifacts, rather than uploading a binary or pointing to it via a URL. In this case, the created software object used to have `$PROVIDED` as a placeholder value for the software `url` property in the inventory. With this change, an empty string value will be stored instead. Existing software items in the inventory remain unchanged.