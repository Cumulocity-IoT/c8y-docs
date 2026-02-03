---
date: 2023-12-06
title: Fixed issues with Messaging Service request time outs
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-3UwjneUTb
    label: Messaging Service
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53509
version: 10.18.185.0
---
Fixed an issue where requests from the core platform into the Messaging Service could take a long time to complete, slowing down the response to HTTP requests and potentially preventing the platform from handling new incoming requests. For example, a request from the core platform to publish a message using Notifications 2.0 could block if the tenant had reached its quota for unconsumed notifications, only timing out after a long delay. This issue has been resolved by ensuring that Messaging Service requests that would have blocked now time out quickly.
