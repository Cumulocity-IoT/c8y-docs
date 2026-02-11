---
date: '2026-02-05'
title: Add Logger block in Public Preview
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5072
version: 27.25.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
---

A new Logger block has been added to Analytics Builder in Public Preview. This block enables writing a message to the microservice log file for each input, with the following parameters:
 - `loggerTag`:
Used to identify log messages from this block. If not specified, defaults to "logger".

- `logLevel`:
The log level to use when writing messages to the log file. Available options:

  - `INFO`  (Default)
  - `DEBUG` (Will not appear in the log by default)
  - `WARN`
  - `ERROR`

- `disableOutput`:
Whether to disable logging from this block. This can be templated using model parameters to disable logging at runtime. Defaults to `false`.
