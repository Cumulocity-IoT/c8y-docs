---
date: 
title: New REST endpoints for inventory bulk create and update operations
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62754
version: 2026.131.0
---
{{< product-c8y-iot >}} now provides new REST API endpoints for creating and updating inventory managed objects in bulk.
These endpoints allow you to perform batch operations on multiple managed objects in a single request, improving efficiency and reducing the number of API calls needed for large-scale inventory management.

For details, refer to the [bulk create](https://{{< domain-c8y >}}/api/core/#operation/postManagedObjectCollectionResource) and [bulk update](https://{{< domain-c8y >}}/api/core/#operation/putManagedObjectCollectionResource) operations in the [{{< openapi >}}](https://{{< domain-c8y >}}/api/core/#tag/Managed-objects).

