---
date: '2024-06-03'
title: Removal of deprecated JWT login mode
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53448
version: 10.20.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
JWT authentication with {{< product-c8y-iot >}} has been deprecated since release 10.6 and will be removed in Q3 2024 for the SaaS instances and in 2025 for the yearly releases.
This authentication method is not to be confused with SSO (single sign-on) or OAI-Secure authentication, which are both recommended and still supported.
This change will only impact you if your organization used an early version of SSO on {{< product-c8y-iot >}}.
For customers on the public cloud instances we will get in touch with you if you are using this type of authentication.
For self-hosted or self-managed instances you need to do the following:
Ask your Operations team to run this [script](https://cumulocity.atlassian.net/servicedesk/customer/portal/5/article/44666909). This will verify
whether any tenant collections have an `authenticationProviders` configuration and
if any tenant has the tenant options configured with the category `token.publicKey`.
If either an `authenticationProvider` configuration or the tenant option `token.publicKey` category exists this indicates that the deprecated JWT is, or was, used in the past. In this case you need to check your external services for use of the JWT authentication and change it to use either SSO or OAI-Secure. These two methods provide a better and more secure approach to authentication.
These methods are documented here:
- [Single sign-on](/authentication/sso/#configuration)
- [Token generation with OAI-Secure](/authentication/sso/#configuring-access-tokens).
