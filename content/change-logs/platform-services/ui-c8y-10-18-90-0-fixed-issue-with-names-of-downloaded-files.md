---
date: 2023-12-06T16:23:05.416Z
title: Fixed issue with names of downloaded files
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-53056
version: 10.18.90.0
---
Fixed an issue with the names of the files downloaded from the platform (for example, from the file repository or from event attachments). UTF-8 characters, for example, in the Japanese localization are no longer missing if the file name includes special characters like "+".
