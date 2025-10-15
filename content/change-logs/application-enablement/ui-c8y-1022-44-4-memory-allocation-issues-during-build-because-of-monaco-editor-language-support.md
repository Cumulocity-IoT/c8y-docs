---
date: ""
title: Fixed memory allocation issues during build due to large monaco-editor language support files
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
ticket: MTM-64566
version: 1022.44.4
---
Since monaco-editor workers for language support are quite big files (around 1-6MB), webpack had problems with memory allocation during the build.
Now, monaco related service workers are build in separate step. Monaco workers are built first, before app, then they are copied to build folder.