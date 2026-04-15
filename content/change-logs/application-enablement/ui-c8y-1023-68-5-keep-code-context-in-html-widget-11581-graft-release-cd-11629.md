---
date: ""
title: HTML widget preserves code context
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
ticket: MTM-66395
version: 1023.68.5
---
When using the AI assistant in the HTML widget to build a widget, the widget previously lost its code context during revisit, which prevented you from aligning the existing code. The HTML widget now properly preserves the code context, ensuring that code can be changed with prompts again. This fix improves the AI code assistant when asking for changes.