---
date: ""
title: Incorrect Alarm Triggering for Existing LwM2M Objects
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4752
version: 1021.10.18
---
[Fix] Resolved an issue where the LwM2M agent incorrectly triggered alarms when devices reported data for LwM2M objects that already had a DDF representation on the platform. Alarms are now only triggered when the reported objects are not present on the platform.    [Improvement] Improved event logging behavior for cases where a resource DDF is missing. Previously, a redundant "Device Sent" event was logged alongside the "Received Message" event, both containing identical information. This update removes the duplicate "Device Sent" event only the "Received Message" event will now log the resource data received from the agent.        [DM-4007]: https://cumulocity.atlassian.net/browse/DM-4007?atlOrigin=eyJpIjoiNWRkNTljNzYxNjVmNDY3MDlhMDU5Y2ZhYzA5YTRkZjUiLCJwIjoiZ2l0aHViLWNvbS1KU1cifQ