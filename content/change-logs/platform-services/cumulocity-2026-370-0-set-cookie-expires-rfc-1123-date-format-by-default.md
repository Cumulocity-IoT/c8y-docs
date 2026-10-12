---
date: '2026-10-12'
title: RFC 1123 date format in Set-Cookie header is now the default
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67184
version: 2026.370.0
---

As announced earlier in [Standardized Expires date format in Set-Cookie header](/change-logs/#cumulocity-2026-208-0-set-cookie-expires-date-format), the `Expires` attribute of the `Set-Cookie` header is now returned by default in the standard RFC 1123 date format with spaces (for example, `Fri, 10 Jul 2026 07:30:15 GMT`) instead of the legacy dash-separated format (`Fri, 10-Jul-2026 07:30:15 GMT`).

The backwards compatibility patch is no longer enabled by default. Make sure your integrations support the RFC 1123 date format.
