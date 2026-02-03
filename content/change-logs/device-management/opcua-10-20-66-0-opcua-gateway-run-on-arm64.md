---
date: 2024-06-12
title: OPC UA gateway no longer fails to start on ARM64 Docker images
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-3346
version: 10.20.66.0
---
The OPC UA gateway incorporated certain dependency libraries that encountered linkage issues with the native operating system libraries within ARM64 Docker images. Consequently, executing the OPC UA gateway in ARM64-based Docker containers was problematic. This issue has been successfully resolved, facilitating the smooth build and execution of the OPC UA gateway on ARM64 Docker images.
