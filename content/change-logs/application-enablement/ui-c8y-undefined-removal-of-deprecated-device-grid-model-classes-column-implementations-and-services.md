---
date: 2023-12-06T13:47:00.530Z
title: Removal of deprecated device-grid model classes, column implementations
  and services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
---
As announced earlier, see also [release 10.17](https://cumulocity.com/releasenotes/release-10-17-0/announcements-10-17-0), shared classes, components and services from the @c8y/ngx-components/device-grid are deprecated. Those deprecated items have now been removed.

This change only affects you, if you or your development team use the Web SDK to extend {{< product-c8y-iot >}} UI applications or to build your own web applications. If you use the device-grid functionalities, check the deprecation documentation and alter your code accordingly. Refer to the deprecations in the [WebSDK resources documentation for the device-grid service](http://resources.cumulocity.com/documentation/websdk/ngx-components/injectables/DeviceGridService.html). Other deprecations for reference are also marked in this documentation.
