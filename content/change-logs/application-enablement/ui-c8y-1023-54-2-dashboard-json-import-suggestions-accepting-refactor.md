---
date: '2026-03-06'
title: Improved dashboard JSON import suggestions handling
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65792
version: 1023.54.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-06'
  - label: apj.cumulocity.com
    date: '2026-03-09'
  - label: jp.cumulocity.com
    date: '2026-03-09'
---
When importing dashboards from JSON files, the bulk accept functionality has been improved to provide clearer feedback and prevent unintended actions. Previously, the bulk accept buttons were always enabled, regardless of whether any suggestions were available, which could lead to confusion about what would actually be imported. Now, the bulk accept button in the modal footer is removed and the bulk accept button on the table header is disabled when no suggestions are available, making it immediately clear when bulk actions cannot be performed. Additionally, when you click the bulk accept button, any widgets that lack suggestions are automatically marked as unselected and flagged with a warning, ensuring you have full visibility into which widgets will be imported and which require manual attention. This makes the import process more intuitive and helps prevent accidentally importing incomplete or problematic widget configurations.
