---
date: ""
title: Remove extra space before ending punctuation in empty state components
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
ticket: MTM-65698
version: 1023.42.2
---
When viewing empty state components, e.g. widget configuration previews, such as the Linear gauge widget's empty state, an extra space was appearing between text and the ending punctuation mark (for example, "text ."). This was caused by improper formatting in the HTML templates used to render these previews. The underlying template formatting has been corrected to eliminate these extra spaces, which also prevents similar spacing issues from occurring in future widget previews and other UI elements that use the same templates.