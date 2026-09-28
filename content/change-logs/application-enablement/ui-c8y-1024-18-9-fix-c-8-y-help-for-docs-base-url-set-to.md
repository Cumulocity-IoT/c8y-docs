---
date: '2026-09-23'
title: Context help now loads when docsBaseUrl is set to a single slash
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67541
version: 1024.18.9
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-23'
  - label: apj.cumulocity.com
    date: '2026-09-25'
  - label: jp.cumulocity.com
    date: '2026-09-25'
---
The "About this page" help drawer did not load its content when the `docsBaseUrl` application option was set to `/`. Instead, it showed a loading indicator indefinitely and logged an "Invalid URL" error in the browser console. A `docsBaseUrl` that is relative to the application host is now resolved against that host, so the help content is loaded from the root of the host the application is served from.

In addition, the help button is no longer displayed when documentation links are switched off (`docsBaseUrl` set to `null` or an empty string), as no help content can be loaded in that case.
