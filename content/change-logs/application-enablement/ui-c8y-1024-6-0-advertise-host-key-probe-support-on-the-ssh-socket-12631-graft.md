---
date: ""
title: Cloud Remote Access host-key approval is backward compatible with older cloud-remote-access microservice versions
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
ticket: DM-6421
version: 1024.6.0
---
When users establish remote connections via SSH, the system prompts them to approve the remote server's host key only if the cloud-remote-access microservice supports host-key probing on the SSH socket. With older microservice versions, SSH connections work as before.
