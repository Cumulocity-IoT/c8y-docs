---
date: ""
title: "Added validation to prevent generic Asset Definitions to become non-generic"
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
ticket: "CTM-2672"
version: "1024.1.0"
---
Once an Asset Definition is generic by having one of its properties `composition.additionalSubAssets` or `composition.additionalProperties` set to `true`, it must not be updated to be non-generic by setting the property to `false`. This is required to avoid inconsistencies of Assets that adhere to this Asset Definition. Now, there is a validation in place to detect and reject such updates.
