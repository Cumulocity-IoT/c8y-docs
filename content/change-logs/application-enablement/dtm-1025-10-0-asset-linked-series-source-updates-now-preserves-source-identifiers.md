---
date: ""
title: "Asset linked series source updates now preserve source identifiers"
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
ticket: "CTM-3106"
version: "1025.10.0"
---
The REST API endpoint
`/assets/{assetId}/linkedSeries/{fragment}/{series}/source` for updating
asset linked series source data was not properly preserving the
`source.id` field during PUT requests, which caused source identifiers
to be removed and broke the link to devices. The endpoint now correctly
validates and preserves source identifiers during updates, allowing you
to reliably update linked series source data without losing source
reference information.

The endpoint now correctly handles the `source.id` field, ensuring that
source identifiers are properly validated and preserved during updates.
Users can now reliably update linked series source data without losing
or corrupting source reference information. If you need to deliberately
remove the link from a LinkedSeries to a device, use the DELETE
`/assets/{assetId}/linkedSeries/{fragment}/{series}/source` endpoint.
Existing installations with linked series data continue to work as
expected with improved reliability for future updates.