---
weight: 25
title: Accessing and logging into the platform
layout: bundle
sector:
  - getting_started
---

You access the {{< product-c8y-iot >}} platform via a [URL](#url) in a web browser.

### Supported browsers {#supported-browsers}

Supported browsers in this version are:

* Microsoft Edge (latest Chromium-based version)
* Mozilla Firefox (latest Extended Support Release [1])
* Google Chrome [2]

[1] Only the latest Extended Support Release of Mozilla Firefox is explicitly supported. Possible incompatibilities will be removed during the regular maintenance process of {{< product-c8y-iot >}}. Due to frequent upgrades of the Mozilla Firefox consumer release, the compatibility of {{< product-c8y-iot >}} with other versions of Mozilla Firefox cannot be guaranteed.

[2] The Google Chrome support is based on Google Chrome Version 84. Due to frequent version upgrades of Google Chrome, compatibility of {{< product-c8y-iot >}} with future versions of Google Chrome cannot be fully guaranteed. Possible incompatibilities will be removed during the regular maintenance process of {{< product-c8y-iot >}}.

You may also use recent smartphone and tablet web browsers. We have tested our products with the following mobile web browsers:

* Chrome on Android (latest version) on Galaxy smartphones and tablets
* Safari on iOS (latest version) on Apple iPhone and iPad

{{< c8y-admon-info >}}
{{< product-c8y-iot >}} on mobile devices shows some limitations.
The limitations could be the following:
* The usage may be constrained by the memory and the processing power available on the devices. <br>  
For example, loading graphs with large amounts of data points may make the mobile device unresponsive.
* Using the private mode on browsers may not work.
* The [Streaming Analytics application](/streaming-analytics/introduction-analytics/) does not support mobile or touch devices.
{{< /c8y-admon-info >}}


### URL {#url}

To access the applications for your {{< product-c8y-iot >}} tenant, use the following URL:

```http
https://<tenant-domain>.{{< domain-c8y >}}/
```

This will direct you to the Login screen of your default application. See [Tenants](https://{{< domain-c8y >}}/api/core/#tag/Tenants) in the {{< openapi >}} for further details on tenant ID and tenant domain.


{{< c8y-admon-info >}}
The above URL is only valid for {{< product-c8y-iot >}} {{< standard-tenant >}} subscribers. For {{< enterprise-tenant >}} deployments of {{< product-c8y-iot >}}, the URL is specific to your organization.
{{< /c8y-admon-info >}}

{{< c8y-admon-important >}}
Make sure that the address bar of your browser shows a lock icon. The lock icon indicates that you are using a secure connection and that you are indeed connected to the {{< product-c8y-iot >}} platform.
{{< /c8y-admon-important >}}


### To log into the platform {#to-log-into-the-platform}

On the Login screen, enter your username (case-sensitive) and password.

If you use one of the public cloud instances of the {{< product-c8y-iot >}} platform and log in for the first time, you will see a cookie banner at the bottom:

<img src="/images/users-guide/getting-started/getting-started-cookie-banner.png" alt="Login prompt">
<br>

{{< c8y-admon-info >}}
The cookie banner is turned on by default on the {{< product-c8y-iot >}} public cloud instances. For on-premise instances, this feature can be configured, see [{{< enterprise-tenant >}} > Customizing your platform > Branding](/enterprise-tenant/customization/#branding).
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

Select the **Remember me** checkbox if you want the browser to remember your credentials, so that you do not have to enter them again when opening the application the next time. This is especially convenient if you frequently switch between {{< product-c8y-iot >}} applications, as the {{< product-c8y-iot >}} platform will request you to authenticate each time when starting an application. You can make the browser "forget" your credentials by explicitly logging out.

Finally, click **Login** to enter the {{< product-c8y-iot >}} platform. Initially, you will be taken to the [Cockpit](/cockpit/) application (if not configured differently).

![Cockpit home page](/images/users-guide/cockpit/cockpit-home-screen.png)

To explicitly logout, click the **User** button at the right of the top bar, then select **Logout** from the context menu.

{{< c8y-admon-info >}}
The maximum number of failed logins (due to invalid credentials), after which a user is locked, can be configured by the {{< management-tenant >}} on platform level. Contact your Operations team for further support. The default value is 100.
{{< /c8y-admon-info >}}


### To reset your password {#to-reset-your-password}

1. Click the **Forgot password?** link on the Login screen.
2. In the resulting dialog box, enter your email address and click **Reset password**.
3. Check your email account for an email from the {{< product-c8y-iot >}} platform support providing a password reset link.
4. Click the link in the email and provide your new password.

{{< c8y-admon-info >}}
- The password reset link is only valid for one day.
- The automated password reset will only work if your email address is stored with your {{< product-c8y-iot >}} user. If you get a warning that the password cannot be reset, you are either using a different email address than the one stored with your {{< product-c8y-iot >}} user, or your {{< product-c8y-iot >}} user has no email address stored. In either case, contact a {{< product-c8y-iot >}} administrator in your organization. Administrators can reset your password.
{{< /c8y-admon-info >}}

If you yourself are the primary administrator, your email address used on first registering is automatically stored with your user. If you have questions, please contact [product support](/additional-resources/contacting-support/).


### To access pages using URLs {#to-access-pages-using-urls}

You can navigate straight to any place inside a {{< product-c8y-iot >}} application using the respective URL. For example, to show the basic information for a device, you can enter the following URL:

```http
https://<tenant-domain>.{{< domain-c8y >}}/apps/devicemanagement/index.html#/device/<id>/info
```

Using such an URL, you can:

*   Save bookmarks for specific devices or pages.
*   Send emails with a link to devices or sensor data manually or automatically, using the real-time event engine.
*   Use the backward and forward navigation of your browser.
*   Write your own web applications which link directly to information contained in a {{< product-c8y-iot >}} application.
