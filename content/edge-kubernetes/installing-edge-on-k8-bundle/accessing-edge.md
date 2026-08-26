---
weight: 80
title: Accessing Edge
layout: redirect
---

If you have installed Edge on your local machine, then you should be able to immediately access Edge in your browser with the URL `http://localhost`. If it is on a remote machine or a VM with a simple network setup and no firewall in the way, you can use `http://<IP of remote machine or VM>`.

{{< c8y-admon-info >}}
If you have performed the install on a self-managed Kubernetes cluster rather than installing with the **c8yedge** tool, it is sometimes the case that Edge is not accessible via either URL. This depends on the Kubernetes distribution you have used. See [Accessing Edge via an external IP](/edge-kubernetes/manage-edge/#external-ip).
{{< /c8y-admon-info >}}

When signing into Edge this way, you will first be prompted for the {{< product-c8y-iot >}} tenant ID. Edge has two tenants, `management` and `edge`. For both the {{< management-tenant >}} and the Edge tenant, use the following credentials:
* **Username:** `admin`
* **Password:** Use the password you provided during the Edge installation. This password was set either via the c8yedge tool's `--cumulocity-password` flag (see `c8yedge install --help`) or through the Kubernetes Secret specified in the Edge CR field `spec.cumulocityPasswordSecretName` (see [Edge custom resource](/edge-kubernetes/edge-custom-resource-definition/)).

### Accessing Edge using the domain name {#accessing-cumulocity-iot-edge-using-the-domain-name}
{{< c8y-admon-info >}}
This is an optional part of setup. Although essential to have a specific domain name for both the license and the Edge configuration, having Edge accessible by domain name in your browser is not.

It may be important for a better user experience, if Edge is to be regularly accessed without a need to remember IP addresses. It is essential if you wish to have secure SSL access to Edge.
{{< /c8y-admon-info >}}

Access Edge using the domain name configured as part of the installation. There are two ways of configuring the accessibility with the domain names:

* Add an entry of the domain name and IP address mapping in the DNS servers.
<br>For example, if your domain name is **myown.iot.com**, add an entry for both **myown.iot.com** and **management-myown.iot.com**.<br>
* Alternatively, [Add the alias](#add-alias) to access Edge through the domain name provided during installation. This must be performed on each client host on which Edge is accessed.

The first option is always preferable so that Edge is accessible over LAN.

#### Adding the alias {#add-alias}

On Linux machines, add the following entry to */etc/hosts* (you need root or `sudo` to edit this file):

```text
<IP address> <domain_name>
<IP address> management-<domain_name>
```
If you do not know the external IP address of your host, see [Accessing Edge via an external IP](/edge-kubernetes/manage-edge/#external-ip).

On Windows machines, add the same entry to *C:\Windows\System32\drivers\etc\hosts* (you need Administrator rights to edit this file).

Ping `<domain_name>` to verify it.

```shell
ping <domain_name>
ping management-<domain_name>
```

If the ping is successful, the DNS resolution is working properly.

#### To access Edge {#to-access-cumulocity-iot-edge}

To access Edge, enter one of the following URLs in the browser:
- For the "edge" tenant, use the URL `https://<domain_name>`.
- For the {{< management-tenant >}}, use the URL `https://management-<domain_name>`.

This will bring up the login screen. Sign in with the same admin credentials as above.

{{< c8y-admon-info >}}
You can change the {{< management-tenant >}} and the Edge tenant admin password independently using the [user interface](/standard-tenant/managing-users/) or the {{< product-c8y-iot >}} API.
{{< /c8y-admon-info >}}

![Login prompt](/images/edge-k8s/edge-k8s-login-banner.png)

On first login, a cookie banner appears. Accept or configure it as you would in any {{< product-c8y-iot >}} application; the banner can be disabled or customized, see [Branding](/edge-kubernetes/k8-using-edge/#branding). For details on cookie categories and opt-out, see the [{{< company-c8y >}} privacy statement](/legal-notices/privacy-notice/).

Tick **Remember me** if you want the browser to keep you signed in. Then click **Login**. By default you are taken to the [Cockpit](/cockpit/cockpit-introduction/) application; see [Available applications](/get-familiar-with-the-ui/available-applications/) for an overview.

![Cockpit home screen](/images/users-guide/cockpit/cockpit-home-screen.png)

To explicitly log out, click the **User** button at the right of the top bar, then select **Logout** from the context menu.

{{< c8y-admon-info >}}
The maximum number of failed logins (due to invalid credentials), after which a user is locked, can be configured by the {{< management-tenant >}} on platform level. Contact your Operations team for further support. The default value is 100.
{{< /c8y-admon-info >}}

### How to reset or change your password {#how-to-reset-your-password}

To reset your password, you must first configure the "reset password" template and email server settings in Edge. For information about configuring the email server, see [Configuring the email server](/edge-kubernetes/manage-edge/#email-server).

To change a password from the user interface, see [To change your password](/get-familiar-with-the-ui/user-settings/#to-change-your-password). For deep-linking to Edge pages via URLs, see [URL](/get-familiar-with-the-ui/platform-access/#url).
