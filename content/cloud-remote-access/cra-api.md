---
title: Cloud Remote Access API
weight: 40
layout: bundle
sector:
  - device_management
---

{{< product-c8y-iot >}} provides a public API for the Cloud Remote Access feature. This API is designed for two different integration scenarios:

1. Development of **device-side components** which enable access to services like VNC, SSH, Telnet, or arbitrary TCP-based protocols (passthrough) using the device as a gateway.
2. Integration and development of **native TCP protocol clients or forwarding proxies**, for example as an alternative to the commonly used [C8Y Cli passthrough support](https://goc8ycli.netlify.app/docs/examples/remoteaccess/).

