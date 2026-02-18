---
date: ""
title: "Title and description of asset definitions no longer reset after microservice restart"
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
ticket: "CTM-2673"
version: "1024.1.1"
---
Previously, the title and description of provided asset definitions
were incorrectly reset after a microservice restart instead of being preserved from the
tenant’s existing asset definition, while schema and other metadata were
updated from the library. This issue has been fixed. The title and description of asset definitions are no longer overwritten after a microservice restart.