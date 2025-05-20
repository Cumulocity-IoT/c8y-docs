---
date: ""
title: LWM2M device broken real-time operation subscriptions during Core upgrades
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
version: 1020.440.39
---
When the Core platform is upgraded/restarted, in LWM2M Service this caused a side-effect of not having an active real-time subscription for operations anymore. It required a LWM2M new registration or operation subscription time to live duration to be expired to recover from this state.
This issue has been resolved. Now, in such cases, the real-time session will be properly resubscribed on the new core node, ensuring continued data flow and improved reliability.
