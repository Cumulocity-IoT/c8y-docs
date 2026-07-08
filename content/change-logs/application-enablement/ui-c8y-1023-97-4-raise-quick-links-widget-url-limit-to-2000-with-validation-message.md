---
date: ""
title: Quick Links widget now supports URLs up to 2000 characters
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66427
version: 1023.97.4
---
The Quick Links widget previously limited URLs to 150 characters, which was insufficient for many real-world use cases where URLs can be significantly longer. The URL input field now accepts URLs up to 2000 characters, giving you much more flexibility when adding or editing links in both the add-link and list/edit forms. If you enter a URL that exceeds the 2000-character limit, the form displays a validation message and prevents you from saving the link, ensuring data integrity while accommodating longer URLs.