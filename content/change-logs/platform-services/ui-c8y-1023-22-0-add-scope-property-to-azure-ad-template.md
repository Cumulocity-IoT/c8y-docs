---
date: '2026-01-23'
title: Azure AD template now supports scope configuration
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65337
version: 1023.22.0
---
Azure AD integrations may require proper scope configuration to define the permissions and access levels for authentication and authorization. Previously, the Azure AD template did not expose the scope parameter, limiting configuration flexibility. The Azure AD template now includes a scope property that allows you to explicitly configure the scope parameter when setting up your Azure AD integration. This gives you full control over the permissions requested during the authentication process. When configuring Azure AD authentication, you can now specify the exact scope requirements for your integration, ensuring that only the necessary permissions are requested and granted. This applies to all new Azure AD configurations created after this change. Existing Azure AD configurations will continue to work as before, but you can update them to include scope configuration if needed. The scope parameter is optional.
