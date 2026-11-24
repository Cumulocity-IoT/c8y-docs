---
date: ""
title: make the measurements tab and data explorer usable on phones (#13112) [GRAFT][release/cd] (#13683)
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
ticket: MTM-67798
version: 1025.15.1
---
# Backport

This will backport the following commits from `develop` to `release/cd`:

- [fix(Web SDK): [MTM-67798] make the measurements tab and data explorer
usable on phones
(#13112)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/13112)

Manual graft. The automatic backport failed with conflicts.

## Conflicts resolved

| File | Conflict | Resolution |
| --- | --- | --- |
| `packages/ngx-components/events/events-date-filter.component.html` |
On `develop`, #13307 (DM-7583) had added `container="body"` and
`[placement]` next to the line this PR adds. Neither is on `release/cd`.
| Added only `c8yDropdownFitViewport`, after `dropdown`. The menu stays
inline, as on `release/cd`; the directive supports menus with and
without `container="body"`. |

## No-regression check

- Intended vs. actual diff: the same 33 files, +1041 −41 on both sides,
and every added and removed line is identical to the source commit. Only
the context of the one resolved line differs.
- Release-only code preserved: nothing on `release/cd` is removed.
- Deviations from the source commit: none.
- Compiles: `@c8y/client`, `toolkit`, `options`, `html-repo`, `devkit`,
`websdk`, `bootstrap`, `ng1-modules` and `ngx-components` (ng-packagr)
build, in CI order, with no errors. ESLint on the 25 changed `.ts` and
`.html` files: 0 errors (8 existing `no-explicit-any` warnings).
- Unit tests: 10 related suites (dropdown fit viewport and focus trap,
action bar, resizable grid, aggregation picker, data explorer, events
date filter): 75/75 pass.
- Cypress: not run locally. Labelled `no-qa`: #13112 passed QA on
`develop`, and this graft matches it line for line apart from the one
resolved line above.

## Needs the author's eyes

- The Events date filter menu on `release/cd` is inline, not appended to
the body as on `develop`. The fit directive caps it to the space below
the toggle, or opens it upward, in both cases; worth a look on a
phone-sized screen.