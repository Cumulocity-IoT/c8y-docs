---
date: '2026-08-05'
title: >-
  Cloud Remote Access host key approval is backward compatible with older
  cloud-remote-access microservice versions
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-05'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-06'
  - label: cumulocity.com
    date: '2026-08-06'
---
When users establish remote connections via SSH, the system now only prompts them to approve the remote server's host key if the cloud-remote-access microservice supports host key probing on the SSH socket. With older microservice versions, SSH connections work as before.
