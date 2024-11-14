---
weight: 5
title: Updating Edge using the GUI
layout: redirect
---

You can update Edge or apply fixes to your existing installation using the Administration application in the {{< management-tenant >}}.

Download the Edge archive file **Cumulocity IoT Edge (*version*) Update** from the [{{< company-sag >}} {{< sag-portal >}}]({{< link-sag-portal >}}).

When you update your Edge appliance, the update also applies operating system patches and fixes for security vulnerabilities. {{< company-sag >}} recommends you to create a backup of your existing Edge installation before performing any update.

{{< c8y-admon-important >}}

For information about upgrading from an earlier version to Edge 10.18, refer to [Migrating Edge 10.17 to 10.18](/edge/edge-update/#migration-1017-to-1018).

{{< /c8y-admon-important >}}

To update Edge:

1. Log in to the {{< management-tenant >}}.

2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

3. Click **Edge** > **Update** in the navigator.

4. Click **Update** > **Next**.

5. Upload the new Edge archive file and click **Next**.

6. Click **Update**.

   While updating the Edge appliance with the microservice hosting feature enabled, the following notification may appear on the user interface:

   *Could not get the details on the update status. Do refresh after some time to check if the update has completed*.

   Refresh the page to check if the update has been completed by verifying the version number.

7. Restart your Edge appliance.
