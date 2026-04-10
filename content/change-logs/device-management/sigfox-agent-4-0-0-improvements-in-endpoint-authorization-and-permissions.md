---
date: '2026-04-02'
title: Sigfox service improvements in endpoint authorization and permissions
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc-CB45dexyZ
    label: sigfox-agent
ticket: DM-5344
version: 4.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-02'
  - label: apj.cumulocity.com
    date: '2026-04-08'
  - label: jp.cumulocity.com
    date: '2026-04-08'
---
To improve security and access control for Sigfox device connectivity, the permission requirements for managing Sigfox connections have been clarified and enforced.
Users now need specific Sigfox permissions to work with connections under **Administration > Connectivity**. To view Sigfox connections, users require the Sigfox READ permission, while creating, updating, or deleting connections requires the Sigfox ADMIN permission. Additionally, Sigfox callback endpoints such as `sigfoxDataCallback` and `sigfoxErrorCallback` now require either the Sigfox ADMIN permission or the Inventory READ permission.
This change affects users accessing the **LPWAN configuration** tab in device details within the Device Management application, as viewing the **Current connection** field now requires READ permission. Administrators can assign the necessary permissions to users in **Administration > Accounts > User, Roles**.
For details, see [Sigfox](/device-integration/lpwan/#sigfox).
