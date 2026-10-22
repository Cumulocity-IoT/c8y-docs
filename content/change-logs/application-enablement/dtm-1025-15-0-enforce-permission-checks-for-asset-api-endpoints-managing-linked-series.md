---
date: ""
title: "enforce permission checks for Asset API endpoints managing linked series"
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
ticket: "CTM-3294"
version: "1025.15.0"
---
The Asset API endpoints for managing linked series relationships were missing proper permission validation, which could allow unauthorized users to perform sensitive operations. The following endpoints now enforce the required permission checks:
- PUT `/service/dtm/assets/{assetId}/linkedSeries/reconcileOpposite`
- PUT `/service/dtm/assets/{assetId}/linkedSeries/{fragment}/{series}/reconcileOpposite`
- DELETE `/service/dtm/assets/{assetId}/linkedSeries`

With this fix, the Asset API now validates user permissions before allowing reconciliation of opposite links or deletion of linked series data. The Asset API documentation has been updated to reflect these permission requirements. Existing applications using these endpoints must ensure they have the appropriate permissions configured, or requests will be rejected with a permission error.
