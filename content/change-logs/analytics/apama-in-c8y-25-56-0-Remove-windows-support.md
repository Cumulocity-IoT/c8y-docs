---
date: 
title: Changes to the development workflow on Windows for Apama Analytics Builder Block SDK and Apama EPL Apps Tools
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
version: 26.97.0
---
The [Apama Analytics Builder Block SDK](https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk) and [Apama EPL Apps Tools](https://github.com/Cumulocity-IoT/apama-eplapps-tools) are no longer supported natively on Windows environments.

The new approach is to set up WSL (Windows Subsystem for Linux) with a Debian distribution using the 26.x Apama packages from our [Debian Package Repository](https://download.cumulocity.com/Apama/Debian). This provides a compatible and supported environment for using both the Analytics Builder Block SDK and EPL Apps Tools. 

You may wish to use the community-maintained [Apama Extension for Visual Studio Code](https://cumulocity.com/apama/docs/latest/vscode/apama-extension-for-vscode/) which provides a useful development environment for writing EPL, and can easily be used with WSL (or alternatively, a Dev Container). 

Alternatively, in the short term, it is possible to continue using Apama 10.15 and the `rel/y2025` branch of the respective repositories; however, customers are encouraged to transition to the new approach when possible.

