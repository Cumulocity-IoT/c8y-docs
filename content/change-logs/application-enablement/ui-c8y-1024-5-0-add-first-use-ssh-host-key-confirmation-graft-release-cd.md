---
date: '2026-08-05'
title: Improved security by SSH host-key confirmation on first use
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-6421
version: 1024.5.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
When the "hostkey-autosave" tenant option is set to "true," and you connect to a device via SSH for the first time, the system now prompts you to confirm the host key before establishing the connection. Previously, SSH connections could be established without explicit host-key verification, which posed a security risk by making it possible to connect to unverified or potentially compromised devices. With this change, you must verify and accept the host key during the initial connection attempt, ensuring that you are connecting to the intended device and protecting against man-in-the-middle attacks. This feature requires a compatible version of the cloud-remote-access microservice. 
