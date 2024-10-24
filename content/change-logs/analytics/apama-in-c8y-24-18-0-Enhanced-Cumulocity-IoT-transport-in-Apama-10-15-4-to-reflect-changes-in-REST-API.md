---
date: 2023-12-06T15:49:00.513Z
title: Enhanced Cumulocity IoT transport in Apama 10.15.4 to reflect changes in
  REST API
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 24.18.0
---
Due to a change in Cumulocity IoT announced with [release 10.17](https://cumulocity.com/releasenotes/release-10-17-0/announcements-10-17-0), Apama 10.15.4 now explicitly sets `withTotalPages` to `true` for applicable requests.

Range-based queries (such as `FindManagedObject`) attempt to retrieve all resources matching the query parameters by default. Explicitly setting a value for `currentPage` or setting `withTotalPages` to `false` can improve the query performance by disabling paging. See the information on REST usage and query result paging in the [{{< openapi >}}](https://cumulocity.com/api/core/#section/REST-implementation/REST-usage) for more information.
