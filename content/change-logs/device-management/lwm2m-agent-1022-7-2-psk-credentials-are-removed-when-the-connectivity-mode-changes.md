---
date: ""
title: PSK credentials are removed when the LWM2M connectivity mode changes
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
ticket: DM-6379
version: 1022.7.2
---
A bootstrap or server PSK ID must be unique across all tenants, so a PSK ID that stays attached to a device blocks any other device from using it. Previously, switching the bootstrap or server authentication of an LWM2M device away from **PSK** kept the stored PSK ID and key attached to the device until the device was deleted, and only disabling the server authentication cleared the security information.

Now, saving the **Connectivity** settings with a mode other than **PSK** (**Disabled**, **Unsecured** or **X.509**) removes the stored PSK ID and key for that connection, for bootstrap and server authentication alike. The freed PSK ID can be used by another device immediately. Before you save such a change, the **Connectivity** tab under **LWM2M Configuration** shows a warning that the pre-shared key is deleted permanently and must be entered again to use **PSK** later.

Existing devices are not changed until their connectivity settings are saved again. For details, see [LWM2M device details](/device-integration/lwm2m/#lwm2m-device-details).
