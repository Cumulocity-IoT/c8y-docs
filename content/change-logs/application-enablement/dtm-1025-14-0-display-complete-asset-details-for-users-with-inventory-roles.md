---
date: '2026-10-08'
title: Displaying complete asset details for users with inventory roles
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
ticket: CTM-3150
version: 1025.14.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-08'
  - label: apj.cumulocity.com
    date: '2026-10-09'
  - label: jp.cumulocity.com
    date: '2026-10-09'
---
Users with inventory roles only previously saw incomplete asset
information, including default icons, internal asset definition
identifiers instead of names, and empty properties sections. The system
now displays complete asset details for these users, matching the
information available to all other users.

Users with inventory-only access now see the correct icon, asset
definition name, and all properties in the assets list and in the
subassets view. This change ensures consistent asset visibility across
all user permission levels without requiring additional global roles.
