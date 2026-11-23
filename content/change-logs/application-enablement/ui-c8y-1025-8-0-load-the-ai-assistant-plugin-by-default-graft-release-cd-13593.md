---
date: '2026-11-16'
title: >-
  Assistant plugin provides chat-based AI assistant and is enabled by default in
  the Cockpit application
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-68510
version: 1025.8.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-16'
  - label: apj.cumulocity.com
    date: '2026-11-17'
  - label: jp.cumulocity.com
    date: '2026-11-17'
  - label: us.cumulocity.com
    date: '2026-11-18'
  - label: cumulocity.com
    date: '2026-11-18'
---
The Assistant plugin provides a chat-based AI assistant that helps you find information and work with your {{< product-c8y-iot >}} applications. The plugin loads in the Cockpit application by default so that the AI Assistant is available as soon as you open the application. Other applications can install the Assistant plugin via the [extensions](/standard-tenant/ecosystem/#extensions) capabilities. If you already loaded the plugin manually, you may need to remove it from the extensions, or it could load twice.
