---
date: ""
title: "linked assets preserved when updating assets with linked series"
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
ticket: "CTM-3123"
version: "1025.9.0"
---
When assets share the same linked series source, updating one asset
could cause linked assets to be lost from the opposite link.

Previously, updating an asset would remove its linked asset entry from
the opposite link, even though the linked series relationship still
existed. Now, when you update an asset, all linked asset entries are
preserved, ensuring that both the updated asset and unchanged assets
maintain their complete relationship data.

This fix ensures that asset linking relationships remain consistent and
complete across your installation. Existing assets with linked series
will now correctly display all related assets after any update
operation.