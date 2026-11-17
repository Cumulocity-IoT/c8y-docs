---
date: ""
title: "Corrected the API documentation for creating and updating Asset Definitions"
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
ticket: "CTM-3347"
version: "1025.17.0"
---
The API documentation for creating an Asset Definition stated that you
can't change its schema after creation and that a change creates a new
version. The service doesn't version Asset Definitions, and you can
change them with the update operation. The documentation no longer
contains this statement.

The documentation for creating and updating Asset Definitions now
describes how the service builds the JSON schema from the composition,
and which requests cause HTTP 400, 403, 404, and 409 responses. The
update operation now also declares the HTTP 400 response code.