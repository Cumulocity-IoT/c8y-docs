---
date: 2023-12-06T13:19:09.229Z
title: Improved error message on failure of device deletion
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-55536
version: 10.18.490.0
---
If a user with minimal permission tries to delete a device an error message showed up stating "Could not delete device."
Now, together with the failure message, the reason of failure is displayed.
