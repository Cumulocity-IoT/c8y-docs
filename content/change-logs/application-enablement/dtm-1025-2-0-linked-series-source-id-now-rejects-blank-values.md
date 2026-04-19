---
date: ""
title: "LinkedSeries source.id now rejects blank values"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: ""
version: "1025.2.0"
---
The `LinkedSeries` `source.id` field is optional, but previously
accepted blank values such as empty strings (`""`) or whitespace-only
strings (`" "`). This could lead to inconsistent data and unexpected
behavior when processing linked series data.

The Asset API now validates the `source.id` field and rejects blank
values while still allowing the field to be omitted entirely. If you
send a `LinkedSeries` request with a blank `source.id` value, the
request returns a validation error instead of accepting the invalid
data.

Existing `LinkedSeries` with a blank `source.id` are not updated
automatically.