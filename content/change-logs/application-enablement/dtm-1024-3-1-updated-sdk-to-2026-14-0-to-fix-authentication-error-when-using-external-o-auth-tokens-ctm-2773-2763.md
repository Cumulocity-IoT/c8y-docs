---
date: '2026-03-19'
title: >-
  Updated SDK to 2026.14.0 to fix authentication error when using external OAuth
  tokens
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2773
version: 1024.3.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-19'
  - label: apj.cumulocity.com
    date: '2026-03-25'
  - label: jp.cumulocity.com
    date: '2026-03-25'
---
When using external OAuth tokens for authentication, the Digital Twin Manager REST API incorrectly rejected valid credentials and returned an "Invalid Credentials!" error. This prevented users from accessing the API when authenticating through external OAuth providers, disrupting integrations and automated workflows that rely on external authentication mechanisms.

The SDK has been updated to version 2026.14.0, which correctly validates external OAuth tokens. The REST API now properly authenticates requests using external OAuth tokens and grants access as expected. Users can seamlessly integrate Digital Twin Manager with external authentication providers without encountering false credential validation errors.
