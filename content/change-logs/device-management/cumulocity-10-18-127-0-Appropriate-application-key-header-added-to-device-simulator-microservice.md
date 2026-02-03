---
date: 2023-12-06T10:38:35.673Z
title: Appropriate application key header added to device simulator microservice
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2306
version: 10.18.127.0
---
The Device simulator microservice sent some internal requests without application key header which resulted in these requests being counted as device requests. The appropriate application key header has been added so that all requests are now counted correctly.
