---
date: '2025-05-22'
title: >-
  Fixed the verification process for partial certificate chains used in device
  authentication
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63426
version: 2025.166.0
---
Previously, when a device used a certificate to authenticate with the platform, authentication failed if the device did not provide the full certificate chain up to the root certificate. This issue has now been resolved, allowing devices to authenticate using a partial chain which does not include the root certificate. Authentication happens with only the leaf certificate if the immediate issuer is present in the platform.
