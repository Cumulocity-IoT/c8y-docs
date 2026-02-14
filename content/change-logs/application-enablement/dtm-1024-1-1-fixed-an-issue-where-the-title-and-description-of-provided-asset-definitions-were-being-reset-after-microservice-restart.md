---
date: ""
title: "Fixed an issue where the title and description of provided Asset Definitions were being reset after microservice restart"
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
Fixed an issue where title and description of provided Asset Definitions
were incorrectly overwritten instead of being preserved from the
tenant’s existing Asset Definition, while schema and other metadata are
updated from the library.