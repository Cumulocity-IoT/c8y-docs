---
date: '2025-07-31'
title: Improved URL encoding in self-links
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63992
version: 2025.247.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Self-links containing special characters were not properly encoded, leading to broken links. This issue has been fixed. The encoding of special characters in self-links has been improved to ensure that the self-links are URL-encoded correctly.
