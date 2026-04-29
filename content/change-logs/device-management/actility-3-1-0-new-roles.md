---
date: 
title: Actility service improvements in endpoint authorization and permissions
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc--fVxjY7du
    label: actility-agent
ticket: DM-5337
version: 3.1.0
---
To improve security and access control for Actility device connectivity, the permission requirements for managing 
Actility connections have been clarified and enforced. Users now need specific Actility permissions to work with 
connections under Administration > Connectivity. To view Actility connections, users require the Actility READ 
permission, while creating, updating, or deleting connections requires the Actility ADMIN permission. Administrators 
can assign the necessary permissions to users in Administration > Accounts > User, Roles.oper request handling.
