---
date: '2026-11-12'
title: Activate or deactivate all instances of a template model in Analytics Builder
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5367
version: 27.306.0
---

You can now activate or deactivate all instances of a template model in one step from Analytics Builder. This feature is available in the model editor, instance editor, and when opening a model that has active instances. Previously, to edit the model you first had to manually change the state of each instance separately in the instance editor.

In the toolbar of the model editor and the instance editor, a new **N/M instances active** dropdown menu offers **Activate all** and **Deactivate all**. The menu is shown to users with ADMIN permission for "CEP management".

- **Activate all** activates the inactive production instances that have a name and a value for each required template parameter. Other instances are skipped.
- **Deactivate all** deactivates all active instances.

The model editor of a template model now also shows **Editing is disabled** while at least one instance is active.

For details, see [Activating and deactivating all instances](/streaming-analytics/analytics-builder/#activating-and-deactivating-all-instances).
