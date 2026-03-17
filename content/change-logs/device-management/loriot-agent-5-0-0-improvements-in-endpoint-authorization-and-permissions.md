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
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-5340
version: 5.0.0
---
The required user permissions to read, create, or update "Loriot Connections" under Administration > Connectivity have been updated. In order to read Loriot connections, users must have at least the Loriot 'READ' permission, and to create/update/delete connections, users require the Loriot 'ADMIN' permission. In the Device Management application, this affects the LPWAN configuration tab in the Loriot device details, as the 'Current connection' field requires the 'READ' permission. You can assign the necessary permissions to users in Administration > Accounts > Users/Roles.
