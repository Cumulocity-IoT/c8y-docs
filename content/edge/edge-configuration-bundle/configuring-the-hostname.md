---
weight: 15
title: Configuring the hostname
layout: bundle
sector:
  - edge_server
---

The default hostname of the Edge appliance is **iot-edge-server**. You can define a unique hostname for your Edge appliance as required. A unique hostname ensures seamless communication within the network, avoids any hostname conflicts with other network devices and improves the security of your Edge device.

### Configuring the hostname using the UI {#configuring-the-hostname-using-the-ui}

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

   - Username: management/<*Edge admin username*>
   - Password: password provided during the installation
2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.
3. Click **Edge** > **Hostname** in the navigator.
4. Click **Edit** to change the hostname.
5. Provide the new hostname and click **Save**.

### Configuring the hostname using the REST APIs {#configuring-the-hostname-using-the-rest-apis}

To configure the hostname using the REST APIs, see the `/edge/configuration/hostname` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/edgeHostnameConfig).
