---
date: '2026-07-15'
title: Dashboarding technology update and required gridstack dependency
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
ticket: MTM-66389
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
Starting with the next major Web SDK release, version 1024.0.0, we are updating the underlying dashboarding technology.

As part of this change, every application that uses the Web SDK dashboarding technology must import the `gridstack` dependency.

Additionally, a significant part of the custom implementation in the DashboardChildChange class has been removed.

**Breaking change**

Applications that rely on dashboarding features but do not import `gridstack` will fail to build or run correctly after upgrading to 1024.0.0.

**Impact**: Custom applications built with the Web SDK dashboarding technology are affected.

**Migration**:

* Add `gridstack` as a dependency and import it in each application that uses dashboarding features.
* Review custom integrations that depend on the previous `DashboardChildChange` implementation and update them as required.
