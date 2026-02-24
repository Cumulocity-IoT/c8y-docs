---
date: 2026-03-31
title: Angular 20 upgrade
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
version: 1023.0.0
---
Starting with version 1023.0.0, the Web SDK has been upgraded to Angular 20. As Angular is updated half-yearly, the y2026 release skips the intermediate Angular 19 version. This update brings performance improvements and new features, but also introduces a critical breaking change regarding the standalone flag that requires immediate attention.

Angular 19 changed the default value for the `standalone` flag from `false` to `true` for components, pipes, and directives. Since the yearly release jumps directly to Angular 20, this change affects all plugin developers. To ensure day-one compatibility of your plugins with applications based on the v1022 Web SDK, you must explicitly add the `standalone` flag to all components, pipes, and directives in your plugins. You can set this flag to either `true` or `false` depending on your implementation needs - the critical requirement is that the flag must be explicitly defined. If the standalone flag is not defined, Angular will default to `standalone: true`, which can break your existing components, pipes, and directives that were implicitly using `standalone: false`.

Comprehensive upgrade documentation is available to help developers navigate the transition and update their codebases accordingly, see the [Angular 20 upgrade documentation](/web/upgrade/#upgrading-to-angular-20).