---
date: '2025-03-05'
title: Angular 19 upgrade and standalone components
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
ticket: MTM-62856
version: 1022.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In a future version of the Web SDK, we will update the Angular version used in the Web SDK to version 19. This update brings improvements and new features, but may also introduce breaking changes that could impact your existing implementations.

As part of this change, the pipe, directives and components that are offered as part of the `@c8y/ngx-components` library, will now be available in standalone mode.

To ensure a smooth transition to Angular 19 and help you to adapt your implementations, we will provide an upgrade documentation when this change happens. This documentation will help you navigate through the changes and update your codebase accordingly.

To ensure a day one compatibility of your plugins with applications based on the v1022 Web SDK, you should already today add the standalone flag to all components/pipes/directives of your plugins.
You do not need to migrate your components/pipes/directives to `standalone: true`, you can also set it to `false`. You just need to ensure that you've set the standalone flag.
Angular v19 will otherwise default to `standalone: true` instead of `standalone: false` if the `standalone` flag has not been defined, which can break your components/pipes/directives.
