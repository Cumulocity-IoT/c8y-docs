---
date: ""
title: Enhanced access control and permissions for LWM2M service
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-5341
version: 1022.3.0
---
To improve security for the LWM2M service, stricter access control has been enforced. To work with device-specific configurations from the Device management application, including **Device settings**, **Connectivity**, and **Bootstrap**, **Device protocols**, **Device registration**, users must now be granted explicit LWM2M ADMIN and READ permissions. Administrators can assign the necessary permissions to users in **Administration** > **Accounts** > **Users** > **Roles**.

