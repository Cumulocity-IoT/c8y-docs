---
date: ""
title: Output JSON schemas of Web SDK based applications as separate JSON artifacts
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
---
The Web SDK previously already contained functionality to generate a JSON schema based on a TypeScript type. This functionality has been enhanced to store all generated schemas in a single `c8y-schemas.json` per application. The file can for example be retrieved from `/apps/cockpit/c8y-schemas.json` for the cockpit application. The different schemas are grouped by type if a type has been provided.

This should allow for example an AI to utilize these schemas and make configuration changes of the objects that use these schemas.