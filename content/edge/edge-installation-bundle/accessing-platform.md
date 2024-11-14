---
weight: 25
title: Accessing the Edge appliance
layout: bundle
sector:
  - edge_server
---

You access the Edge appliance using a [domain name](#domain) in a web browser.

### Supported browsers {#supported-browsers}

Supported browsers in this version are:

* Microsoft Edge (latest Chromium-based version)
* Mozilla Firefox (latest Extended Support Release [1])
* Google Chrome [2]

[1] Only the latest Extended Support Release of Mozilla Firefox is explicitly supported. Possible incompatibilities will be removed during the regular maintenance process of {{< product-c8y-iot >}}. Due to frequent upgrades of the Mozilla Firefox consumer release, the compatibility of the Edge appliance with other versions of Mozilla Firefox cannot be guaranteed.

[2] The Google Chrome support is based on Google Chrome Version 84. Due to frequent version upgrades of Google Chrome, compatibility of the Edge appliance with future versions of Google Chrome cannot be fully guaranteed. Possible incompatibilities will be removed during the regular maintenance process of {{< product-c8y-iot >}}.

You may also use recent smartphone and tablet web browsers. We have tested our products with the following mobile web browsers:

* Chrome on Android (latest version) on Galaxy smartphones and tablets
* Safari on iOS (latest version) on Apple iPhone and iPad

{{< c8y-admon-info >}}
Edge on mobile devices shows some limitations.
The limitations could be the following:

* The usage may be constrained by the memory and the processing power available on the devices. <br>  
For example, loading graphs with large amounts of data points may make the mobile device unresponsive.
* Using the private mode on browsers may not work.
* The [Streaming Analytics application](/streaming-analytics/introduction-analytics/) does not support mobile or touch devices.
{{< /c8y-admon-info >}}

<a name="domain"></a>

### Accessing the Edge appliance using the domain name {#accessing-the-edge-appliance-using-the-domain-name}

The Edge appliance is accessible using the domain name configured as part of the installation.

There are two ways to configure the accessibility with the domain names:

* Add an entry of the domain name and IP mapping in the DNS servers. <br>
OR
* [Add the alias](#add-alias) to access the Edge appliance through the domain name provided during installation. This must be performed on each client host on which the Edge appliance is accessed.

{{< c8y-admon-info >}}
The first option is always preferable so that the Edge appliance is accessible over LAN.
{{< /c8y-admon-info >}}

<a name="add-alias"></a>
#### Adding the alias {#adding-the-alias}

On Linux machines, add the following entry to */etc/hosts*:

```text
<IP address> <domain_name>
```

Use the IP address provided during the network configuration. For example, the default value for Hyper-V is 192.168.66.10.

On Windows machines, add the same entry to *C:\Windows\System32\drivers\etc\hosts*.

Ping the &#60;domain_name> to verify it.

```shell
ping <domain_name>
```

If the ping is successful, the DNS resolution is working properly.

Using &#60;domain_name>, the Edge appliance can be connected from the host operating system (operating system which is hosting the Edge appliance). If you want to connect the Edge appliance within your LAN, which is outside of the host operating system, you must do the following:

* On VMware platforms, port forwarding must be enabled as mentioned in [Port forwarding on a VMware platform](/edge/edge-infrastructure/#vmware-port-forwarding).
* The DNS entry must be added in your LAN's DNS server/Name server. The DNS entry must have the domain name and the IP address of the host operating system. Note that this is not the Edge appliance IP.

#### To access the Edge appliance {#to-access-the-edge-appliance}

Enter the URL in the browser:

```http
https://<domain_name>
```

The Edge appliance Login screen appears. Log in with your credentials created during the installation.

- To log in to the {{< management-tenant >}}, prefix the username with *management*:
  - Username: management/<*Edge admin username*>
  - Password: password provided during the installation

- To log in to the "edge" tenant, use the Edge admin credentials or prefix the Edge admin username with *edge*:
  - Username: edge/<*Edge admin username*>
  - Password: password provided during the installation

{{< c8y-admon-important >}}
Make sure that the address bar of your browser shows a lock icon. The lock icon indicates that you are using a secure connection and that you are indeed connected to the Edge appliance.
{{< /c8y-admon-important >}}

If you are logging in for the first time, you will see a cookie banner at the bottom:

<img src="/images/users-guide/getting-started/getting-started-cookie-banner.png" alt="Login prompt">
<br>

{{< c8y-admon-info >}}
The cookie banner is turned on by default on the Edge appliance instances. This feature can be configured, see [Branding](/enterprise-tenant/customization/#branding).
{{< /c8y-admon-info >}}

* Click **Agree and Proceed** to accept the default cookie settings (required and functional cookies enabled).
* Click **Reject all** to reject all of the default cookie settings.
* Click **Preferences** to select your individual cookie preferences:
	* **Required** - Required to enable core site functionality. They perform a task or operation without which a site's functionality would not be possible. Required cookies cannot be disabled.
	* **Functional** - Used to track site usage and to process personal data to measure and improve usability and performance. Functional cookies must be actively enabled.
* Click **See also our Privacy Notice** to open the [{{< company-sag >}} privacy statement]({{< link-sag-privacy-statement >}}) with details on the {{< company-sag >}} privacy policy.

{{< c8y-admon-info >}}
If you have enabled functional cookies you can opt-out from the product experience tracking later on via the **User settings** dialog, see [User options and settings](/get-familiar-with-the-ui/user-settings/).
{{< /c8y-admon-info >}}

Select the **Remember me** checkbox if you want the browser to remember your credentials, so that you do not have to enter them again when opening the application the next time. This is especially convenient if you frequently switch between {{< product-c8y-iot >}} applications, as the Edge appliance requests you to authenticate each time when starting an application. You can make the browser "forget" your credentials by explicitly logging out.

Finally, click **Login** to enter the Edge appliance. Initially, you will be taken to the [Cockpit](/cockpit/cockpit-introduction/) application (if not configured differently).

![Cockpit home page](/images/users-guide/cockpit/cockpit-home-screen.png)

To explicitly logout, click the **User** button at the right of the top bar, then select **Logout** from the context menu.

{{< c8y-admon-info >}}
The maximum number of failed logins (due to invalid credentials), after which a user is locked, can be configured by the {{< management-tenant >}} on platform level, see *{{< product-c8y-iot >}} Core - Operations guide*. The default value is 100.
{{< /c8y-admon-info >}}

### How to reset your password {#how-to-reset-your-password}

To reset your password, you must first configure the “reset password” template and email server settings in the Edge appliance. For information about configuring the email server, see [Configuring the email server](/edge/edge-configuration/#configuring-email-server).  

For information about resetting the password, see [How to reset your password](/get-familiar-with-the-ui/platform-access/#to-reset-your-password).

### How to access pages using URLs {#how-to-access-pages-using-urls}

For information about accessing pages using the URLs, see [How to access pages using URLs](/get-familiar-with-the-ui/platform-access/#url).
