---
date:
title: Return all managed object ancestors when withParents=true, not just maximum of 3 levels
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63253
version: 2025.295.0
---
Using inventory API parameter `withParents=true` will now result in returning basic information (id, type, name) about
all the managed objects ancestors and is no longer limited to only 3 levels of hierarchy. Notice that inventory roles
are not taken into consideration when collecting ancestors information, so basic information about all of them
will be returned. In addition to improving the API usability the performance of requests using the `withParents=true`
parameter has also been improved.
