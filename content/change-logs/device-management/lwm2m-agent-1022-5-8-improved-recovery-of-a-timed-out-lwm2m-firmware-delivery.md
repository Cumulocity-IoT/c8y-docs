---
date: '2026-09-03'
title: Improved recovery of a timed out LWM2M firmware delivery
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-7085
version: 1022.5.8
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-09-03'
---
The LWM2M agent gives each firmware delivery a limited amount of time to complete. When that time expired, the agent restarted the update process and asked the device for its firmware update state, which the process accepts only as **Idle**. A device that was still working on the transfer could not report **Idle**, so the operation failed with the misleading reason "Another firmware update process is still in progress".

The agent now reads the firmware update state and the firmware update result of the device once the delivery time expires, and it continues based on what the device reports. 

- A device that already holds the firmware gets the installation triggered instead of the image being delivered a second time. 
- A device that reports a firmware update error fails the operation with that error, so the failure names the reason reported by the device. 
- A device that dropped the transfer gets its firmware update state machine reset and the firmware delivered again. 
- A device that is still downloading fails the operation with a reason that names the expired delivery time, and a device that is offline gets checked again the next time it registers.

Existing installations require no changes, and firmware updates that complete within the delivery time behave as before.
