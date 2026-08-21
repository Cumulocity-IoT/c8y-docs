---
date: '2026-08-21'
title: New option to hide custom icons in the icon selector
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67558
version: 1024.15.12
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-21'
---
The `c8y-icon-selector` component now accepts a `disableCustomIcons` input. When set, the component skips the request for the tenant's custom icon options (`/apps/public/public-icon-options/icons.json`) and hides the custom icon management UI, so only the built-in icon set is offered.

This is useful wherever the icon selector runs outside a {{< product-c8y-iot >}} tenant, where that request cannot succeed and previously surfaced a "Failed to fetch" alert - for example the icons page of the static Codex documentation, which now sets the new input. Existing usages are unaffected: without `disableCustomIcons`, custom icons are still loaded and a genuine loading failure is still reported.
