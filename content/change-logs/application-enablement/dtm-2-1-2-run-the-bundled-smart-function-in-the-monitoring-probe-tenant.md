---
date: ""
title: "Run the bundled smart function in the monitoring probe tenant"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3328"
version: "2.1.2"
---
The monitoring probe creates measurements in its tenant and waits for
upstream measurements from the bundled smart function. Previously, when
a custom smart function bundle was deployed, it replaced the bundled
function for all tenants including the probe tenant, causing the probe
to fail even though the service was healthy.

The system now includes a new PROBE_TENANT_IDS setting that specifies
which tenants always run the bundled smart function, regardless of any
deployed custom bundles. By default, the monitoring-tenant runs the
bundled function in both inheritance modes, while all other tenants
continue to use their deployed functions as expected. The health
endpoint correctly reports source: bundled for probe tenants, and the
setting appears in the config info metric for visibility.

Probe tenants now report accurate health status and continue operating
correctly even when custom smart function bundles are deployed in your
environment. The probe device must be linked to an asset for the bundled
function to process its measurements. For details, see
[SMART_FUNCTIONS.md](https://github.com/Cumulocity-IoT/dtm-data-service/pull/docs/SMART_FUNCTIONS.md).
