---
date: '2026-11-09'
title: Fill in the static Codex shell for crawlers
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
version: 1024.23.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-09'
  - label: apj.cumulocity.com
    date: '2026-11-10'
  - label: jp.cumulocity.com
    date: '2026-11-10'
---
Crawlers that don't run JavaScript, such as search engine bots, now get a filled-in static Codex page instead of an empty shell, so they can index Codex content. This change only affects the {{< product-c8y-iot >}} Codex documentation. Applications built with the Web SDK are not affected.
