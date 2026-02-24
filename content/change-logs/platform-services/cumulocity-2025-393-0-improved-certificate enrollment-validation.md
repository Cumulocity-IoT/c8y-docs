---
date: '2026-03-31'
title: Improved device certificate enrollment validation
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform services
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65209
version: 2025.393.0
---
The device certificate validation has been improved to ensure that the Common Name (CN) field in the Certificate Signing Request (CSR) subject exactly matches the device ID provided during the device registration process.
This enhancement improves consistency and prevents [the enrollment of certificates](/device-certificate-authentication/device-enroll-and-re-enroll) with mismatched identifiers.

