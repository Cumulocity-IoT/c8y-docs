---
date: 
title: Changing probes setting in microservice manifests 
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65302
version: 2026.23.0
---

Until now, the host of a liveness or readiness probe of a microservice could be set in the microservice manifest. 
To avoid possible security implications, setting the host in the manifest probes will be disabled in the future.

The removal is planned for Q2 2026 in CD versions and in the 2027 annual release.

The introduced change is currently disabled by default and can be enabled via a feature toggle `core.ms-hosting.no-host-in-probes-in-manifest`.

{{< c8y-admon-important >}}
In Q2 2026 for the CD versions and in 2027 for the yearly releases, this change will become **mandatory**.
{{< /c8y-admon-important >}}
~                                              
