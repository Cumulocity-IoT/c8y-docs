---
date: '2026-03-31'
title: Proof of possession section for tenant CA certificates now hidden
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62862
version: 1021.59.1
---
In the trusted certificate details, the **Proof of possession** section was previously also displayed for tenant CA certificates even though it is not relevant for this type of certificate. With this change, the **Proof of possession** section is now hidden for tenant CA certificates. This improves the user experience by removing irrelevant information from the view.
