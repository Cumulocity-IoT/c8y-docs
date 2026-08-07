---
date: '2026-07-15'
title: Removal of the AngularJS event list widget and view from @c8y/ng1-modules
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
ticket: MTM-66925
version: 1024.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-15'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
Starting with version 1024.0.0, the AngularJS event list has been removed from the `@c8y/ng1-modules` package. This covers both the Device Management event list view and the event list dashboard widget, together with their binary-event preview components. The functionality is fully replaced by the Angular event list shipped in `@c8y/ngx-components`, which the standard Device Management and Cockpit applications already use.

**Breaking change**

Custom applications that reference the removed modules in their AngularJS bootstrap (`ng1.ts`) will no longer build after upgrading. The affected import paths are:

* `@c8y/ng1-modules/devicemanagement-eventList/cumulocity.json`
* `@c8y/ng1-modules/eventList/cumulocity.json`

The build fails with a `Module not found` error for these paths.

**Impact**: Custom applications scaffolded from the Device Management or Cockpit application before the event list was migrated to Angular still contain these imports and are affected. The standard Device Management and Cockpit applications are not affected.

**Migration**: Remove the two imports from your `ng1.ts`. The Angular event list is provided by:

* `eventsDeviceManagementProviders` from `@c8y/ngx-components/events/devicemanagement` for the Device Management view.
* `eventsCockpitProviders` from `@c8y/ngx-components/events/cockpit` for the Cockpit view.
* The event list dashboard widget is registered automatically through `cockpitWidgetsExports` from `@c8y/ngx-components/widgets/cockpit-exports`; existing widget configurations remain compatible.
