---
date: 2024-03-28T15:49:00.513Z
title: HTTP client in Apama 10.15.4 supports truncating responses
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34520
version: 24.18.0
---
The HTTP client comes with two new configurable options, `maxResponseKB` and `maxResponsePolicy`, that enable the user to restrict the size of the server response. These options can be set for the entire transport, or on individual requests. Support has also been added to the predefined event definitions (see [Using predefined generic event definitions to invoke HTTP services with JSON and string payloads](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/pam-webhelp/index.html#page/pam-webhelp/co-ConApaAppToExtCom_httpclient_using_predefined_generic_event_definitions.html) in the Apama documentation). This enables you to prevent large server responses from causing out-of-memory issues.
