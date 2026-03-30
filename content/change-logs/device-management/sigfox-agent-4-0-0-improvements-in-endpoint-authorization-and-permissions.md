---
date: ""
title: Improvements in endpoint authorization and permissions
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
---
Description:  The required user permissions to read, create, or update Sigfox connections under Administration > Connectivity have been updated. To read the Sigfox connections, users must have at least the Sigfox READ permission, and to create/update/delete connections, users require the Sigfox ADMIN permission. In the Device Management application, this affects the LPWAN configuration tab in the device details, as the Current connection field requires READ permission. You can assign the necessary permissions to users in Administration > Accounts > User, Roles.  Moreover, the sigfox 'callback' endpoints such as 'sigfoxDataCallback', 'sigfoxErrorCallback' etc. require the Sigfox ADMIN permission or at least the Inventory READ permission.