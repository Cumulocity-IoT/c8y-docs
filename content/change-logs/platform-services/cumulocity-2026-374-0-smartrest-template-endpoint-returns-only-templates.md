---
date: '2026-10-13'
title: SmartREST template endpoint now returns only SmartREST templates
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68002
version: 2026.374.0
---
SmartREST 1.0 templates are stored as managed objects, and the endpoint that resolves a template addresses it either by its global ID or by its `c8y_SmartRestDeviceIdentifier` external ID.

The endpoint now confirms that the resolved managed object is a SmartREST template. An identifier that resolves to a managed object of any other kind returns HTTP 404. For details, see [SmartREST 1.0](/smartrest/smartrest-one/).
