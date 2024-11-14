---
weight: 15
title: Installing Edge using the UI
layout: bundle
sector:
  - edge_server
---

To install Edge using the user interface:

1. Connect and start the Edge appliance in the hypervisor. Wait until the network configuration screen appears.
    <img src="/images/edge/edge-network-configurator.png" name="Network Configurator" style="width:75%;"/>

    {{< c8y-admon-info >}}
The network configuration blue screen does not appear post installation. After the installation, you must use the Administration application or the REST API to configure the network.
    {{< /c8y-admon-info >}}

2. Configure the network for your Edge appliance, see the sample screenshot.
    <img src="/images/edge/edge-network-configurator-1.png" name="Network Configurator" style="width:75%;"/>

    {{< c8y-admon-important >}}

While configuring the network on VMware based hypervisors, do not us the IP addresses:

- X.X.X.1 (used by VMnet8 network adapter on host)
- X.X.X.2 (used by VMnet8 network adapter's gateway)

- X.X.X.254 (used by VMnet8 network adapter's DHCP server)

{{< /c8y-admon-important >}}

3. Press **Enter** to save the network configuration.
<img src="/images/edge/edge-network-configurator-2.png" name="Network Configurator" style="width:75%;"/>

   Note down the URL to perform the installation. In the screenshot above, the URL is `https://192.168.66.10/apps/installation/`.

4. Open the URL in a browser to start the installation process.

   Read the prerequisites and ensure that you have the domain name, SSL certificate and key associated with your domain name, and the license file.

5. Click **Start Installation**.

6. Create an administrator account for the guest operating system below **Guest OS admin**.

7. Provide a password for the root user of the guest operating system below **Guest OS root**, and click **Next**.

    {{< c8y-admon-important >}}
Do not use the root credentials to perform any task. The root credentials must be used only when asked by {{< company-sag >}} support personnel. Using it otherwise might void the appliance support.
    {{< /c8y-admon-important >}}

8. Create an administrator account to access the "edge" tenant and the {{< management-tenant >}}, and click **Next**.

9. Provide a fully qualified domain name below **Domain name**.

   For example, "myown.iot.com". Here, you must have the Edge license for the domain name **iot.com** or **myown.iot.com**.

   The domain name must adhere to all the domain name validation rules as described in [Domain name validation](/edge/edge-installation/#domain-name-validation-for-edge-license-key-generation).

10. Provide the Edge license file associated with your domain name below **Licence file**.

11. Provide the SSL certificate file and the SSL certificate key file.

    If you do not have an SSL certificate, select **Generate self-signed certificate** to generate one.

12. Click **Install**.

During the installation, the certificates are updated in the Edge appliance. If these certificates are not accepted by your browser, the browser does not get the progress of the installation. In such case, you must refresh the browser and follow the browser instructions for more details. The installation takes some time to complete. After the installation is complete, the "Cumulocity IoT Edge installation is now complete" message appears.

{{< c8y-admon-info >}}
If you still see the installation in progress, refresh the browser.
{{< /c8y-admon-info >}}

Next, click **Open Cumulocity IoT Edge**.

{{< c8y-admon-important >}}
In case you need to reset the password, you must configure the "reset password" template and email server settings to receive the password reset email. For more information, see [Password reset](/enterprise-tenant/customization/#password-reset) and [Email server](/enterprise-tenant/customization/#email-server).
{{< /c8y-admon-important >}}
