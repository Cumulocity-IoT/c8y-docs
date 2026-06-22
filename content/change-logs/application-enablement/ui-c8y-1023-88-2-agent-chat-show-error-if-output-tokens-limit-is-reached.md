---
date: ""
title: Agent chat shows error when output token limit is reached
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
ticket: MTM-65514
version: 1023.88.2
---
For any AI agent, you can set a maximum output token limit to control the number of tokens the model generates in a single response, which has an effect on the chat process. Previously, if this limit was reached, the response would be incomplete without clear feedback. Now, when the output token limit is reached for a single response, an error message is displayed to inform you of the limitation. You can continue the conversation after this error, as the token limit applies only to individual responses, not to the total tokens used across the entire conversation.