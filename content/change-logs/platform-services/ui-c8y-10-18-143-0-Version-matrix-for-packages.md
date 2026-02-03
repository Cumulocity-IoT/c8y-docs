---
date: 2023-12-06T15:46:14.954Z
title: Version matrix for packages
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-52341
version: 10.18.143.0
---
The repository-connect microservice now offers to sync packages that include a versioning matrix which allows to filter exactly the versions to be synced. Versions which are not included in the matrix but uploaded to the platform will be removed by the microservice. 
