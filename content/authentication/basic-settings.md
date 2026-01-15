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

### Basic Auth restrictions {#basic-auth-restrictions}

Even if OAI-Secure authentication is configured for users, basic authentication remains available for devices and microservices using the platform. To provide a higher security level the basic authentication can be restricted.

Use the **Forbidden for web browsers** toggle to disallow the usage of basic authentication for web browsers. Moreover you can specify the following parameters:

* **Trusted user agents** - this list is empty by default. If some user agent is added, all the HTTP requests containing this entry in the `User-Agent` header and having a valid basic authentication date will be accepted.
* **Forbidden user agents** - this list is empty by default. If some user agent is added, all the HTTP requests containing this entry in the `User-Agent` header and using basic authentication will be rejected.

{{< c8y-admon-info >}}
If the user agent is not found in the list of trusted or forbidden user agents then {{< product-c8y-iot >}} will try to verify if it is a web browser using an external library.
{{< /c8y-admon-info >}}


### OAI-Secure session configuration {#oai-secure-session-configuration}

OAI-Secure is a more secure alternative to the Basic Auth mode that also supports username and password login. In OAI-Secure mode the credentials in the initial request are exchanged for a JWT token that is set as a cookie in the web browser or returned in the response body. Based on the configuration OAI-Secure can support full session management or work as a standard JWT authentication where the user session lifetime is limited by the token expiration time.

#### OAI-Secure without the configuration related to the session management (session configuration turned off) {#oai-secure-without-the-configuration-related-to-the-session-management-session-configuration-turned-off}

When there is no configuration related to the session, OAI-Secure issues a JWT token with a certain lifetime. If the token expires then the user is forced to re-login because token refresh is not supported. This behavior is very inconvenient for the user if the token lifetime is short because the user is forced to re-login frequently.  

#### OAI-Secure with the configuration of the session management (session configuration turned on) {#oai-secure-with-the-configuration-of-the-session-management-session-configuration-turned-on}

Using OAI-Secure with session configuration is more convenient and secure, and can be used to achieve a behavior which is similar to the authentication based on HTTP sessions.

The OAI-Secure token acts as a session identifier on the client side (web browser). Such a token identifier which is stored in the cookie can have a preconfigured short lifetime. Then, the {{< product-c8y-iot >}} platform is responsible for renewing the session identifier without any user interaction. It is sufficient that the user's action causes the web browser to send a request to {{< product-c8y-iot >}}. Then, {{< product-c8y-iot >}} can examine if the renewing of the session identifier should be executed and perform the operation if necessary. {{< product-c8y-iot >}} offers extensive configuration related to this behavior so that tenant administrators can adjust the configuration to their needs.

If the **Use session configuration** option is enabled, the following settings can be configured on tenant level by a tenant administrator:

<table>
<col width="200">
<col width="600">
<col width="200">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Default</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">User agent validation required</td>
<td style="text-align:left">If turned on, the user agent sent in headers of consecutive requests in the scope of one session will be compared and a request with changed user agent will not be authorized.</td>
<td style="text-align:left">false</td>
</tr>
<tr>
<td style="text-align:left">Session absolute timeout</td>
<td style="text-align:left">Defines the maximum period of time that the user can use {{< product-c8y-iot >}} without having to re-authenticate.</td>
<td style="text-align:left">14 days</td>
</tr>
<tr>
<td style="text-align:left">Session renewal timeout</td>
<td style="text-align:left">Expected to be much shorter than the absolute timeout. Defines the time after which {{< product-c8y-iot >}} tries to provide a new token (session identifier). The renewal may take place only when {{< product-c8y-iot >}} receives an HTTP request from a client with a non-expired token and the period of time between obtaining the token and the execution of the request is greater than the renewal timeout.</td>
<td style="text-align:left">1 day</td>
</tr>
<tr>
<td style="text-align:left">Maximum parallel sessions per user</td>
<td style="text-align:left">Defines the maximum number of sessions which can be started by each user (for example on different machines or browsers). When a user exceeds this limit, then the oldest session will be terminated and the user will be logged out on this particular device.</td>
<td style="text-align:left">5 sessions</td>
</tr>
<tr>
<td style="text-align:left">Token lifespan</td>
<td style="text-align:left">Defines the time for which a token is active. The user is only able to access {{< product-c8y-iot >}} with a valid token. This configuration option is always available, it does not depend on session configuration. See <a href="#token-generation-with-oai-secure" class="no-ajaxy">Token generation with OAI-Secure</a> below. </td>
<td style="text-align:left">2 days</td>
</tr>

</tbody>
</table>

{{< c8y-admon-info >}}
The time parameters should depend on each other in the following manner: renewal timeout < token lifespan < absolute timeout.
Moreover, the renewal timeout should be approximately half of the token lifespan.      

Therefore, the recommended settings for a standard use case for OAI-Secure are the following:   

 * **Session absolute timeout**: 28 800 seconds (8 hours)        
 * **Session renewal timeout**: 2700 seconds (45 minutes)        
 * **Token lifespan**: 5400 seconds (90 minutes)

In such configurations, the idle timeout is in the range of 45 to 90 minutes, depending on when the last activity for the session was performed.
{{< /c8y-admon-info >}}

During the session token renewal the previous token is revoked and a new one is provided. The parameter `renewal token delay` defines the delay used to make this process smooth and not disturbing for the user. The old token is still valid for this period (1 minute by default). This way both tokens, old and new, are accepted by {{< product-c8y-iot >}}. This parameter is only configurable on platform level and cannot be modified by the tenant administrator.


### Token generation with OAI-Secure {#token-generation-with-oai-secure}

OAI-Secure is primarily based on JWT stored in a browser cookie. It can be also used to generate JWT in the response body.
The lifespan of the tokens and the cookie is configurable by tenant options belonging to the category `oauth.internal`.

#### Lifespan configuration of JWT stored in the cookie {#lifespan-configuration-of-jwt-stored-in-the-cookie}

JWT tokens stored in the browser cookie have a default validity time of two weeks.
This can be changed with tenant options:
 - category: `oauth.internal`;
 - key: `basic-token.lifespan.seconds`;

The minimum allowed value is 5 minutes.

#### Lifespan configuration of cookies {#lifespan-configuration-of-cookies}

Cookies used to store a JWT token in a browser have their own validity time that can be changed with tenant options:
- category: `oauth.internal`;
- key: `basic-user.cookie.lifespan.seconds`;

The default value is two weeks. To have the cookie deleted when the user closes the browser, set it to any negative value.

#### Lifespan configuration of JWT in response body {#lifespan-configuration-of-jwt-in-response-body}

The lifespan of JWT tokens generated in the response body is configured with the following tenant options:
- category: `oauth.internal`;
- key: `body-token.lifespan.seconds`;

Refer to the [Tenant API](https://{{< domain-c8y >}}/api/core/#tag/Tenant-API) in the {{< openapi >}} for more details.

{{< c8y-admon-info >}}
If external communication to the {{< management-tenant >}} has been blocked, then it is only possible to access the tenant in a secure way (for example via SSH tunnel). This means that you can just as well use basic authentication. Additionally, it is not possible to use single sign-on since the communication from the external authorization server is also blocked. Therefore, the authentication method is automatically set to "Basic authentication" if the {{< management-tenant >}} is configured to block external communication.
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
