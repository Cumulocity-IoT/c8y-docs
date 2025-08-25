---
date: '2025-08-21'
title: Improved querying applications by user with dropOverwrittenApps
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63541
version: 2025.263.0
---
When querying applications by user with `dropOverwrittenApps` set to `true`, all applications that are overwritten by the tenant will now be filtered out from the result.
The filtering includes applications to which the user is not subscribed.

For example: User U is subscribed to the hosted application A from the parent tenant, and that application is overwritten on the tenant of user U by application A1. 
Before this change, the user received a list of applications including A. Now, the list neither includes A nor A1.  

This change makes the API behavior consistent with the `/application/applications/<application_id>/manifest` endpoint.
