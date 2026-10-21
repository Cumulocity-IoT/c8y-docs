---
date: ""
title: Slider data now accurately represents missing data
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
ticket: MTM-67234
version: 1023.14.224
---
…ng data.

Example scenarios to test this:

1. Timeframe in which the data has partial data (e.g. half empty hafl
with datapoints). Slider should reflect this accurately.
2. Timeframe in which you have data "outage" e.g. there is data, then no
data, then data again. Slider should reflect this accurately as well
(but the data being aggregated ofcourse)

---------


(cherry picked from commit 8b6645fc9089cefb9cc8d38ef8fd94a2fc0db5fc)

Co-authored-by: Paweł Rynarzewski <92171763+pawel-rynarzewski-c8y@users.noreply.github.com>