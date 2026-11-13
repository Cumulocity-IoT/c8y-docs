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
version: 2026.374.0
---
The deprecation of the possibility to liveness and readiness probes of a microservice in the microservice was under [Public Preview](/change-logs/?change-type=.change-type-announcement#cumulocity-2025-322-0-deprecation-of-tenant-options-in-request-headers), and is now Generally Available (GA) for CD versions 2026.374.0 and higher, and will be present in the 2027 annual release.

Until now, the host of a liveness or readiness probe of a microservice could be set in the microservice manifest unless this functionality was explicitly disabled via a feature toggle.
To avoid potential security implications, setting the host in manifest probes is now disabled by default. Uploading a microservice that uses the `host` parameter within the readiness or liveness probe is now rejected.

{{< c8y-admon-caution >}}
Migration from Public Preview to General Availability - action required.
If you are relying on readiness and liveness probes containing the 'host' parameter for your microservice, you need to change this behaviour respectively for cumulocity core CD versions higher than 2026.374.0 and 2027 annual release.
{{< /c8y-admon-caution >}}
~                                              
