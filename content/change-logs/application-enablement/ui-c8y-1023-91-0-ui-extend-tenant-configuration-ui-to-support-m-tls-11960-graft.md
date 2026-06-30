---
date: '2026-06-25'
title: Single sign-on configuration now supports mutual TLS (mTLS)
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65498
version: 1023.91.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-06-25'
  - label: apj.cumulocity.com
    date: '2026-06-26'
  - label: jp.cumulocity.com
    date: '2026-06-26'
  - label: us.cumulocity.com
    date: '2026-06-29'
  - label: cumulocity.com
    date: '2026-06-29'
---
Previously, single sign-on (SSO) configurations could authenticate to the external authorization server only with a client secret. You can now enable mutual TLS (mTLS) in the SSO configuration and upload a client certificate and private key for certificate-based authentication. The private key is encrypted on the server after saving.
