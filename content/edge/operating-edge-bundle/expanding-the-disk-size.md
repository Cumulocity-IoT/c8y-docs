---
weight: 15
title: Expanding the disk size
layout: redirect
---

You can expand the disk size of the installation disk and the data disk using the UI and REST APIs. You can either expand the disk size for both the disks or any one of the disk at a time. There is no limit on the number of the disk expansion process. Before expanding the disk size, you must set or edit the disk size in the hypervisor. See the hypervisor specific documentation for editing the disk size.

### Expanding the disk size using the UI {#expanding-the-disk-size-using-the-ui}

1. Shut down your Edge appliance.

2. Increase the size of the installation and data disks in you hypervisor.

3. Restart your Edge appliance.

4. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

	- Username: management/<*Edge admin username*>
	- Password: password provided during the installation

5. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

6. Click **Edge** > **Expand disk size** in the navigator.

7. Click **Expand**.

### Expanding the disk size using the REST APIs {#expanding-the-disk-size-using-the-rest-apis}

To expand the disk size using the REST APIs, see the `edge/expand-disk` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/expandDiskSize).
