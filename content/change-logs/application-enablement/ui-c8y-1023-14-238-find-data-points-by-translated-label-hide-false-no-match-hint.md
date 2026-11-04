---
date: ""
title: find data points by translated label, hide false no-match hint (#13266) [GRAFT][release/y2026] (#13400)
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
ticket: MTM-68095
version: 1023.14.238
---
# Backport

This will backport the following commits from `develop` to
`release/y2026`:

- [fix(Web SDK): [MTM-68095] find data points by translated label, hide
false no-match hint
(#13266)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/13266)

Manual graft. `yarn backport` stopped on conflicts.

## Conflicts resolved

| File | Conflict | Resolution |
| --- | --- | --- |
| `datapoint-selector.component.ts` | Import list: y2026 lacks
`SkipLinkDirective` (#12825) and imports `DatapointLabelPipe` locally |
Kept the y2026 imports, added only `translateDatapointLabel` |
| `datapoint-selector.module.ts` | Neighbouring `DatapointLabelPipe`
import only exists on y2026 | Kept it, removed only the
`FilterDatapointsPipe` import |
| `datapoint-selector-list-item.component.ts` | Import list: y2026 has
no `ChangeDetectionStrategy` (#13021) | Kept the y2026 imports, added
only `signal` |
| `datapoint-selector-list-item.component.spec.ts` | Import list differs
| Added only `DATAPOINT_LIBRARY_FRAGMENT` and `ManagedObjectKPI`, which
the new tests need |
| `datapoint-selector.component.spec.ts` | File created on develop by
#12825, absent on y2026 | Created with the TestBed setup and this PR's
`search` tests only; the #12825 skip link tests are not grafted |

## No-regression check

- Every added and removed line of the source commit is in the graft; the
only differences are the import adaptations and spec setup above.
- No y2026-only code removed. `FilterDatapointsPipe` has no other users
on y2026.
- `ng1-modules` and `ngx-components` (ng-packagr) build; ESLint on the
touched files reports no new findings.
- `yarn jest --testPathPatterns=datapoint-selector`: 7 suites, 63 tests
passed.


[MTM-68095]:
https://cumulocity.atlassian.net/browse/MTM-68095?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

---------

Co-authored-by: Paweł Rynarzewski <pawel.rynarzewski@inetum.com>