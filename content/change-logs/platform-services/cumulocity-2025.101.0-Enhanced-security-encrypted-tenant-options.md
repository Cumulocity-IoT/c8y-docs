---
date: 
title: Enhanced security for encrypted tenant options
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62399
version: 2025.116.0
---
Security improvements have been implemented for decrypting encrypted tenant options with the `credentials.` prefix. Encrypted tenant options with this prefix can only be decrypted by system users (such as bootstrap user and microservice user) if they own those tenant options. This new restriction determines ownership by matching the category of the tenant options in the following order of priority:
* The category defined in the `settingsCategory` field in the microservice manifest.
* The microservice’s context-path.
* The microservice name.

**Note**: To assist users who may rely on the old behaviour, there is the ability to revert to the previous behaviour using a feature toggle via API.