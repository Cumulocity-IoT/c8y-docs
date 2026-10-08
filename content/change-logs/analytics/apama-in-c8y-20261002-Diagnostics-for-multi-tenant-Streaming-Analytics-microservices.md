---
date: 
title: Diagnostics available for multi-tenant Streaming Analytics microservices
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
ticket: PAB-5360
version: 
---

You can now download basic diagnostics information from the Streaming Analytics application when it uses a multi-tenant microservice. Previously, only the tenant that owns the microservice could download diagnostics information.

For a multi-tenant microservice, the diagnostics ZIP files only contain data that belongs to your own tenant, such as your models, smart rules, alarms, tenant options, and the log messages of your tenant. They contain no data of other tenants and no information about the shared microservice as a whole which cannot be attributed to a single tenant. This also applies to the tenant that owns the microservice: its ZIP files no longer contain correlator diagnostics, metrics, profiling data, or the complete log file. The owning tenant can also download enhanced diagnostics information, which additionally contains its EPL apps and extensions. Diagnostics for per-tenant microservices are unchanged.

In the right drawer, the diagnostics links are replaced by a **Download diagnostics** button.

For details, see [Downloading diagnostics and logs](/streaming-analytics/troubleshooting/#diagnostics-download).
