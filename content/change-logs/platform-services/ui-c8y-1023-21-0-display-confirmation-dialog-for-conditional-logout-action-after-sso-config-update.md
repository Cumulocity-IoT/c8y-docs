---
date: ""
title: Display confirmation dialog for optional session termination when updating SSO configuration
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
ticket: MTM-65364
version: 1023.21.0
---
Context: When updating SSO configuration, all active user sessions that depend on this configuration need to be re-authenticated to ensure security and consistency with the new settings. Previously, this required manually terminating all affected sessions before saving the configuration changes. Change: A confirmation dialog now appears when you update SSO configuration, giving you the option to either terminate all active sessions associated with that configuration or proceed with the update while keeping sessions active. This provides flexibility in managing the update process based on your operational needs. Impact: You can now update SSO configurations with greater control over session management. If you choose to terminate sessions, users will be logged out and required to re-authenticate with the new SSO settings on their next login. If you choose not to terminate sessions, existing sessions will continue until they naturally expire, though they may experience authentication issues if the new configuration is incompatible with their current session state. This change applies to all tenants and users relying on SSO authentication.