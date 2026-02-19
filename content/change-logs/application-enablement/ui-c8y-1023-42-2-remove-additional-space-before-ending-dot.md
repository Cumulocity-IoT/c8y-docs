---
date: '2026-02-13'
title: Removed extra space before end punctuation marks in empty state components
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-13'
  - label: apj.cumulocity.com
    date: '2026-02-16'
  - label: jp.cumulocity.com
    date: '2026-02-16'
  - label: emea.cumulocity.com
    date: '2026-02-17'
  - label: us.cumulocity.com
    date: '2026-02-17'
  - label: cumulocity.com
    date: '2026-02-17'
---
When viewing empty state components, such as widget configuration previews (for example, the "Linear gauge" widget's empty state) an extra space appeared between the text and the end punctuation mark (for example, "text ."). This was caused by improper formatting in the HTML templates used to render these previews. The underlying template formatting has been corrected to eliminate these extra spaces, which also prevents similar spacing issues from occurring in future widget previews and other UI elements that use the same templates.
