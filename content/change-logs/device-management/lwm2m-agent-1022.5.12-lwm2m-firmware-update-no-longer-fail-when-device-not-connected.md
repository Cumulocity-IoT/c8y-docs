---
date: ""
title: LWM2M device's firmware update operation no longer fails when the device is not connected
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-6527
version: 1022.5.12
---
Fixed an issue in the LWM2M service where a firmware update could fail if the device went offline during the update process. This affected two situations:

  * Checking the update result. When the device reported the firmware update as finished but did not answer the follow-up read of the update result, the LWM2M Service tried to evaluate a result that was never received. The service now records an event stating that the device is not connected, keeps the operation open and resumes the check when the device connects again.
  
  * Resetting the firmware state machine. When the device did not answer the read of its supported delivery method, the LWM2M service guessed a method and attempted a reset write that could not reach the device either. The LWM2M service now skips the reset and retries it when the device connects again.

In both cases the firmware update operation is no longer marked as failed and resumes after the device reconnects.