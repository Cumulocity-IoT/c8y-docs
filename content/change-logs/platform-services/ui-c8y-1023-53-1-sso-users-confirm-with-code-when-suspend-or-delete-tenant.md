---
date: '2026-03-06'
title: SSO tenant management improved when suspending or deleting a tenant
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66119
version: 1023.53.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-06'
  - label: apj.cumulocity.com
    date: '2026-03-09'
  - label: jp.cumulocity.com
    date: '2026-03-09'
---
When suspending or deleting a tenant in an SSO-enabled environment, the behavior has been changed from requiring a password to providing a randomly generated code that is entered in order to complete the confirmation step. This change ensures that SSO users can perform these critical tenant management operations without friction, while maintaining the same level of security through code-based confirmation as password-based confirmation provides for non-SSO users.
