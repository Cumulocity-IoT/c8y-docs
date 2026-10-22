---
date: '2026-10-22'
title: Codex pages now have a single main heading
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
ticket: MTM-68096
version: 1024.21.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-22'
---
Every {{< product-c8y-iot >}} Codex page now has exactly one H1 heading: the page title in the header. Other headings keep their look but no longer use H1. This gives each page a clearer structure for screen readers and search engines.

This change only affects the Codex documentation. Applications built with the Web SDK are not affected.
