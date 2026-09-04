---
date: ""
title: LWM2M firmware update continues when the device reconnects from a new address
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
ticket: DM-6481
version: 1022.5.11
---
A device can change its IP address or port in the middle of a firmware update, for example when the network drops an idle connection and the device reconnects, or when a mobile network assigns it a new port. Whenever that happens, the LWM2M stack cancels the request that is still on its way to the old address. The agent treated such a cancelled request like an error reported by the device and failed the firmware update, even though the device was reachable again at its new address and DTLS Connection ID had kept the security context alive. The operation ended with a failure such as "Unexpected result while querying device firmware update data" and the firmware update had to be started again by hand.

The agent now recognizes a cancelled request and repeats that step once, against the address the device currently uses, so the firmware update carries on where it left off. If the repeated request is cancelled as well, the update is still not failed: the process keeps a state it can be resumed from and continues the next time the device registers.

This covers every step of the firmware update:

- Reading the firmware update settings of the device and resetting its firmware update state machine.
- Establishing the observations on the firmware update state and the firmware update result.
- Delivering the firmware image, both by PUSH and by PULL.
- Triggering the installation.

A firmware update that was interrupted while the agent was reading the device configuration or triggering the installation is also resumed on the next registration of the device instead of being failed.

Existing installations require no changes, and firmware updates of devices that keep their address behave as before.
