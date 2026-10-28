---
date: '2026-10-22'
title: LWM2M agent REST API returns specific error codes for invalid requests
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
ticket: DM-6305
version: 1022.8.3
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-22'
  - label: apj.cumulocity.com
    date: '2026-10-28'
  - label: jp.cumulocity.com
    date: '2026-10-28'
---
Previously, many invalid requests to the LWM2M agent REST API failed with a generic server error (HTTP 500), and the OpenAPI description of the agent listed only successful responses.

Now, the LWM2M agent returns specific error codes, and its OpenAPI description (`/service/lwm2m-agent/v3/api-docs`) documents the possible error responses of each endpoint:

- Deleting a device with inconsistent registration data returns 400, and deleting a device that belongs to another tenant returns 401.
- Invalid bulk registration files are rejected with 400, for example files that are not CSV files, are larger than 10 MB, use no supported column separator (tab, semicolon or comma) or lack required columns.
- Invalid object mappings, resource mappings and object instance actions are rejected with 422 and are no longer stored. Previously, such mappings could cause errors when the LWM2M agent loaded the object models of the tenant.
- Requests without the expected file, with an unsupported content type or to an unknown path return 400, 415 or 404.
- Error responses always contain only the fields `error` and `message`.

The device registration endpoints are described in [Registering LWM2M devices using the REST API](/device-integration/lwm2m/#registering-lwm2m-devices-using-restapi). All other endpoints of the LWM2M agent REST API are internal and can change without notice.
