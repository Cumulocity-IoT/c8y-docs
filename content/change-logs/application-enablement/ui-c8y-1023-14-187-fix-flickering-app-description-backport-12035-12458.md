---
date: ""
title: fix flickering app description (backport #12035) (#12458)
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
ticket: MTM-66856
version: 1023.14.187
---
Backport of #12035 to **release/y2026** for
[MTM-66856](https://cumulocity.atlassian.net/browse/MTM-66856) —
flickering description field on hover for custom/cloned apps in
Administration.

## Scope — minimal (intentional)
The original PR reworks the description field to use
`c8y-input-group-editable`, but **that component does not exist on
release/y2026**, and its styles depend on the `$use-svg-icons` Sass
system which y2026 also lacks. So this ports **only the flicker fix**,
which applies directly to y2026's existing `<textarea
c8y-textarea-autoresize>`:
- `textarea-autoresize.directive.ts`: resize guard + timeout cleanup
(develop-identical; Angular-parity).
- `_forms.scss`: restructure `label.editable` so `.form-control` keeps a
stable `min-width: fit-content` instead of only widening on hover — the
hover-driven width change + autoresize was the flicker source.

(Full component port to y2026 was considered and declined — it would
require backporting a new public component + the entire `$use-svg-icons`
Sass system.)

## ⚠️ Verification
- Directive is develop-identical on matching Angular 20; SCSS
brace-balanced. Not visually QA'd — please confirm the flicker is gone.

[MTM-66856]:
https://cumulocity.atlassian.net/browse/MTM-66856?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

Co-authored-by: Claude Opus 4.8 <noreply@anthropic.com>