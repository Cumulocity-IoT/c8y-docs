---
date: ''
title: SSO constant username validation enhancement
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66224
version: 2026.tbd.0
---
Validation has been added for the **User/App ID – Constant value** field used during SSO authentication when the **Use constant value** option is enabled.

When a constant username is configured for SSO users (optional setting), it now follows the same validation rules as a standard username:


- **String length:** 1–1000 characters
- **Must not contain:**
    - Whitespaces
    - Slashes
    - Any of the following characters: `+`, `$`, `:`

This change ensures consistency in username validation and prevents invalid values from being configured for shared SSO accounts.