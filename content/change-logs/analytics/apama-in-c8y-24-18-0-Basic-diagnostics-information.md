---
date: 2023-12-06T15:59:37.951Z
title: Basic diagnostics information
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 24.18.0
---
The EPL memory profiler snapshots, which were previously only included in the enhanced diagnostics information, are now also included in the basic diagnostics information. This is helpful in case a high memory usage alarm is raised when the Apama-ctrl microservice consumes 90% of the maximum memory permitted for the microservice container and you only have basic diagnostics information available. See also [Downloading diagnostics and logs](/streaming-analytics/troubleshooting/#diagnostics-download).
