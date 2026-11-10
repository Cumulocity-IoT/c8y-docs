---
date: ""
title: "Apply a measurement processing change on every pod within 30 seconds"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3330"
version: "2.1.2"
---
[CTM-3330](https://cumulocity.atlassian.net/browse/CTM-3330).

A change of a tenant's measurement processing (`PUT
/enabled/measurements`) applied at once only on the pod that served the
request. The other pods read the stored setting within 30 seconds, but
applied it only at their next presence check, up to 5 minutes later.

**Change**
- Each tenant's switch listens for settings changes. When a read shows
that tenant's own mode changed, it checks the tenant at once, so every
pod applies the change within one tenant options poll (30 s).
- Changes of other tenants' settings start no check, so one tenant's
change does not make every tenant query the inventory.
- The settings are watched only while the tenant's checks run, so a
processor that failed to set up is not kept by the store.
- The check runs in the tenant's logger context, whichever context read
the settings.
- The pod that stores the change awaits the check the change started,
instead of running a second one before it answers.
- `docs/N2_SUBSCRIPTION_SWITCH.md` states the new timing.

**Not covered:** the all-tenants option
(`n2Subscription.measurements.allTenants`) comes from tenant options,
not the settings store, and still applies at the next presence check.

**Tests:** unit tests that a mode change requests one check, even when
reported twice, and applies it before the next presence check; that
another tenant's change requests none; that the settings are watched
only while checking; that the check runs in the tenant's context; and
that the API awaits the check the change started.


[CTM-3330]:
https://cumulocity.atlassian.net/browse/CTM-3330?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ