---
date: '2026-06-17'
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-17'
  - label: apj.cumulocity.com
    date: '2026-06-18'
  - label: jp.cumulocity.com
    date: '2026-06-18'
  - label: us.cumulocity.com
    date: '2026-06-19'
  - label: cumulocity.com
    date: '2026-06-19'
---
To improve security for the LWM2M service, stricter access control has been enforced. To work with device-specific LWM2M configurations from the Device Management application, users must now be granted explicit LWM2M ADMIN and READ permissions. This affects **Device settings**, **Connectivity**, **Bootstrap**, and more under the **LWM2M Configuration** tab, the device registration, and **Device protocols** at the tenant level. Administrators can assign the necessary permissions to users in **Administration** > **Accounts** > **Users** > **Roles**.

