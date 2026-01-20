---
date: ""
title: Display confirmation dialog for conditional logout action after SSO config update [GRAFT][release/cd] (#10788)
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
Previously, if user wanted to update SSO config, he had to terminate all current sessions of users that relies on this configuration. This feature gives a possibility to save SSO configuration with or without terminating this sessions.