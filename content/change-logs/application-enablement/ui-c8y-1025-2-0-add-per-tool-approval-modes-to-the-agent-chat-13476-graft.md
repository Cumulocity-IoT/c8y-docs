---
date: ""
title: Per-tool approval modes in the agent chat
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
ticket: MTM-67779
version: 1025.2.0
---
Agents in the agent chat can run tools to perform actions for you. Before this change, you could not control how the agent chat requests approval for each tool. Now you can select an approval mode for each tool in the agent chat. The approval mode determines whether the agent asks you for approval before it runs a specific tool. Existing agents and chat sessions continue to work. Review the approval mode of each tool to confirm that it matches how much control you need over the actions your agents perform.