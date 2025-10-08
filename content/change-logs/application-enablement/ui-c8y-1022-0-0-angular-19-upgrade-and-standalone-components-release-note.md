---
date: 2025-06-16
title: Angular 19 upgrade and standalone components
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Improvement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62856
version: 1022.0.0
---
Starting with version 1022.0.0, the Web SDK has been upgraded to Angular 19. This update brings performance improvements and new features, but may also introduce breaking changes that could impact your existing implementations.

Comprehensive upgrade documentation is available to help developers navigate the transition and update their codebases accordingly, see the [Angular 19 Upgrade Guide](/web/upgrade/#upgrading-to-angular-19).

To ensure a day one compatibility of your plugins with applications based on the v1022 Web SDK, you should add the standalone flag to all components/pipes/directives of your plugins.
You do not have to migrate your components/pipes/directives to `standalone: true`, you can also set them to `false`. You just need to ensure that you've set the standalone flag.
If the standalone flag has not been defined, Angular v19 will default to `standalone: true` instead of `standalone: false`, which can break your components/pipes/directives.