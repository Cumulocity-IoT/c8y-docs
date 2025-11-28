---
date: 
title: Improved Device Certificate Enrollment Validation
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
Added a new validation step ensuring that the Common Name (CN) field in the Certificate Signing Request (CSR) Subject exactly matches the device ID provided during the device registration process.
This enhancement strengthens consistency and prevents [enrollment of certificates](/device-certificate-authentication/device-enroll-and-re-enroll) with mismatched identifiers.

