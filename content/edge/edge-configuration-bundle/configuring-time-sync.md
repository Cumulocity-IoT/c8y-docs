---
weight: 20
title: Configuring the time synchronization
layout: bundle
sector:
  - edge_server
---

For many use cases, and especially when using Apama, the time inside the Edge appliance must be synchronized with the network. Time synchronization helps in logging events accurately and compare the data from multiple devices.

By default, the `chrony` service is responsible for time synchronization with the host operating system. For Hyper-V, the `chronyd` service is disabled by default for accurate time synchronization.

Once the time synchronization is enabled, you can specify the NTP servers and the interval to trigger the time synchronization.

### Configuring the time synchronization using the UI {#configuring-the-time-synchronization-using-the-ui}

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

   - Username: management/<*Edge admin username*>
   - Password: password provided during the installation
2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.
3. Click **Edge** > **Time synchronization** in the navigator.
4. Use the toggle button to enable the time synchronization.
5. Click **Edit** to specify the NTP servers and the interval to trigger the time synchronization.

### Configuring the time synchronization using the REST APIs {#configuring-the-time-synchronization-using-the-rest-apis}

To configure the time synchronization using the REST APIs, see the `/edge/configuration/time-sync` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/configureTimeSync).
