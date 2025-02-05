---
date: 2024-09-17
title: Temporary directory used by core is monitored and recreated if necessary
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Edge
component:
  - value: component-IpOEfM7nQ
    label: Edge Appliance VM
build_artifact:
  - value: tc-Tk9F8QhaO
    label: edge-appliance-vm
version: 10.18.0.1
---
The <code>/tmp/cumulocity-core-karaf</code> directory is used by {{< product-c8y-iot >}} core for storing the uploaded application and microservice ZIP files before processing. This directory is monitored and recreated if necessary.
