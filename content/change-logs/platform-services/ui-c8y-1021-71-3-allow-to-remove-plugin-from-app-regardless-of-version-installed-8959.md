---
date: '2025-05-22'
title: Improved plugin uninstall and upgrade reliability for revoked plugins
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-63479
version: 1021.71.3
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, if a plugin version was removed but the package remained accessible due to newer versions, the plugin would enter a "revoked" state. Attempting to uninstall such plugins appeared successful in the UI, but the plugin was not actually removed. With this fix, uninstallation of revoked plugins is now processed correctly and accurately reflected in the UI. Users can now reliably remove revoked plugins and upgrade to newer, available versions.
