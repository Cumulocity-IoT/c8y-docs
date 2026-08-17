---
date: ""
title: Fix double slashes in documentation links
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
version: 1024.14.2
---
Documentation links in the Web SDK could contain double slashes in certain situations, which resulted in broken or malformed URLs. The Web SDK now correctly formats documentation links by removing any double slashes that might occur during link construction. This ensures that all documentation links work as expected and users can access the referenced documentation without encountering broken links.