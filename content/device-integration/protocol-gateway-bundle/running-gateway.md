---
weight: 30
title: Running the gateway
layout: redirect
---

### To install the gateway from Cumulocity {#to-install-the-gateway-from-cumulocity}

1. In the Device Management application, go to **Management > Software repository** and click **Add software**.
2. Enter a **Name**, for example “protocol-gateway”, and set **Software type** to “container-group”. If you use device type filters, select the filter of your devices.

   {{< c8y-admon-important >}}
   Do not use the type “container”. The installation then fails with `no image detected in file`, because the plugin treats the Compose file as an image archive.
   {{< /c8y-admon-important >}}
3. Add a version that matches the image tag in the file, for example `3.7.0` for `tkbs-dgwd20:3.7.0`, and upload the *docker-compose.yml* file. The Software tab of each device then shows the gateway version that runs on it. If you change only the Compose file and not the gateway version, add a suffix, for example `3.7.0-2`.

   ![Add the software item](/images/device-protocols/protocol-gateway/software-repository-add.png)

4. Open the device, click **Software**, click **Install software**, select “protocol-gateway” and the version “3.7.0”, and click **Install**.

   ![Install the software item](/images/device-protocols/protocol-gateway/software-install.png)

The operation is `successful` when the container runs. On the device, check:

```bash
sudo docker ps --format '{{.Names}} {{.Status}}'
```

The container `takebishi-device-gateway` has the status `Up`. The plugin stores the Compose file at */var/tedge-container-plugin/compose/protocol-gateway/docker-compose.yaml*.

### To start, stop, or restart the gateway {#to-start-stop-or-restart-the-gateway}

The container plugin registers each container as a service of the device. Open the device and click **Services**. **Services** lists the service *protocol-gateway@takebishi-device-gateway* with the type “container-group”. Click the restart icon of the service to restart the gateway, or open the menu of the service to start or stop it.

![Services tab](/images/device-protocols/protocol-gateway/services-tab.png)

{{< c8y-admon-info >}}
The commands on the service need thin-edge.io 2.1.0 or later. With thin-edge.io 2.0.0, the service shows no commands. After an upgrade, restart `tedge-container-plugin` and refresh the browser.
{{< /c8y-admon-info >}}

### To update the gateway {#to-update-the-gateway}

To update, add a new version to the software item and install it on the device. The bind mounts keep the license and the configuration. Back up */etc/takebishi/data* first. See [Protocol Gateway upgrade notes](/device-integration/protocol-gateway/#upgrading).

### To run the gateway directly with Docker Compose {#to-run-the-gateway-directly-with-docker-compose}

For a single device without the container plugin, save the *docker-compose.yml* file from [Container definition](/device-integration/protocol-gateway/#container-definition) without the `x-tedge` block as *~/protocol-gateway/docker-compose.yml* on the device, and start it. To reach the device from Device Management, see [Remote access](/device-integration/protocol-gateway/#remote-access).

```bash
cd ~/protocol-gateway
sudo docker compose up -d
sudo docker compose ps
sudo docker logs --tail 10 takebishi-device-gateway
```

The status shows `Up`, and the log contains `Start main process.`, `Start setting process.`, and `Start lighttpd.`. The log also warns that the OpenSSL library is outdated. This does not affect the setup. Restart the gateway with `sudo docker compose restart`.
