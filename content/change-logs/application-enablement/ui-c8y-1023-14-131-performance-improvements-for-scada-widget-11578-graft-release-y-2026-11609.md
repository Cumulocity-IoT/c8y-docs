---
date: ""
title: Performance improvements for SCADA widget (#11578) [GRAFT][release/y2026] (#11609)
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66383
version: 1023.14.131
---
# Backport

This will backport the following commits from `develop` to
`release/y2026`:
- [fix(Cockpit): [MTM-66383] Performance improvements for SCADA widget
(#11578)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/11578)

<!--- Backport version: 9.5.1 -->

### Questions ?
Please refer to the [Backport tool
documentation](https://github.com/sorenlouv/backport)

[MTM-66383]:
https://cumulocity.atlassian.net/browse/MTM-66383?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ

Co-authored-by: Paweł Rynarzewski <92171763+pawel-rynarzewski-c8y@users.noreply.github.com>

- optimized widget's config watch to only monitor several key properties
whose change actually requires widget reinitialization
- reduce `__target` objects to minimum set of needed properties

Context:
customer complained that after switching a dashboard to dashboard
template (device type dashboard), the performance and responsiveness
dropped. The dashboard in question had 4 widgets with quite a lot last
measurement mappings, each with data point configuration and __target
(only id, name, c8y_IsDevice), but on device type dashboard each
__target is replaced with full managed object of the context. And SCADA
widget watched changes in the config object with deep comparison mode on
each digest cycle leading to responsiveness degradation.