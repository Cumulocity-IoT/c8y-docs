---
date: '2025-07-10'
title: Fixed company name validation on tenant creation
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63970
version: 1022.4.6
---
Previously, there was an issue with the company name validation during tenant creation. It was not possible to create a tenant with a 2-letter company name, and the validation error was confusing. The validation has been fixed and users can now successfully create tenants with 2-letter company names without encountering any issues.
