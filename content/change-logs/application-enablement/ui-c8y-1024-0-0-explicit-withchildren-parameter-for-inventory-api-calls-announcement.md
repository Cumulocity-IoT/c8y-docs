---
date: 
title: Explicit withChildren parameter for Inventory API calls
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64714
version: 1024.0.0
environment_availability:
---
Starting with version 1024.0.0, the {{< product-c8y-iot >}} platform changes the server-side
default of the `withChildren` query parameter on `/inventory/managedObjects` GET endpoints from
`true` to `false` for performance optimization. Responses no longer include the `childAssets`,
`childDevices`, and `childAdditions` reference arrays unless `withChildren=true` is set.

This is a server-side change. The Web SDK's `InventoryService` is unchanged — it passes
`withChildren` straight through and never set a default. The UI codebase has been adapted:

* **AngularJS (legacy modules)**: A new HTTP interceptor `c8yInventoryWithChildrenInterceptor`
  appends `withChildren=true` to `/inventory/managedObjects` GET requests when the parameter is
  not already set, preserving existing behavior without call-site changes.
* **Angular (`@c8y/ngx-components`)**: Inventory call sites now pass `withChildren` explicitly.
  Shipped components behave correctly under the new default; no action is required.

**Migration**

If your custom code reads `childAssets`, `childDevices`, or `childAdditions` from an
`InventoryService.detail()`, `.list()`, or `.listQuery()` response, add `withChildren: true` to
those calls. Otherwise those references will be missing once the new default is active for the
tenant.
