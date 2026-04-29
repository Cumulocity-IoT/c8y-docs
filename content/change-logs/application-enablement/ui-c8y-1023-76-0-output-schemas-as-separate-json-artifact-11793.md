---
date: '2026-04-27'
title: Output JSON schemas of Web SDK-based applications as separate JSON artifacts
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
ticket: MTM-66036
version: 1023.76.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-27'
  - label: apj.cumulocity.com
    date: '2026-04-28'
  - label: jp.cumulocity.com
    date: '2026-04-28'
---
The functionality in the Web SDK to generate a JSON schema based on a `TypeScript` type has been enhanced to store all generated schemas in a single *c8y-schemas.json* per application. The file can, for example, be retrieved from */apps/cockpit/c8y-schemas.json* for the Cockpit application. The different schemas are grouped by type if a type has been provided.

This allows, for example, an AI to utilize these schemas and make configuration changes to the objects that use these schemas.
