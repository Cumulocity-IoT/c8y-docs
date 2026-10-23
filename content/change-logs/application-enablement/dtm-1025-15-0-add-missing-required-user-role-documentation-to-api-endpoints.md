---
date: '2026-10-23'
title: Added missing required user role documentation to Asset API endpoints
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
ticket: CTM-3279
version: 1025.15.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-23'
---
Several endpoints of the Asset API, particularly those under `/service/dtm/definitions/`, were missing documentation about required user roles and permissions. This made it unclear what access level users needed to successfully call these endpoints.

The Asset API documentation now includes complete required user role statements for all endpoints. Users can now see exactly which permissions are needed before making API calls, reducing errors from insufficient access levels and improving the developer experience when integrating with the platform.

This change ensures consistency across the Asset API documentation and helps developers quickly identify permission requirements for any endpoint they use.
