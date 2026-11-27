---
weight: 90
title: Troubleshooting
layout: redirect
---

| Symptom | Cause and fix |
|---------|---------------|
| The software installation fails with `no image detected in file` | The software item has the type `container`. Change the type to `container-group`. |
| The software type `container-group` is not offered for the device | Restart `tedge-agent` after you install the container plugin. |
| The Services tab shows the service without commands | The device runs a thin-edge.io version earlier than 2.1.0. Upgrade thin-edge.io, restart `tedge-container-plugin`, and refresh the browser. |
| The installation succeeds, but the web interface does not respond | Check the container on the device with `sudo docker ps --format '{{.Names}} {{.Status}}'`. The Protocol Gateway container has the status `Up`. |
| {{< product-c8y-iot >}} shows a series without values | **Message to send** is empty, or the macro names a data source or tag that does not exist. Check the payload with `tedge mqtt sub 'te/device/plc01/#'`. Every 10 seconds, a message like `[te/device/plc01///m/simulated] {"simulator": {"sine_wave": 25488}}` appears. The values are raw register values, not engineering units. |
| The child device has no type | The registration event is not running, or its topic has the wrong number of slashes. The topic is `te/device/plc01//` with 2 slashes. Check with `tedge mqtt sub 'te/device/plc01/#' --duration 3s`. |
| The **Destination server** list is empty | The MQTT client is not saved. Create and save it in **IoT Interface** first. |
| The MQTT client shows an error | **Host** and **Client ID** are required. Check that thin-edge.io runs with `sudo tedge connect c8y --test`. To check that the broker accepted the client, run `sudo journalctl -u mosquitto --since "-5min" --no-pager \| grep tkb-ras`. The output contains `New client connected from 127.0.0.1:<port> as tkb-ras`. |
| **Serial** shows no license | Check that the license file is in the license folder with the correct file name, and restart Protocol Gateway. |
| A delivered configuration file has no effect | The container reads the file only at start. Restart Protocol Gateway. |
| The browser warns about the certificate | Protocol Gateway uses a self-signed certificate. Accept it on a trusted network, or install your own certificate. |
