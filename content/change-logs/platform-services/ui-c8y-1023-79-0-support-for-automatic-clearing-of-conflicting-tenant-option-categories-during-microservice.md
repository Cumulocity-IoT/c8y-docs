---
date: ""
title: Automatic clearing of conflicting tenant option categories during microservice upload
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66091
version: 1023.79.0
---
Previously, if user tried to upload a microservice that was defining tenant options of category that was already exisiting in tenant options, error was thrown and user was not able to upload the microservice until tenant options of these category were cleared (or removed from microservice manifest). 
Now user will see the warning that it is possible to upload microservice but current tenant options category that is conflicting will be cleared and supreseded by microservice category value.