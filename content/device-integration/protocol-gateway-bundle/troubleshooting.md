---
weight: 130
title: Troubleshooting
layout: redirect
---

| Symptom | Cause and fix |
|---------|---------------|
| The software installation fails with `no image detected in file` | The software item has the type `container`. Change the type to `container-group`. |
| The software type `container-group` is not offered for the device | Restart `tedge-agent` after you install the container plugin. |
| The Services tab shows no commands | The device runs thin-edge.io 2.0.0 or earlier. Upgrade to 2.1.0 or later, restart `tedge-container-plugin`, and refresh the browser. |
| {{< product-c8y-iot >}} shows a series without values | **Message to send** is empty, or the macro names a data source or tag that does not exist. Check the payload with `tedge mqtt sub 'te/device/plc01/#'`. |
| The **Destination server** list is empty | The MQTT client is not saved. Create and save it in **IoT Interface** first. |
| The MQTT client shows an error | **Host** and **Client ID** are required. Check that thin-edge.io runs with `sudo tedge connect c8y --test`. |
| The check mark is disabled when you create a data source | Enter a name first. |
| **Serial** shows no license | Check that the file is */etc/takebishi/sd_card/DeviceGateway.lic*, and restart the service. |
| The child device has no type or device information | The registration event is not running, or a topic has the wrong number of slashes. Check with `tedge mqtt sub 'te/device/plc01/#' --duration 3s`. |
| A delivered *setting.dxg* has no effect | The container reads the file only at start. Restart the service. |
| A failed installation removes a cached image | The container plugin removes unused images by default. Set `pruneimages = false` in */etc/tedge/plugins/tedge-container-plugin.toml* if you want to keep them. |
| The Docker installation stops with the connection | Run the installation in a session that does not time out. If it stopped, run `sudo dpkg --configure -a` and the script again. |
| The browser warns about the certificate | The gateway uses a self-signed certificate. Accept it on a trusted network, or install your own certificate. |
