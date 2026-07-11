---
date: ""
title: "Validate device references before creating or updating linked series."
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
ticket: "CTM-2712"
version: "1025.8.1"
---
The Asset API previously accepted requests to create or update assets
with linked series that referenced non-existing devices. This caused
inconsistent data states where the asset was partially updated before
the operation failed when attempting to update the opposite links. The
API now validates that all devices referenced in the request body exist
before creating or updating any linked series, rejecting the request
immediately if a device does not exist and leaving the asset unchanged.
This validation applies only to devices referenced in the request body,
not to devices already stored in the asset.

This change affects any applications or integrations that create or
update assets with linked series. You may need to verify that all device
references exist before submitting requests, but your asset data is now
protected from incomplete updates and inconsistent states.