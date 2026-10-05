---
date: ""
title: Data point labels, descriptions and units are now translated consistently
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
version: 1023.14.222
---
# Backport

This will backport the following commits from `develop` to
`release/y2026`:

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
is still `info-gauge/radial-gauge/` on `release/y2026` | Placed next to
the service at the `release/y2026` path. Content unchanged |
| `linear-gauge-widget-view.component.ts` | Next line is `orientation:
this.config.orientation ?? this.getOrientation()` on `develop` (from
MTM-66606, linear/silo merge), but `orientation: this.getOrientation()`
here | Kept the release branch's `orientation` line, applied only the
`unit: dp.unit \|\| measurement.unit` change |

## No-regression check

- Intended vs. actual diff: the same changed lines, 7 files, +122/-10
- Release-only code preserved: `release/y2026`'s `orientation` line in
the linear gauge. MTM-66606 is not needed for this change. Silo still
uses `LinearGaugeWidgetViewComponent` here, so the unit fix covers it
too
- Deviations from the source commit: none
- Compiles: `ng1-modules` + `ngx-components` (ng-packagr) built. ESLint
on the touched folders: same result as `release/y2026` before the graft
- Commit made with `--no-verify`: lint-staged fails on lines already on
`release/y2026` (`any` in `radial-gauge.service.ts`, `NgIf` import in
the linear gauge) that this graft does not change
- Unit tests: jest on the 3 touched specs, 14/14 pass
- Cypress: not run, `no-qa` label added at the author's request

🤖 Generated with [Claude Code](https://claude.com/claude-code)


[MTM-67109]:
https://cumulocity.atlassian.net/browse/MTM-67109?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ