---
date: '2025-06-05'
title: >-
  LWM2M device real-time operation subscriptions no longer break during core
  upgrades
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4774
version: 1021.10.11
---
When the core platform was upgraded/restarted, this caused the LWM2M service no longer having an active real-time subscription for operations. It required a LWM2M new registration or the expiration of an operation subscription time-to-live duration to recover from this state. This issue has been resolved. 
Now, in such cases, the real-time session will be properly resubscribed on the new core node, ensuring continued data flow and improved reliability.
