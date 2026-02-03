---
date: 2023-12-06T13:42:31.975Z
title: Support of versioned documentation links
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Application enablement & solutions
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-41135
version: 10.18.134.0
---
The context help and other help links point to a documentation website defined by the application option <code>docsBaseUrl</code>. This option now supports the <code>{{ version }}</code> placeholder, which allows the administrator to choose whether to use versioned or unversioned documentation links. By default, versioned links will be used.
