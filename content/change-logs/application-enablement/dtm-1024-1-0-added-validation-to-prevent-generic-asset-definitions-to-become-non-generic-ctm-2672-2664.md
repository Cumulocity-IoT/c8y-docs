---
date: ""
title: "Added validation to prevent generic asset definitions from becoming non-generic"
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
Once an asset definition is generic by having one of its properties `composition.additionalSubAssets` or `composition.additionalProperties` set to `true`, it must not be updated to be non-generic by setting the property to `false`. Otherwise, inconsistencies in assets that adhere to this asset definition can occur. To avoid this, validation has been added to detect and reject such updates.
