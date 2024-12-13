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
By default, the LWM2M service serializes binary data of a resource such as Opaque type to a byte array in {{< product-c8y-iot >}} representations. This functionality is now deprecated and will be changed in the future to the hexadecimal string format. For now the default serializer is still serialized to the byte array and the format can be switched only on the instance level. 
This change affects how the data is represented in {{< product-c8y-iot >}} objects (operations, values displayed in the Objects tab). It does not affect the communication with LWM2M devices. 