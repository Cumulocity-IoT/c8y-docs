---
date: '2026-11-19'
title: Added new endpoint to allow asynchronous deletion of assets
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-3231
version: 1025.17.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-19'
  - label: apj.cumulocity.com
    date: '2026-11-20'
  - label: jp.cumulocity.com
    date: '2026-11-20'
---
Deleting assets with large hierarchies or extensive associated data previously failed with timeout errors. The Asset API now supports asynchronous deletion by using the `X-Async-Mode` header with the DELETE `/assets/{assetId}` endpoint, allowing these operations to complete in the background without timing out.

When you use asynchronous deletion, the system processes the deletion in the background and does not report errors to the client. To verify that the asset has been deleted, retrieve it repeatedly until the response returns a 404 status code. This behavior matches the existing asynchronous deletion functionality in the Inventory API, providing a consistent experience.

Existing applications continue to work without changes, as synchronous deletion remains the default behavior.
