---
date: 
title: >-
  Tenant admins can now disable MQTT Service basic authentication
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
ticket: MTM-66371
version: 3000.0.21
---

Tenant admins can now disable basic authentication for MQTT Service connections, requiring every device to use certificate authentication instead.

To disable basic authentication, navigate to **Settings > Feature toggles** in the Administration application and set the `mqtt-service.basic-authentication` toggle key status to Disabled.
Basic authentication remains enabled by default, so existing tenants and devices are unaffected until an admin makes this change.

For details, see [Disabling basic authentication](/device-integration/mqtt-service/#disabling-basic-authentication).
