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
version: 26.79.0
---
The [Apama Analytics Builder Block SDK](https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk) and [Apama EPL Apps Tools](https://github.com/Cumulocity-IoT/apama-eplapps-tools) are no longer supported natively on Windows environments.

Windows users have two options to continue using these tools:

  - **Use a WSL-based environment**:
      Set up WSL (Windows Subsystem for Linux) with a Debian distribution using [Apama Debian Package](https://download.cumulocity.com/Apama/Debian) of 26.x+. This provides a compatible and supported environment for using both the Analytics Builder Block SDK and EPL Apps Tools. 

  - **Use the rel/y2025 branch with Apama 10.15**:
      In the short term, it is possible to continue using Apama 10.15 and the rel/y2025 branch of the respective repositories; however, customers are encouraged to transition to the new approach when possible.

