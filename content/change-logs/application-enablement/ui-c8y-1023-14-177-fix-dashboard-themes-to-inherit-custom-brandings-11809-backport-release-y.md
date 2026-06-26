---
date: ""
title: fix dashboard themes to inherit custom brandings (#11809) [backport release/y2026] (#12335)
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
ticket: MTM-66536
version: 1023.14.177
---
Backport of #11809 to `release/y2026`.

Cherry-picked `5b194660c15`. Conflicts resolved:
- `widget-preview.component.html` → took PR version (the fix)
- `.husky/pre-commit`, `convert-scss-to-less.sh` → kept release-branch
tooling (diverged independently, not part of theme fix)

---------

Co-authored-by: Paweł Rynarzewski <pawel.rynarzewski@cumulocity.com>