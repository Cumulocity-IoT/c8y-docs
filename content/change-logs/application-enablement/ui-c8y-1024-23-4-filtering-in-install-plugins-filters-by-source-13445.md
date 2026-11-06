---
date: ""
title: Filtering in install plugins filters by source (#13445)
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
ticket: MTM-67933
version: 1024.23.4
---
# Backport

This will backport the following commits from `develop` to `release/cd`:

- [fix(Web SDK): \[MTM-67933\] Filtering in install plugins now filters
by source
(#13308)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/13308)

Manual graft. The automatic backport failed with conflicts.

## Conflicts resolved

| File | Conflict | Resolution |
| ---- | -------- | ---------- |
| `ecosystem/shared/list-filters/list-filters.component.html` |
`develop` closes the dropdown with `filtersDropdown.hide()`, added by
#12992 (ngx-bootstrap 21.2.2), which is not on `release/cd`
(ngx-bootstrap 21.0.1). | Kept `filtersDropdown.isOpen = false` from
`release/cd`. Everything else matches #13308. |

The other four files apply cleanly and are identical to `develop`.

The first commit lost the `*dropdownMenu` block (Type, Availability and
Content checkboxes and the `<ng-content>` slot) while resolving the
conflict. The second commit restores it with `@if`/`@for`.

## What to check

`c8y-list-filters` is shared by the Install plugin, Applications,
Microservices, Features and Packages lists. Besides searching by source
in Install plugin, open the Filters dropdown on one other list and check
the checkboxes, the custom filters (Archived, Only latest), Reset and
Apply.