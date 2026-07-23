---
date: 2026-07-23
title: Configurable SSH host key verification for Cloud Remote Access
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-KHZSGmQm0
    label: Cloud Remote Access
build_artifact:
  - value: tc-aHRoC2cxY
    label: cloud-remote-access
ticket: DM-6421
version: 3.3.0
---
The handling of the SSH server host key for Cloud Remote Access endpoints is now controlled by the `hostkey-autosave` tenant option in the `remoteaccess` category. The option defaults to `false`, so the server host key must be confirmed on first connect. This is a deliberate security change from the previous silent-autosave behavior.

When `hostkey-autosave` is `false` (the default), connecting to an endpoint that has no host key stored yet first probes the server and shows its host key fingerprint, and the connection continues only after you confirm it. When set to `true`, the server host key is instead trusted and saved automatically on the first successful connection. In both cases, the stored host key is verified on every subsequent connection, and a mismatch aborts the connection.
