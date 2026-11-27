---
date: ""
title: "Deleting an asset with assigned devices or subassets now succeeds"
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
ticket: "CTM-3341"
version: "1025.18.0"
---
Previously, the Asset API failed in some circumstances when deleting an asset that had directly assigned devices or subassets, returning an authentication error during the unassign step. This issue prevented users from managing asset hierarchies where devices were attached to parent assets.

The delete operation now succeeds when you delete a parent asset with assigned devices or subassets using `deleteSubAssets=false` or `deleteDevices=false`, returning a 204 status code as expected. The Asset API correctly unassigns devices and subassets from the parent asset during the deletion process instead of failing with an error.

This fix allows you to delete assets with assigned devices and subassets without encountering errors, improving the reliability of asset management operations across your installations. Existing workflows that previously failed when deleting assets now complete successfully.
