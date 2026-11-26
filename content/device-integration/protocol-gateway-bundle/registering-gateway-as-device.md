---
weight: 40
title: Registering the gateway as a Cumulocity device
layout: redirect
---

You do not register Protocol Gateway manually. thin-edge.io registers the device when you connect it to your tenant, and the container plugin registers the container as a service of that device. If thin-edge.io is not connected yet, follow the [thin-edge.io documentation](https://thin-edge.github.io/thin-edge.io/start/connect-c8y/).

Each machine that the gateway reads becomes a child device of the thin-edge.io device. The gateway creates these devices through MQTT messages. See [Child devices and device information](/device-integration/protocol-gateway/#child-devices).
