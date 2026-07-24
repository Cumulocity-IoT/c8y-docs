---
title: Basic settings
weight: 70
layout: bundle
outputs:
  - html
  - json
sector:
  - platform_administration
helpcontent:
- label: basic-settings
  title: Authentication
  content: "Under **Login settings** you can specify your preferred login mode:


**OAI-Secure** - Recommended, since it provides high security, using authorization tokens to prove your identity (to the server).

**Basic Auth** - Should be selected only for specific compatibility reasons, since it only provides basic security.

**Single sign-on redirect** - Can only be selected if SSO is configured. If selected, will remove Basic Auth and OAI-Secure login options.


Under **TFA settings**, select the checkbox **Allow two-factor authentication** if you want to allow TFA in your tenant (only possible for administrators).


Switch to the **Single sign-on** tab to configure single sign-on. For details, see *Configuring single sign-on* in the user documentation."
---


Click **Authentication** in the **Settings** menu if you want to view or change the basic authentication settings.

![Authentication settings](/images/users-guide/Administration/admin-settings-authentication.png)

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

To see the **Authentication** menu item, you must have ADMIN permission for the "Tenant management" permission type or be the first admin user created in the tenant.

For easier user access management, the above permission(s) are/is included in the global role(s) created by default in every new tenant:
- Tenant manager - manages tenant-wide configurations like applications, tenant options and retention rules.

Additionally, access to the **Basic settings** tab may be restricted by the platform administrator via setting the `onlyManagementTenantAccess` option to `true` for Basic Auth or OAI-Secure login options (see [{{< openapi >}}](https://cumulocity.com/api/core/#operation/putAccessLoginOptionResource)).
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
- [Platform administration > Authentication > OAI-Secure](/authentication/oai-secure/) for details on the OAI-Secure session configuration, token generation, and certificate-based token retrieval in {{< product-c8y-iot >}}.
- [Platform administration > Authentication > Two-factor authentication](/authentication/tfa/) for details on the two-factor authentication strategies in {{< product-c8y-iot >}}.
- [Platform administration > Authentication > Configuring single sign-on](/authentication/sso/) for details on configuring single sign-on in {{< product-c8y-iot >}}.
- [Authentication](https://{{< domain-c8y >}}/api/core/#section/Authentication) in the {{< openapi >}} for details on managing authentication via REST.
{{< /c8y-admon-related >}}


### Login settings {#login-settings}

In the **Preferred login mode** field, you can select one of the following options:

* OAI-Secure - recommended, since it provides high security, using authorization tokens to prove the identity of the user. Default login mode on creating new tenants. This mode is an enhancement of the previous OAuth Internal authentication (available prior to 10.13.0).
* Basic Auth - should be selected only for specific compatibility reasons, since it only provides basic security.
* Single sign-on redirect - can be selected only if SSO is configured. If selected, will remove Basic Auth and OAI-Secure login options.

This login mode will be used by the platform's applications as the default method to authenticate users. Device authentication stays unchanged.

{{< c8y-admon-important >}}
Each time you change the login mode you will be forced to log out. Other users will need to log out and log in again so that the change is applied.
{{< /c8y-admon-important >}}

In the field **Password validity limit**, you can limit the validity of user passwords by specifying the number of days after which users must change their passwords. If you do not want to force your users to change passwords, use "0" for unlimited validity of passwords (default value).

{{< c8y-admon-info >}}
The password validity limit is not imposed on users with a "devices" role. This prevents device passwords from expiring.
{{< /c8y-admon-info >}}

By default, users can use any password with eight characters or more. If you select **Enforce that all password are "strong" (green)**, users must provide strong passwords as described in [To change your password](/get-familiar-with-the-ui/user-settings/#to-change-your-password).

{{< c8y-admon-info >}}
The password validity limit and the password strength may not be editable, if configured by the platform administrator.
{{< /c8y-admon-info >}}

The **Ignore case when logging in** toggle allows enabling or disabling case sensitivity for the username or alias when authenticating a user login. If enabled, this feature is applied to all tenant users. By default, the feature is disabled.
{{< c8y-admon-info >}}
The toggle can only be managed by a tenant administrator. Additionally, the feature can only be enabled if there are no case-insensitive collisions for the username or alias fields for all existing tenant users (excluding "device users"). The check for naming collisions is performed automatically when attempting to enable the feature.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}
If external communication to the {{< management-tenant >}} has been blocked, then it is only possible to access the tenant in a secure way (for example via an SSH tunnel). This means that you can just as well use basic authentication. Additionally, it is not possible to use single sign-on since the communication from the external authorization server is also blocked. Therefore, the authentication method is automatically set to "Basic authentication" if the {{< management-tenant >}} is configured to block external communication.
{{< /c8y-admon-info >}}

For details on the OAI-Secure session configuration, token generation, and certificate-based token retrieval, see the [OAI-Secure](/authentication/oai-secure/) tab.

### Basic Auth restrictions {#basic-auth-restrictions}

Even if OAI-Secure authentication is configured for users, basic authentication remains available for devices and microservices using the platform. To provide a higher security level the basic authentication can be restricted.

Use the **Forbidden for web browsers** toggle to disallow the usage of basic authentication for web browsers. Moreover you can specify the following parameters:

* **Trusted user agents** - this list is empty by default. If some user agent is added, all the HTTP requests containing this entry in the `User-Agent` header and having a valid basic authentication date will be accepted.
* **Forbidden user agents** - this list is empty by default. If some user agent is added, all the HTTP requests containing this entry in the `User-Agent` header and using basic authentication will be rejected.

{{< c8y-admon-info >}}
If the user agent is not found in the list of trusted or forbidden user agents then {{< product-c8y-iot >}} will try to verify if it is a web browser using an external library.
{{< /c8y-admon-info >}}


### TFA settings {#tfa-settings}

Select the checkbox **Allow two-factor authentication** if you want to allow TFA in your tenant (only possible for administrators).

You may select one of the following options:

* **SMS-based**, supporting the following settings:
  - **Token validity limit** - lifetime of each session in minutes. When the session expires or a user logs out, the user must enter a new verification code.
  - **Verification code validity limit** - here you can set the lifetime of each verification code sent via SMS. When the verification code expires, the user must request a new verification code in order to login.

  <br>Note that an SMS gateway microservice must be configured for the tenant. Naturally only users with a valid phone number associated can use this functionality.

* **TOTP** (Time-based One-Time Password) supporting the following setting:
	 - **Enforce TOTP two-factor authentication on all users** - when enabled it will force all users to set up their TFA on login. Otherwise each individual user can choose to activate it or not.

   <br>Note that the TOTP method is only available with the login mode "OAI-Secure".

Click **Save TFA settings** to apply your settings.

{{< c8y-admon-important >}}
- Each time you change the TFA method you will be forced to log out. User TFA settings are cleared and must be configured again.
- Users with a "devices" role are excluded from TFA and TOTP. This is also true when TOTP is enforced for all users.
{{< /c8y-admon-important >}}
