---
date: ""
title: hide conversation history when storage is unavailable (#13428) [GRAFT][release/cd] (#13453)
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
ticket: MTM-66369
version: 1024.23.2
---
The agent chat shows conversation history only when the AI agent manager
reports its conversation storage as connected. Without storage, the
picker and fork action stay hidden instead of raising an error alert
after every response.