---
date: ""
title: translate remaining data point units and examples (#13194) [GRAFT][release/cd] (#13247)
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
ticket: MTM-67109
version: 1024.20.0
---
# Backport

This will backport the following commits from `develop` to `release/cd`:

- [fix(Web SDK): [MTM-67109] translate remaining data point units and
examples
(#13194)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/13194)

Manual graft. The automatic backport failed with conflicts.

## Conflicts resolved

| File | Conflict | Resolution |
| --- | --- | --- |
|
`widgets/implementations/info-gauge/radial-gauge/radial-gauge.service.spec.ts`
| New file added under `radial-gauge/radial-gauge-widget-view/`, which
is still `info-gauge/radial-gauge/` on `release/cd` | Placed next to the
service at the `release/cd` path. Content unchanged |

## No-regression check

- Intended vs. actual diff: the same changed lines, 7 files, +122/-10.
The service hunks applied at the `info-gauge/radial-gauge/` path
- Release-only code preserved: none touched
- Deviations from the source commit: none
- Compiles: `ng1-modules` + `ngx-components` (ng-packagr) built. ESLint
on the touched folders: same result as `release/cd` before the graft (2
existing errors in `alarm-event-attributes-form.service.spec.ts`, which
the graft does not touch)
- Unit tests: jest on the 3 touched specs, 14/14 pass
- Cypress: not run, `no-qa` label added at the author's request

🤖 Generated with [Claude Code](https://claude.com/claude-code)


[MTM-67109]:
https://cumulocity.atlassian.net/browse/MTM-67109?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ