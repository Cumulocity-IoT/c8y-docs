---
weight: 120
title: Recommendations
layout: redirect
---

| Topic | Decision | Reason |
|-------|----------|--------|
| Installation | Install from {{< product-c8y-iot >}} with the container plugin. | You install, update, and restart the gateway centrally, and the software item is the same on every device. |
| Software type | Use `container-group`. | The type `container` treats the Compose file as an image archive and fails. |
| thin-edge.io version | Use 2.1.0 or later. | Service commands need it. |
| Device inventory | Limit it to the Linux device and thin-edge.io. | Operations such as software, configuration, and services belong to the device that runs thin-edge.io. Gateway data on it mixes two roles. |
| Child device type | Use `ProtocolGateway` for all devices that the gateway creates. | Other child-device methods stay distinguishable, and the type works in filters. |
| Marker fragment | Add `protocolGateway`. | It identifies the origin even when the type changes. |
| Registration | Publish it from the gateway with Retain. | One file defines the data and its description, and new devices need no manual commands. |
| Cycle | Set `Cycle(msec)` in milliseconds. | The unit of the field is milliseconds. |
| Configuration files | Manage *setting.dxg* and *DeviceGateway.lic* with the configuration plugin. | You change one device or many devices with standard Device Management features. |
| Restart | Restart the service after a configuration delivery. | The container loads the file only at start. |
| Secrets | Change the default password and treat *setting.dxg* as a secret. | The file contains the password in plain text, and snapshots copy it. |
| Image version | Set a version tag such as `3.7.0` and do not use `latest`. | The gateway version changes only when you decide. |
| Software version | Use the same number as the image tag. | The version in {{< product-c8y-iot >}} then shows which gateway runs on a device, and you can roll back by installing an earlier version. |
