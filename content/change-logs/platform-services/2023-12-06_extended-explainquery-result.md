---
date: 2023-12-06T16:00:52.999Z
title: Extended ExplainQuery result
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: Rest API
technical_component:
  - value: tc-QHwMfWtBk7
    label: cumulocity
jira: MTM-52350
change_log: false
version: 10.18.48.0
---
The ExplainQuery result info has been extended by the algorithm used when performing queries for a user with inventory roles:

`GET {{url}}/inventory/hierarchy/info/management`

Example: `{“algorithm”: “Legacy” }`

Possible results: `Legacy, LimitedSourcesAcl, PostFilteringBySourceAcl, SingleSourceAcl, HierarchyAcl, SingleAgentAcl, SingleDeviceAcl, SingleAgentAndDeviceAcl`.
