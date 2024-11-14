---
weight: 5
title: Restarting the Edge appliance
layout: redirect
---

When you apply a patch or update your Edge appliance to a newer version, you must restart your Edge appliance after the update. Before restarting your Edge appliance, ensure that your appliance is in a safe state.

{{< c8y-admon-info >}}
You might see alarms when you power on the Edge appliance from hibernation.
{{< /c8y-admon-info >}}

### Restarting the Edge appliance using the UI {#restarting-the-edge-appliance-using-the-ui}

To restart your Edge appliance:

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

	- Username: management/<*Edge admin username*>
	- Password: password provided during the installation

2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

3. Click **Edge** > **Reboot** in the navigator.

4. Click **Reboot**.

### Restarting the Edge appliance using the REST APIs {#restarting-the-edge-appliance-using-the-rest-apis}

To restart the Edge appliance using the REST APIs, see the `edge/reboot` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/edgeReboot).
