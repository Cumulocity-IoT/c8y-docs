---
date: ""
title: Realtime Session Resubscription After Core Node Redirection
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4774
version: 1020.440.39
---
Previously, when a devices realtime subscription was marked as non-autoretriable and its session was redirected from one core node to another, the new core node did not inherit the existing subscription. As a result, the subscription was lost, and only a warning was logged without triggering a resubscription.  This issue has been resolved. Now, in such cases, the realtime session will be properly resubscribed on the new core node, ensuring continued data flow and improved reliability.      [DM-4007]: https://cumulocity.atlassian.net/browse/DM-4007?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ