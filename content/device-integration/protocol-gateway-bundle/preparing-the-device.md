---
weight: 20
title: Preparing the device
layout: redirect
---

### Set up the license and configuration files {#set-up-the-license-and-configuration-files}

Prepare the device once, after you install Docker and thin-edge.io. Run the commands in a local console or in a Secure Shell (SSH) session.

{{< c8y-admon-info >}}
The commands in this documentation use Debian-based distributions. On other Linux distributions, adapt the commands to your package manager and file locations.
{{< /c8y-admon-info >}}

1. Install the container plugin from the thin-edge.io community repository, and restart the agent so that the device offers the software type `container-group`:

   ```bash
   curl -1sLf 'https://dl.cloudsmith.io/public/thinedge/community/setup.deb.sh' | sudo -E bash
   sudo apt-get install -y tedge-container-plugin-ng
   sudo systemctl restart tedge-agent
   ```

2. Create the folders for the license and the Protocol Gateway data, and copy the license file to the license folder. Use the target file name from the command exactly:

   ```bash
   sudo mkdir -p /etc/takebishi/sd_card /etc/takebishi/data
   sudo cp DeviceGateway.lic /etc/takebishi/sd_card/
   ```

3. Register the license file and the Protocol Gateway configuration file as configuration types. Open */etc/tedge/plugins/tedge-configuration-plugin.toml* and add the entries to the existing `files` list, before the closing bracket:

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
  remove_volumes: false      # keep the license and configuration when you remove the software item
  remove_timeout: 30s

services:
  takebishi-device-gateway:
    container_name: takebishi-device-gateway
    image: public.ecr.aws/takebishi/tkbs-dgwd20:3.7.0
    restart: unless-stopped  # start again after a reboot
    network_mode: "host"     # reach the thin-edge.io broker on 127.0.0.1:1883
    environment:
      - webport=80           # HTTP port of the web interface
      - websport=443         # HTTPS port of the web interface
    volumes:
      - type: bind
        source: /etc/takebishi/sd_card
        target: /mnt/sdcard
      - type: bind
        source: /etc/takebishi/data
        target: /etc/dxpgateway
```

{{< c8y-admon-important >}}
Do not set a top-level `name:` in the file. The container plugin uses the name of the software item as the Compose project name.
{{< /c8y-admon-important >}}

### Additional customizations {#additional-customizations}

- **Serial devices.** For a serial device, such as a USB-to-RS-232 adapter, add `devices: ["/dev/ttyUSB0"]` to the service. Do not use `privileged: true`.
- **Image version.** The [Amazon ECR Public Gallery](https://gallery.ecr.aws/takebishi/tkbs-dgwd20) and the [Protocol Gateway download page](https://www.faweb.net/en/download/download/#devicegateway) list the image `public.ecr.aws/takebishi/tkbs-dgwd20`. Always set a version tag, such as `3.7.0`, and do not use `latest`. The tag `3.7.0` is a multi-architecture tag, so one software item serves devices with different processor architectures. The tags `3.7.0-arm64`, `3.7.0-amd64`, and `3.7.0-arm` select one architecture.
