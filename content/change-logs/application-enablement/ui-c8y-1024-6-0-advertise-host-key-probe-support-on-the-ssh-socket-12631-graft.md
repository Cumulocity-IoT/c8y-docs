---
date: ""
title: Cloud Remote Access hostkey approval feature is now fully backwards compatible with older CRA microservice versions
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-6421
version: 1024.6.0
---
When users establish remote connections via SSH, they may be prompted for approval of remote servers SSH public key. This prompt will be shown only when CRA microservice supports this feature. Older microservice versions will work exactly as they used to so far.
