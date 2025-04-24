---
date: 2025-03-19
title: OperationsListModule has been removed in favor of standalone components
  and environment providers
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
ticket: DM-4312
version: 1022.0.0
---

The  `OperationsListModule` component, which was deprecated since version 1021.50.0, has now been removed. In case you use `OperationsListComponent` and/or `OperationsListItemComponent` you can now import them directly as standalone components. In case you want to continue to provide the **Device control** > **Single operations** feature in your Device management application, you can take advantage of the `deviceControlOverviewFeatureProviderFactory()` factory function which provides all necessary environment providers that hook the **Single operations** tab and the respective navigator node. For the **Device control** section on the **Device info** tab, you can respectively use the `deviceControlTabFeatureProviderFactory()` factory function. If you already import `OperationsModule` from `@c8y/ngx-components/operations` in your application, no change is needed since it has been refactored to use the provider factories as a replacement of the removed `OperationsListModule`.
