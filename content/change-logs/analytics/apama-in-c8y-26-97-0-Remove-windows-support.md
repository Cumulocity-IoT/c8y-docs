---
date: 2026-03-31
title: >-
  Changes to the development workflow on Windows for Apama Analytics Builder
  Block SDK and Apama EPL Apps Tools
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

The new approach is to use the community-maintained [Apama Extension for Microsoft Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ApamaCommunity.apama-extensions) which provides a productive development environment for writing EPL, including a workflow for starting Apama application on Windows using a Dev Container using WSL (Windows Subsystem for Linux). 

Alternatively, in the short term, it is possible to continue using Apama 10.15 and the `rel/y2025` branch of the respective repositories; however, customers are encouraged to transition to the new approach when possible.

