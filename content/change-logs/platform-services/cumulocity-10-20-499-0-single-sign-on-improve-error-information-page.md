---
date: '2024-11-22'
title: Improved error information for single sign-on login
product_area: Platform services
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-50975
version: 10.20.499.0
---
Previously, when an error occurred on logging in via SSO, the plain HTML error text was displayed in the browser.
With this change, optional `Redirect to the user interface application` configuration has been added which allows displaying the error text as a standard UI error message.
The new configuration parameter is optional and does not affect current SSO configurations.
Using this option requires updating the "Valid Redirect URIs" in the authorization server with the value "<tenant_domain>/apps/*". For details, refer to [Custom template configuration](/authentication/sso/#custom-template).
