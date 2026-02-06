---
weight: 80
title: Accessing Edge
layout: redirect
---

If you have installed Edge on your local machine, then you should be able to immediately access Edge in your browser with the URL `http://localhost`. If it is on a remote machine or a VM with a simple network setup and no firewall in the way, you can use `http://<IP of remote machine or VM>`.

{{< c8y-admon-info >}}
If you have performed the install on a self-managed Kubernetes cluster rather than installing with the **c8yedge** tool, it is sometimes the case that Edge is not accessible via either URL. This depends on the Kubernetes distribution you have used. See [Accessing Edge via an external IP](/edge/manage-edge/#external-ip).
{{< /c8y-admon-info >}}

When signing into Edge this way, you will first be prompted for the {{< product-c8y-iot >}} tenant ID. Edge has two tenants, `management` and `edge`. For both the {{< management-tenant >}} and the Edge tenant, use the following credentials:
* **Username:** `admin`
* **Password:** Use the password you provided during the Edge installation. This password was set either via the c8yedge tool's `--cumulocity-password` flag or through the Kubernetes Secret specified in the Edge CR field `spec.cumulocityPasswordSecretName`.

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

On Linux machines, add the following entry to */etc/hosts*:

```text
<IP address> <domain_name>
<IP address> management-<domain_name>
```
If you do not know the external IP address of your host, see [Accessing Edge via an external IP](/edge/manage-edge/#external-ip).

On Windows machines, add the same entry to *C:\Windows\System32\drivers\etc\hosts*.

Ping the &#60;domain_name> to verify it.

```shell
ping <domain_name>
ping management-<domain_name>
```

If the ping is successful, the DNS resolution is working properly.

#### To access Edge {#to-access-cumulocity-iot-edge}

To access Edge, enter one of the following URLs in the browser:
- For the "edge" tenant, use the URL `https://<domain_name>`.
- For the {{< management-tenant >}}, use the URL `https://management-<domain_name>`.

This will bring up the below login screen. For both the {{< management-tenant >}} and the Edge tenant, use the following credentials:
* **Username:** `admin`
* **Password:** Use the password you provided during the Edge installation. This password was set either via the c8yedge tool's `--cumulocity-password` flag or through the Kubernetes Secret specified in the Edge CR field `spec.cumulocityPasswordSecretName`.

{{< c8y-admon-info >}}
You can change the {{< management-tenant >}} and the Edge tenant admin password independently using the [user interface](/standard-tenant/managing-users/) or the {{< product-c8y-iot >}} API. 
{{< /c8y-admon-info >}}

![Login prompt](/images/edge/login-banner.png)

If you are logging in for the first time, you will see a cookie banner at the bottom of the login screen:

![Cookie Banner](/images/edge/cookie-banner.png)

{{< c8y-admon-info >}}
The cookie banner is turned on by default. This feature can be configured. For more information, see [Branding](/edge/k8-using-edge/#branding).
{{< /c8y-admon-info >}}

* Click **Agree and Proceed** to accept the default cookie settings (required and functional cookies enabled).
* Click **Reject all** to reject all of the default cookie settings.
* Click **Preferences** to select your individual cookie preferences:
	* **Required** - Required to enable core site functionality. They perform a task or operation without which a site's functionality would not be possible. Required cookies cannot be disabled.
	* **Functional** - Used to track site usage and to process personal data to measure and improve usability and performance. Functional cookies must be actively enabled.
* Click **See also our Privacy Notice** to open the [{{< company-c8y >}} privacy statement](/legal-notices/privacy-notice/) with details on the {{< company-c8y >}} privacy policy.

{{< c8y-admon-info >}}
If you have enabled functional cookies you can opt out of the product experience tracking later on via the **User settings** dialog, see [User options and settings](/get-familiar-with-the-ui/user-settings/).
{{< /c8y-admon-info >}}

Select the **Remember me** checkbox if you want the browser to remember your credentials, so that you do not have to enter them again when opening the application the next time. This is especially convenient if you frequently switch between {{< product-c8y-iot >}} applications, as Edge requests you to authenticate each time when starting an application. You can make the browser "forget" your credentials by explicitly logging out.

Finally, click **Login** to enter Edge. Initially, you will be taken to the [Cockpit](/cockpit/cockpit-introduction/) application, if not configured differently. For further information about the {{< product-c8y-iot >}} standard applications see [Available applications](/get-familiar-with-the-ui/available-applications/).

![Cockpit home screen](/images/users-guide/cockpit/cockpit-home-screen.png)

To explicitly log out, click the **User** button at the right of the top bar, then select **Logout** from the context menu.

{{< c8y-admon-info >}}
The maximum number of failed logins (due to invalid credentials), after which a user is locked, can be configured by the {{< management-tenant >}} on platform level. Contact your Operations team for further support. The default value is 100.
{{< /c8y-admon-info >}}

### How to reset or change your password {#how-to-reset-your-password}

To reset your password, you must first configure the "reset password" template and email server settings in Edge. For information about configuring the email server, see [Configuring the email server](/edge/manage-edge/#email-server).  

For information about changing the password, see [To change your password](/get-familiar-with-the-ui/user-settings/#to-change-your-password).

### How to access pages using URLs {#how-to-access-pages-using-urls}

For information about accessing pages using the URLs, see [URL](/get-familiar-with-the-ui/platform-access/#url).
