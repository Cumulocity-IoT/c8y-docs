---
date: ""
title: "support "text/plain" content type and deprecate "application/json" for updating LinkedSeries label and measurement type"
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
ticket: "CTM-3007"
version: "1025.8.3"
---
The Asset API now accepts `text/plain` as the correct content type when
updating the label or measurement type of a LinkedSeries. Previously,
only `application/json` was supported for these endpoints, which was
technically incorrect. The API continues to accept `application/json` to
maintain backward compatibility with existing integrations, but this
format is now deprecated.

Existing applications using `application/json` continue to work without
any changes required. However, you should migrate to use `text/plain`
because support for `application/json` will be removed in a future
release.