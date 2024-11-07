---
date:
title: Fixed a potential deadlock when a large number of requests are waiting to be flushed
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35075
version: 25.298.0
---
When using a large number of client connections with the `client.numClients` tenant option, there was a potential deadlock when a large number of requests were waiting to be flushed. This has been fixed.
