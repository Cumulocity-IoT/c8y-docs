---
date: ""
title: Group consecutive calls of the same AI tool
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67956
version: 1025.11.0
---
When the AI assistant called the same AI tool several times in a row, each call appeared as a separate entry in the conversation, which made longer responses hard to follow. Now, consecutive calls to the same AI tool are grouped into one entry, so you see a shorter and clearer sequence of tool activity. Tool calls that use different AI tools still appear as separate entries. 

No action is required. Existing tenants, users, and conversations are not affected, and the AI tools work as before. Only the display of the tool calls changes.