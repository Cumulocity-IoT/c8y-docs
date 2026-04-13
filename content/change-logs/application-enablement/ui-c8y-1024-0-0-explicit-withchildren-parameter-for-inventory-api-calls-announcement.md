---
date: '2026-04-08'
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
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Starting with version 1024.0.0, the {{< product-c8y-iot >}} platform changes the server-side default of the `withChildren` query parameter on `/inventory/managedObjects` REST endpoints from `true` to `false` for performance optimization. The entire UI codebase has been adapted to be compatible with the new default.

Two categories of changes were made:

* **AngularJS (legacy modules)**: A new HTTP interceptor `c8yInventoryWithChildrenInterceptor` was added. It automatically appends `withChildren=true` to all GET requests to `/inventory/managedObjects` endpoints (list and detail, including `/childAssets` and `/childDevices` sub-resources) if the parameter is not already set. This preserves the old behavior for all legacy AngularJS code without requiring individual call-site changes.
* **Angular (@c8y/ngx-components)**: Every `InventoryService.detail()`, `InventoryService.list()`, and `InventoryService.childAssetsList()` call across `@c8y/ngx-components` was updated to explicitly pass `withChildren: false` where child references are not needed, or `withChildren: true` where they are. This makes each call site's intent explicit rather than relying on the server default.

**Breaking change**

SDK consumers who call `InventoryService.detail()`, `.list()`, `.listQuery()`, `.childAssetsList()`, or `.childDevicesList()` without specifying `withChildren` are affected. Previously, the server returned child references by default; now it does not. Responses have smaller payloads but are missing `childAssets`, `childDevices`, and `childAdditions` references unless explicitly requested.

AngularJS plugin developers are shielded by the interceptor and their existing code continues to work as before.

**Migration**: All `InventoryService` calls that need child references in the response must now explicitly pass `withChildren: true`. Calls that do not need child references should pass `withChildren: false` or omit the parameter, which now defaults to `false` on the server. Review all `inventoryService.detail()` and `inventoryService.list()` call sites in custom code.
