---
date: ""
title: clear stale date range validation error (#13072) [GRAFT][release/y2026] (#13440)
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
ticket: MTM-67772
version: 1023.14.236
---
# Backport

This will backport the following commits from `develop` to
`release/y2026`:

- [fix(Web SDK): [MTM-67772] clear stale date range validation error
(#13072)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/13072)

Manual graft. The automatic backport failed with conflicts.

## Conflicts resolved

| File | Conflict | Resolution |
| ---- | -------- | ---------- |
| `time-context/time-context.component.ts` | The moved block carries the
auto-aggregation fields (`autoAggregationDatapoints`,
`autoAggregationEnabled`, `autoAggregationKeepDataOnZoomIn`), which do
not exist on `release/y2026`. | Moved the block as in the source commit,
without those fields. |
| `time-context/time-context.component.spec.ts` | The source spec
provides `TimeSeriesMigrationService`, which does not exist on
`release/y2026`. | Kept `WidgetTimeContextDateRangeService` as the only
provider. |
| `core/date-time-picker/date-time-picker.component.spec.ts` | The test
host declares `ChangeDetectionStrategy.Eager`, which `release/y2026`
(Angular 20) does not have. | Dropped that line; the host uses the
default strategy. |

The other five files applied unchanged.

## No-regression check

- Intended vs. actual diff compared per file: 5 of 8 files identical to
the source commit; the 3 adaptations above are the only differences.
Besides those, the specs use `Array.from(groups)` instead of
`[...groups]`.
- Release-only code preserved: nothing on `release/y2026` is removed
beyond the lines the source commit removes.
- Compiles: `ngx-components` (ng-packagr) build passed on the graft
branch.
- Unit tests: `date-time-picker.component.spec.ts` and
`time-context.component.spec.ts`, 28/28 passed. Specs of every consumer
of the picker and the time context on `release/y2026` (alarms, dashboard
widget time context, dynamic forms, data point explorer, export
selector, global context, tenant custom properties, data point table):
61 suites, 915 tests passed. ESLint: 0 errors; 3 `no-explicit-any`
warnings on lines older than this change.
- UI, cockpit served from `release/y2026` before (`52f02de`) and after
(`9339472`) the graft:
- Data explorer custom range: the stale error after correcting the other
end, the range under one minute and the editable time fields in real
time are fixed; a valid range still applies.
- Alarms date filter: a typed date is no longer replaced, the error
clears, and the alarm request after Apply is identical before and after
for a valid range.
- Cypress: `deviceListFilter.cy.ts` against the grafted cockpit, 17/17
passed.

## Needs the author's eyes

- The adaptations above only remove what does not exist on
`release/y2026`; please confirm none of them changes the fix itself.


[MTM-67772]:
https://cumulocity.atlassian.net/browse/MTM-67772?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

Co-authored-by: Paweł Rynarzewski <92171763+pawel-rynarzewski-c8y@users.noreply.github.com>