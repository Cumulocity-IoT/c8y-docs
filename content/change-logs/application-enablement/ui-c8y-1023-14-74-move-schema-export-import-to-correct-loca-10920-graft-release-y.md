---
date: ""
title: fix HTML widget export, import, and schema definition
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
ticket: MTM-65612
version: 1023.14.74
---
The export, import, and schema properties for the HTML widget were defined in the wrong location, causing validation errors in the Import/Export tab of Dashboard settings. These properties have been moved to the correct location under the data key, consistent with other widgets. The HtmlWidgetConfig interface was also updated to make device and settings optional, as HTML widgets can be created without a device.