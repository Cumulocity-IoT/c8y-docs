---
date: ""
title: "Scalability and load distribution"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3190"
version: "2.0.0"
---
Now runs two fixed replicas that share the N2 subscription, with
liveness (/health/live) and readiness (/health/ready) probes. Per-pod
resources and concurrency are reduced to match.