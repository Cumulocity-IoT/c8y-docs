---
weight: 80
title: Recommendations
layout: redirect
---

| Topic | Recommendation | Reason |
|-------|----------------|--------|
| Installation | Install from {{< product-c8y-iot >}} with the container plugin. | You install, update, and restart Protocol Gateway centrally, and the software item is the same on every device. |
| Software type | Use `container-group`. | The type `container` treats the Compose file as an image archive and fails. |
| Image version | Set a version tag such as `3.7.0` and do not use `latest`. | The Protocol Gateway version changes only when you decide. |
| Software version | Use the same number as the image tag. | The version in {{< product-c8y-iot >}} then shows which Protocol Gateway version runs on a device, and you can roll back by installing an earlier version. |
| Child device type | Set the type `ProtocolGateway` on every child device that Protocol Gateway creates. | Child devices from other sources stay distinguishable, and the type works in filters. |
| Secrets | Change the default password and treat the Protocol Gateway configuration file as a secret. | The file contains the password in plain text, and snapshots copy it. |
