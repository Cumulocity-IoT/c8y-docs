---
weight: 30
title: Running Protocol Gateway
layout: redirect
---

### To install Protocol Gateway from Cumulocity {#to-install-protocol-gateway-from-cumulocity}

1. In the Device Management application, go to **Management > Software repository** and click **Add software**.
2. Enter a **Name**, for example “protocol-gateway”, and set **Software type** to “container-group”. If you use device type filters, select the filter of your devices.

   {{< c8y-admon-important >}}
   Do not use the type “container”. The installation then fails with `no image detected in file`, because the plugin treats the Compose file as an image archive.
   {{< /c8y-admon-important >}}
3. Add a version that matches the image tag in the file, for example `3.7.0`, and upload the *docker-compose.yml* file. The Software tab of each device then shows the Protocol Gateway version that runs on it. If you change only the Compose file and not the Protocol Gateway version, add a suffix, for example `3.7.0-2`.

   ![Add the software item](/images/device-protocols/protocol-gateway/software-repository-add.png)

4. Open the device, click **Software**, click **Install software**, select “protocol-gateway” and the version “3.7.0”, and click **Install**.

   ![Install the software item](/images/device-protocols/protocol-gateway/software-install.png)

The installation is complete when the operation shows the status `successful`. If it fails, see [Troubleshooting](/device-integration/protocol-gateway/#troubleshooting).

### To start, stop, or restart Protocol Gateway {#to-start-stop-or-restart-protocol-gateway}

Open the device and click **Services**. Click the restart icon of the Protocol Gateway service, or open the menu of the service to start or stop it.

![Services tab](/images/device-protocols/protocol-gateway/services-tab.png)

{{< c8y-admon-info >}}
The start, stop, and restart commands need thin-edge.io 2.1.0 or later. With an earlier version, the Services tab lists the service without commands.
{{< /c8y-admon-info >}}

### To update Protocol Gateway {#to-update-protocol-gateway}

Before you update, see the [Takebishi release notes](https://www.faweb.net/en/product/devicegateway/releasenote) for changes. The version in this documentation is 3.7.0.2490.

1. Back up the data folder on the device:

   ```bash
   sudo cp -a /etc/takebishi /etc/takebishi.backup
   ```

2. Add the new version to the software item and install it on the device. The bind mounts keep the license and the configuration.
3. If the new version fails, install the previous version again and restore the folder from the backup.

### To run Protocol Gateway directly with Docker Compose {#to-run-protocol-gateway-directly-with-docker-compose}

For a single device without the container plugin, save the *docker-compose.yml* file from [Container definition](/device-integration/protocol-gateway/#container-definition) without the `x-tedge` block as *~/protocol-gateway/docker-compose.yml* on the device, and start it:

```bash
cd ~/protocol-gateway
sudo docker compose up -d
sudo docker compose ps
```

The status shows `Up`. Restart Protocol Gateway with `sudo docker compose restart`.
