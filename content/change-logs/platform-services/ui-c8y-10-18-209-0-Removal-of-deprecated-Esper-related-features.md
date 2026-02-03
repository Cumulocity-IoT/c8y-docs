---
date: 2023-12-06T15:44:47.449Z
title: Removal of deprecated Esper-related features
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-49963
version: 10.18.209.0
---
Esper-CEP-related features have been removed from the UI such as:

* the **Event processing** page from the Administration application
* the inspect feature from the smart rules menu (rule debug was originally available for Esper only) Removed Esper CEP related services and modules from the AngularJS Web SDK:
* `eventProcessingSvc` (*@c8y/ng1-modules/administration-eventProcessing/cumulocity.json*)
* `c8yCepModule`, `c8yCepModuleExamples` (*@c8y/ng1-modules/notifications/cumulocity.json*) 
