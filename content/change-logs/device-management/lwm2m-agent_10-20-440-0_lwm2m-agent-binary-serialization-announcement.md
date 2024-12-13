---
date:
title: LWM2M Opaque type serialization to byte array is now deprecated  
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4179
version: 10.20.440.0
---
By default, the LWM2M agent serializes binary data to a byte array JSON string (for example, "[12, 32, 435]"). This functionality is now deprecated and will be changed in the future to HEX format (for example, "41424344"). For now the default serializer is still binary JSON, but this can be changed by setting the `C8Y.lwm2m.operation.legacyBinarySerialization` property to "false" in the agent properties file. 
This change affects how the data is represented in {{< product-c8y-iot >}} objects (operations, generic UI data fragments). It does not affect the communication with LWM2M devices. 