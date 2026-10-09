---
date: '2026-10-08'
title: Subasset creation now works for users with inventory roles
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3242
version: 1025.14.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-08'
---
The Asset API endpoint for creating and assigning subassets in a single call was previously restricted to users with specific `INVENTORY_*` permissions, even when users had the correct inventory role for the parent asset. This limitation prevented role-based users from using the POST `/service/dtm/assets/{parentAssetId}/subAssets` endpoint effectively. The permission model has been updated to respect inventory role assignments, allowing users with the appropriate role for the parent asset to create and assign subassets without requiring additional inventory permissions.

Users with inventory roles can now create subassets through the Asset API without needing explicit `INVENTORY_*` permissions. This change simplifies access control for asset management workflows and ensures that role-based authorization works consistently across all asset operations.
