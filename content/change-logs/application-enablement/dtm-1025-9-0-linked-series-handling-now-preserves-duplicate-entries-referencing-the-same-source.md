---
date: ""
title: "linked series handling now preserves duplicate entries referencing the same source"
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
ticket: "CTM-3139"
version: "1025.9.0"
---
The Asset API previously dropped duplicate Linked Asset entries when
multiple series on the same asset referenced identical source IDs,
fragments, and series.

The Asset API now correctly maintains all Linked Asset entries, even
when several reference the same source. Each Linked Series is properly
mirrored back to the source device during creation, updates, and
reconciliation operations. This fix applies automatically to both new
Linked Series and existing ones affected by this issue when they are
next updated or reconciled.

No action is required from users. The fix takes effect automatically
across all tenants and existing installations.