---
weight: 20
title: Protocol Gateway configuration and registration
layout: redirect
---

Protocol Gateway keeps all its configuration in one JSON file, *setting.dxg*. The container reads the file when it starts. The web interface writes the same file when you click **Save**. Two folders on the host hold the data, so that the data stays in place when you replace the container.

| Host folder | Container folder | Content |
|-------------|------------------|---------|
| */etc/takebishi/sd_card* | */mnt/sdcard* | License file, logs, offline buffering, and file actions. |
| */etc/takebishi/data* | */etc/dxpgateway* | Protocol Gateway configuration (*config/setting.dxg*) and certificates. Back up this folder. |

### To prepare the device {#to-prepare-the-device}

Prepare the device once. Run the commands in a local console or in a Secure Shell (SSH) session.

1. Install Docker Engine and Docker Compose. For Debian-based distributions, use the Docker convenience script. Run it in a session that does not time out, for example directly on the device or in a `screen` session:

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

   Verify the installation:

   ```bash
   sudo docker --version
   sudo docker compose version
   ```

2. Install thin-edge.io 2.1.0 or later and connect it to your tenant. See the [thin-edge.io documentation](https://thin-edge.github.io/thin-edge.io/install/).
3. Install the container plugin. The package comes from the thin-edge.io community repository:

   ```bash
   curl -1sLf 'https://dl.cloudsmith.io/public/thinedge/community/setup.deb.sh' | sudo -E bash
   sudo apt-get install -y tedge-container-plugin-ng
   sudo systemctl restart tedge-agent
   ```

   Restart the agent so that the device advertises the software types `container` and `container-group`. Check the result:

   ```bash
   systemctl is-active tedge-container-plugin
   ls /etc/tedge/sm-plugins
   ```

   The service is `active`, and the folder contains `container` and `container-group`. In Device Management, the **Services** tab of the device lists the service `tedge-container-plugin`.
4. Create the folders for the license and the Protocol Gateway data, and copy the license file to the license folder. Use the target file name from the command exactly:

   ```bash
   sudo mkdir -p /etc/takebishi/sd_card /etc/takebishi/data
   sudo cp DeviceGateway.lic /etc/takebishi/sd_card/
   ```

5. Register the license file and the Protocol Gateway configuration file as configuration types. Open */etc/tedge/plugins/tedge-configuration-plugin.toml* and add the entries to the existing `files` list, before the closing bracket:

   ```toml
   files = [
       # ... existing entries ...
       { path = '/etc/takebishi/sd_card/DeviceGateway.lic', type = 'device-gateway.lic' },
       { path = '/etc/takebishi/data/config/setting.dxg', type = 'protocol-gateway.dxg', user = 'root', group = 'root', mode = 0o644 },
   ]
   ```

   Do not add a second `files =` line, because TOML does not allow duplicate keys. Restart the agent:

   ```bash
   sudo systemctl restart tedge-agent
   ```

   Check that the types are registered:

   ```bash
   tedge mqtt sub 'te/device/main///cmd/config_snapshot'
   ```

   The list of types contains the two types that you added.

### Container definition {#container-definition}

The container plugin deploys a Docker Compose file as a software item of the type `container-group`. Save the following file as *docker-compose.yml*:

```yaml
x-tedge:
  remove_volumes: false
  remove_timeout: 30s

services:
  takebishi-device-gateway:
    container_name: takebishi-device-gateway
    image: public.ecr.aws/takebishi/tkbs-dgwd20:3.7.0
    restart: unless-stopped
    network_mode: "host"
    environment:
      - webport=80
      - websport=443
    volumes:
      - type: bind
        source: /etc/takebishi/sd_card
        target: /mnt/sdcard
      - type: bind
        source: /etc/takebishi/data
        target: /etc/dxpgateway
```

| Setting | Purpose |
|---------|---------|
| `x-tedge.remove_volumes` | Keeps the volumes when you remove the software item. The configuration lives in bind mounts on the host. |
| `network_mode: "host"` | The container shares the network of the device, so `127.0.0.1:1883` reaches the thin-edge.io broker. |
| `webport`, `websport` | HTTP and HTTPS ports of the web interface. Change `webport` if another service uses port 80. |
| `restart` | Starts Protocol Gateway again after a reboot. |

{{< c8y-admon-important >}}
Do not set a top-level `name:` in the file. The container plugin uses the name of the software item as the Compose project name.
{{< /c8y-admon-important >}}

### Additional customizations {#additional-customizations}

- **Serial devices.** For a serial device, such as a USB-to-RS-232 adapter, add `devices: ["/dev/ttyUSB0"]` to the service. Do not use `privileged: true`.
- **Image version.** The [Amazon ECR Public Gallery](https://gallery.ecr.aws/takebishi/tkbs-dgwd20) and the [Protocol Gateway download page](https://www.faweb.net/en/download/download/#devicegateway) list the image `public.ecr.aws/takebishi/tkbs-dgwd20`. Always set a version tag, such as `3.7.0`, and do not use `latest`. The tag `3.7.0` is a multi-architecture tag, so one software item serves devices with different processor architectures. The tags `3.7.0-arm64`, `3.7.0-amd64`, and `3.7.0-arm` select one architecture.
- **Software version in {{< product-c8y-iot >}}.** Use the same version number for the software item as for the image tag. See [To install Protocol Gateway from {{< product-c8y-iot >}}](/device-integration/protocol-gateway/#to-install-protocol-gateway-from-cumulocity).
- **Image cleanup.** By default, the container plugin removes unused images after each container operation (`pruneimages = true` in */etc/tedge/plugins/tedge-container-plugin.toml*). A failed installation can remove a pulled image, so the next installation pulls it again.
