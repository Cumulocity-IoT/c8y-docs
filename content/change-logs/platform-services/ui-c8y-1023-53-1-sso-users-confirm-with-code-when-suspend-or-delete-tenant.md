---
date: ""
title: SSO users can now confirm tenant suspension or deletion with a code instead of a password
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
---
When suspending or deleting a tenant in an SSO-enabled environment, users were previously prompted to enter their Cumulocity account password to confirm the action. However, SSO users authenticate through an external identity provider and do not have a Cumulocity password, making it impossible for them to complete this confirmation step. Now, instead of requiring a password, SSO users receive a randomly generated code that they can enter to confirm the suspension or deletion of a tenant. This change ensures that SSO users can perform these critical tenant management operations without friction, while maintaining the same level of security through code-based confirmation as password-based confirmation provides for non-SSO users.