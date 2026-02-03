---
date: 2023-12-20
title: UI component c8y-stepper function corrected
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-56028
version: 10.18.500.13
---
The onStepChange function in the c8y-stepper UI component is intended to emit the selected step value whenever it changes through user interaction. However, this output event was not being triggered properly. This issue has now been corrected - onStepChange will once again reliably publish the current step value after any update.
