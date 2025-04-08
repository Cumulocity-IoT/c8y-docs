---
date: 2025-04-08
title: Dropping native windows support for the apama-analytics-builder-block-sdk and apama-eplapps-tools.
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 26.79.0
---
The apama-analytics-builder-block-sdk and apama-eplapps-tools are no longer supported on native Windows environments.

Windows users have two options to continue using these tools:

  - **Use a WSL-based Environment**:
      Set up Windows Subsystem for Linux (WSL) with a Debian distribution. This provides a compatible and supported environment for using both the Block SDK and EPL Apps Tools.

  - **Use the rel/y2025 branch with Apama 10.15**:
      Alternatively, use the rel/y2025 branch of the respective repositories along with Apama 10.15 for continued support on Windows.

