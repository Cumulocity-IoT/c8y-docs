---
date: '2026-08-18'
title: Preserved existing linked series when updating assets
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
ticket: CTM-3124
version: 1025.9.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-18'
  - label: apj.cumulocity.com
    date: '2026-08-19'
  - label: jp.cumulocity.com
    date: '2026-08-19'
  - label: us.cumulocity.com
    date: '2026-08-20'
  - label: cumulocity.com
    date: '2026-08-20'
---
When you update an asset using the `/assets/{id}` endpoint or the upsert
`/assets` endpoint, the Asset API now preserves any existing
`LinkedSeries` entries instead of replacing them. Previously, updating
an asset would remove all existing linked series data, requiring you to
resubmit the complete linked series configuration with each update. Now
the system merges incoming linked series updates with existing entries,
so you only need to specify the `LinkedSeries` that need to be changed.

This change ensures that your asset configurations remain stable across
updates and prevents accidental data loss from linked series
relationships. Existing installations continue to work without changes,
and all assets automatically benefit from this improved merge behavior
on the next update.
