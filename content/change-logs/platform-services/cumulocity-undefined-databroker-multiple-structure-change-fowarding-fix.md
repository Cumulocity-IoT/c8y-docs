---
---
date: 2024-10-17
title: "All children now synchronized in immediate data broker structural change forwarding"
product_area: Platform services
change_type:
- value: change-VSkj2iV9m
  label: Fix
  component:
- value: component-V6J_FcOT2
  label: Data broker
  build_artifact:
- value: tc-QHwMfWtBk7
  label: cumulocity
  ticket: MTM-58684
  version: 10.18.TBC.TBC
---
When a data broker connection synchronizes a structural change that adds multiple child assets or devices to a group, all assets or devices are now sent immediately. Previously, only one asset or device would sent immediately and others would not be synchronized until the periodic consistency check next ran. This behaviour is most commonly seen when assigning multiple assets or devices in a Device management groups page, when the group is within the scope of a data broker connection filter.