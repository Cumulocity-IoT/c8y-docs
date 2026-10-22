---
date: '2026-10-16'
title: New DataHub settings page for Streaming Lake Ingestion
product_area: Analytics
change_type:
  - value: change-pXAlHAWka
    label: Preview
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: CDH-6696
version: 1024.19.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-16'
  - label: apj.cumulocity.com
    date: '2026-10-19'
  - label: jp.cumulocity.com
    date: '2026-10-19'
  - label: us.cumulocity.com
    date: '2026-10-20'
  - label: cumulocity.com
    date: '2026-10-20'
---
{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.
{{< /c8y-admon-preview >}}

The Administration application now provides a **DataHub** page under **Settings**. There you connect [Streaming Lake Ingestion](/datahub/streaming-lake-ingestion/), the first capability of DataHub 2.0, to your own data lake on AWS or Azure. The page guides you through the setup and checks the access before it saves the configuration. It is only shown on tenants on which Streaming Lake Ingestion is activated.
