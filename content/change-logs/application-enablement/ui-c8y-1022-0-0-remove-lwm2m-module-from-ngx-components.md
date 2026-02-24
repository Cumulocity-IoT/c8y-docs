---
date: 2026-03-31
title: LWM2M module removal from @c8y/ngx-components library
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
ticket: DM-4281
version: 1022.0.0
---
In a future version of the Web SDK, the LWM2M module will be removed from the `@c8y/ngx-components` library. If you use the LWM2M module from @c8y/ngx-components in your custom UI components, this will no longer work in future Web SDK versions and must be removed. LWM2M will be available as a plugin in the Device Management application.
