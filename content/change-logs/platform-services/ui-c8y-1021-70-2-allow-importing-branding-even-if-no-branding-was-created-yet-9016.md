---
date: '2025-05-15'
title: Branding can now be imported for tenants without existing branding
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
ticket: MTM-63533
version: 1021.70.2
---
Due to an issue, it was previously not possible to import a branding for a tenant if no branding was configured for that tenant yet. This change now allows importing branding packages via the Administration application even if the tenant does not have any branding configured. This makes it easier for users to set up branding for new tenants by directly importing an existing branding package without the need to manually create a branding configuration first.
