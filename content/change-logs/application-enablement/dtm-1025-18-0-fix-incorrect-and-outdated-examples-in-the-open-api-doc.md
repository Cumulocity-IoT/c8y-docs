---
date: ""
title: "Fixed incorrect and outdated examples in the OpenAPI doc"
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
ticket: "CTM-3331"
version: "1025.18.0"
---
Previously, examples in the DTM OpenAPI documentation didn't match the Asset API's actual behavior. This had been fixed now and requests and responses copied from the docs match what the Asset API expects and returns.

- **Error responses:** the 403 "tenant not subscribed" and "no write access" messages, and the 409 "Definition conflict" message, now show the exact text the Asset API actually returns. Placeholder values are quoted the way the API quotes them, for example `'{identifier}'`.
- **New error example:** the 400 response now also documents the error for a Json Schema that exceeds the allowed hierarchy depth.
- **Typos in identifiers:** the Event Definition example now uses `c8y_LocationUpdate` and the Measurement Definition example uses `c8y_TemperatureMeasurement`.
- **Tags:** the `tags` example now shows an array of strings, `["Location"]`.
- **Property Definitions:** the `c8y_Position` example now includes its `contexts` and matches the default definition. The docs also say that `c8y_Position` is already part of the default library, so creating it again returns `409 Conflict`. Context values are shown in lowercase, the way the API returns them.
