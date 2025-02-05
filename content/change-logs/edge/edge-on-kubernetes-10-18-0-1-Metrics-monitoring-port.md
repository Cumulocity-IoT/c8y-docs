---
date: 2024-03-02
title: Metrics monitoring port
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Edge
component:
  - value: component-g7hnfbu4J
    label: Edge on Kubernetes
build_artifact:
  - value: tc-nJH2U7g3u
    label: edge-operator
version: 10.18.0.1
---
The Edge operator's Prometheus-compatible metrics port has been changed from 8443 to 3443 due to a conflict with another core component.

For more information on Edge monitoring, refer to [Monitoring](https://cumulocity.com/docs/2024/edge-kubernetes/edge-operations/#monitoring).
