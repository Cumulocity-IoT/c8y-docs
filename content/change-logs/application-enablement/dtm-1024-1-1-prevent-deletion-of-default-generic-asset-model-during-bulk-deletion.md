---
date: '2026-02-19'
title: Prevent deletion of default generic asset model during bulk deletion
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
ticket: CTM-2726
version: 1024.1.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
---
Previously, users could delete the default generic asset model when
using bulk deletion. Since this model is required as the default, it
shouldn't be deletable. This update ensures that the default generic asset
model cannot be deleted during bulk deletion.
