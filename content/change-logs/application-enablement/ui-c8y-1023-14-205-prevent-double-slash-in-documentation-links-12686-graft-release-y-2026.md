---
date: 2026-09-01
title: Web SDK removes double slashes from documentation links
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
ticket: MTM-67424
version: 1023.14.205
---
In certain situations, documentation links rendered by the Web SDK contained double slashes, which resulted in broken or malformed URLs (for example, documentation links shown in empty states were affected). The Web SDK now correctly formats documentation links by removing any double slashes that might occur during link construction. This ensures that all documentation links work as expected and users can access the referenced documentation without encountering broken links.