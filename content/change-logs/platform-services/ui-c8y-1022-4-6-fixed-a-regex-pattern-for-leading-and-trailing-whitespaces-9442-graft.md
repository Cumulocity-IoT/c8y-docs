---
date: ""
title: Fixed company name validation on tenant creation form to allow 2-letter names
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
Previously, the tenant creation form had an issue with the company name validation: it was not possible to create a tenant with 2-letter company name and the validation error was confusing as it mentioned invalid leading and trailing whitespaces which were not there anyway. The validation has been fixed to allow 2-letter company names and users can now successfully create tenants with 2-letter company names without encountering a confusing error messages.