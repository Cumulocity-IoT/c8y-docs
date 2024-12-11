---
date: ""
title: added operationsCreated and operationUpdated columns for usageStatistics (#7688) [GRAFT][release/cd] (#7716)
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-61355
version: 1021.16.0
---
To provide more detailed insights into platform usage, the Usage Statistics UI view for {{< enterprise-tenant >}}s has been extended with two new columns: `operationsCreated` and `operationsUpdated`. These columns present the number of operations that have been created and updated, respectively.

This change enhances the granularity of the usage statistics request counters, enabling better analysis and understanding of platform activity. Existing usage statistics data and functionality remain unaffected by this addition.