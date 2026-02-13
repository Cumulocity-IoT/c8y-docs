---
date: '2026-02-13'
title: >-
  Application filter in tenant details now works with translated application
  names
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
ticket: MTM-62149
version: 1023.42.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-13'
---
The application filter on the **Applications** tab in the tenant details previously matched against non-translated application names in the background, which meant that filtering by an application name in your currently selected language would not return any results. This issue has been fixed, and the filter now correctly matches against the translated application names, allowing you to search for and find applications by their names as they appear in your selected language. This ensures a more intuitive filtering experience when managing applications for your tenants, as you can now reliably search using the application names visible in your user interface.
