---
date: ""
title: Support for ID tokens provided by external IAM servers in the SSO authentication process
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-57760
version: 1020.589.0
---
Support for ID tokens provided by external IAM servers has been added and can now be used in the authentication process via single sign-on (SSO). Previously, only access tokens were supported by the {{< product-c8y-iot >}} platform. Now, the administrator can decide through the configuration whether user data retrieved from the external server, such as first name, last name, phone number, email, and roles, should be loaded from the access token or the ID token.