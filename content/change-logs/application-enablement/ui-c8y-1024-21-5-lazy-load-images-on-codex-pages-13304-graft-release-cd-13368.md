---
date: ""
title: Faster page loads in the Codex documentation through lazy-loaded images
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
version: 1024.21.5
---
Images on Codex documentation pages are now lazy-loaded. The first image on each page still loads immediately. It is often the page's largest visible element, and lazy-loading it would slow down how quickly the page appears. Images that already set their own `loading` or `decoding` attribute keep their values.

This change only affects the Codex documentation. Applications built with the Web SDK are not affected.
